// src/types/upload.ts

/**
 * Tipo de documento retornado pela API
 */
export interface Document {
    id: string;
    title: string;
    author?: string;
    description?: string;
    fileUrl: string;
    series: string;
    educationLevel: string;
    processingStatus: string;
    subjects: Array<{ id: string; name: string }>;
    createdAt: string;
    updatedAt: string;
}

/**
 * Payload para upload de documento
 */
export interface CreateDocumentRequest {
    file: File;
    title: string;
    author?: string;
    description?: string;
    series: string;
    educationLevel: string;
    subjectId?: string;
}

/**
 * Parâmetros para busca de documentos
 */
export interface GetDocumentsParams {
    title?: string;
    series?: string;
    educationLevel?: string;
    processingStatus?: string;
    subjectId?: string;
}