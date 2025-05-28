// src/components/common/Subjects.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { Subject } from '@/types/subject';
import {
    getSubjects,
    createSubject,
    updateSubject as apiUpdateSubject,
    deleteSubject as apiDeleteSubject,
    uploadSubjectCover,
} from '@/api/subject';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { AddEditModal, FieldConfig } from '@/components/common/AddEditModal';
import EditSubjectModal from './EditSubjectModal';
import ConfirmModal from '@/components/common/ConfirmModal';
import {
    setSubjects,
    addSubject,
    updateSubject as updateSubjectInStore,
    removeSubject,
    selectSubjects,
} from '@/store/slices/subjectSlice';

export default function Subjects() {
    const token = useAppSelector(state => state.auth.access_token)!;
    const subjects = useAppSelector(selectSubjects);
    const dispatch = useAppDispatch();

    const [modalOpen, setModalOpen] = useState(false);
    const [editing, setEditing] = useState<Subject | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    useEffect(() => {
        fetchList();
    }, []); // só na montagem

    async function fetchList() {
        setLoading(true);
        setError(null);
        try {
            const list = await getSubjects(token);
            dispatch(setSubjects(list));
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    }

    function openCreate() {
        setEditing(null);
        setError(null);
        setModalOpen(true);
    }

    function openEdit(subj: Subject) {
        setEditing(subj);
        setError(null);
        setModalOpen(true);
    }

    async function handleCreate(data: { name: string; description: string }) {
        setLoading(true);
        setError(null);
        try {
            const newSubj = await createSubject(data, token);
            dispatch(addSubject(newSubj));
            setModalOpen(false);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    }

    async function handleUpdate(
        data: { name: string; description: string },
        file: File | null
    ) {
        if (!editing) return;
        setLoading(true);
        setError(null);
        try {
            const updated = await apiUpdateSubject(editing.id, data, token);
            if (file) {
                const withCover = await uploadSubjectCover(updated.id, file, token);
                dispatch(updateSubjectInStore(withCover));
            } else {
                dispatch(updateSubjectInStore(updated));
            }
            setModalOpen(false);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
        } finally {
            setLoading(false);
        }
    }

    function requestDelete(id: string) {
        setDeleteId(id);
        setShowDeleteModal(true);
    }

    async function confirmDelete() {
        if (!deleteId) return;
        setShowDeleteModal(false);
        setLoading(true);
        setError(null);
        try {
            await apiDeleteSubject(deleteId, token);
            dispatch(removeSubject(deleteId));
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'Erro desconhecido');
        } finally {
            setLoading(false);
            setDeleteId(null);
        }
    }

    const createFields: FieldConfig<{ name: string; description: string }>[] = [
        { name: 'name', label: 'Nome', type: 'text', required: true },
        { name: 'description', label: 'Descrição', type: 'text', required: true },
    ];

    return (
        <div className="text-white pt-6">
            {loading && <p>Carregando...</p>}
            {error && <p className="text-red-400">Erro: {error}</p>}

            {!loading && !error && subjects.length === 0 && (
                <p className="text-center">Nenhuma disciplina encontrada.</p>
            )}

            {!loading && !error && subjects.length > 0 && (
                <ul className="space-y-3">
                    {subjects.map(s => (
                        <li
                            key={s.id}
                            className="border border-gray-500 rounded p-3 hover:bg-gray-800 transition flex justify-between items-center"
                        >
                            <div>
                                <h3 className="font-bold">{s.name}</h3>
                                <p className="text-sm">{s.description}</p>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => openEdit(s)}>
                                    <FaEdit />
                                </button>
                                <button onClick={() => requestDelete(s.id)}>
                                    <FaTrash />
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            <button
                onClick={openCreate}
                className="
          w-full
          flex
          items-center
          justify-center
          gap-2
          bg-gradient-to-r
          from-purple-500
          to-purple-600
          hover:from-purple-600
          hover:to-purple-700
          text-white
          font-semibold
          px-5
          py-3
          rounded-xl
          shadow-md
          hover:shadow-lg
          hover:scale-[1.02]
          active:scale-100
          transition-all
          duration-200
          mt-6
        "
            >
                <FaPlus className="text-lg" /> Nova Disciplina
            </button>

            <AddEditModal
                title="Nova Disciplina"
                isOpen={!editing && modalOpen}
                fields={createFields}
                onClose={() => setModalOpen(false)}
                onSubmit={data => handleCreate(data)}
            />

            {editing && (
                <EditSubjectModal
                    isOpen={!!editing && modalOpen}
                    onClose={() => setModalOpen(false)}
                    onSubmit={handleUpdate}
                    initialData={editing}
                    loading={loading}
                    error={error}
                />
            )}

            <ConfirmModal
                title="Confirmar exclusão"
                message="Deseja realmente deletar esta disciplina?"
                isOpen={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDelete}
            />
        </div>
    );
}
