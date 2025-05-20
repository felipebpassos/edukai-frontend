'use client'

import React, { useMemo, useRef } from 'react'
import ReactFlow, {
    ReactFlowProvider,
    Background,
    Controls,
    Position,
    Node,
    Edge,
} from 'react-flow-renderer'
import dagre from 'dagre'
import html2canvas from 'html2canvas'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPrint } from '@fortawesome/free-solid-svg-icons'

export type Subtopic = {
    id: string
    name: string
    description: string
}

export type Connection = {
    from: string
    to: string
    type: string
    description: string
}

export type MindMapData = {
    meta: {
        topic: string
        level: string
        creationDate: string
        version: string
    }
    introduction: {
        description: string
        objectives: string[]
    }
    mindMap: {
        centralTopic: string
        topics: {
            id: string
            name: string
            description: string
            subtopics?: Subtopic[]
        }[]
    }
    studyTips?: {
        strategies: string[]
        additionalResources: string[]
        studyOrder: string[]
    }
    customization?: {
        expansionSuggestions: string[]
        deepDiveAreas: string[]
    }
}

// Dagre setup
const dagreGraph = new dagre.graphlib.Graph()
dagreGraph.setDefaultEdgeLabel(() => ({}))
const nodeWidth = 180
const nodeHeight = 60

// Styles
const centralNodeStyle = {
    background: '#6B21A8',
    color: '#FFFFFF',
    border: '2px solid #9D4EDD',
    padding: '12px',
    borderRadius: 8,
    minWidth: nodeWidth,
    minHeight: nodeHeight,
}
const clusterNodeStyle = {
    background: '#A78BFA',
    color: '#111827',
    border: '1px solid #7C3AED',
    padding: '8px',
    borderRadius: 6,
    minWidth: nodeWidth,
    minHeight: nodeHeight,
}
const itemNodeStyle = {
    background: '#C4B5FD',
    color: '#1F2937',
    border: '1px dashed #8B5CF6',
    padding: '6px',
    borderRadius: 4,
    minWidth: nodeWidth,
    minHeight: nodeHeight,
}
const edgeStyle = { stroke: '#7C3AED' }

function getLayoutedElements(data: MindMapData) {
    const nodes: Node[] = []
    const edges: Edge[] = []

    // Central node
    nodes.push({
        id: 'central',
        type: 'default',
        data: { label: data.mindMap.centralTopic },
        position: { x: 0, y: 0 },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        style: centralNodeStyle,
    })

    // Cluster headings
    nodes.push({
        id: 'intro',
        type: 'default',
        data: { label: 'Introdução' },
        position: { x: 0, y: 0 },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        style: clusterNodeStyle,
    })
    edges.push({ id: 'central-intro', source: 'central', target: 'intro', type: 'smoothstep', style: edgeStyle })

    nodes.push({
        id: 'topics',
        type: 'default',
        data: { label: 'Tópicos' },
        position: { x: 0, y: 0 },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        style: clusterNodeStyle,
    })
    edges.push({ id: 'central-topics', source: 'central', target: 'topics', type: 'smoothstep', style: edgeStyle })

    if (data.studyTips) {
        nodes.push({
            id: 'tips',
            type: 'default',
            data: { label: 'Dicas de Estudo' },
            position: { x: 0, y: 0 },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
            style: clusterNodeStyle,
        })
        edges.push({ id: 'central-tips', source: 'central', target: 'tips', type: 'smoothstep', style: edgeStyle })
    }

    if (data.customization) {
        nodes.push({
            id: 'cust',
            type: 'default',
            data: { label: 'Personalização' },
            position: { x: 0, y: 0 },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
            style: clusterNodeStyle,
        })
        edges.push({ id: 'central-cust', source: 'central', target: 'cust', type: 'smoothstep', style: edgeStyle })
    }

    // Introdução: descrição + objetivos
    const introDescId = 'intro-desc'
    nodes.push({
        id: introDescId,
        type: 'default',
        data: { label: data.introduction.description },
        position: { x: 0, y: 0 },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
        style: itemNodeStyle,
    })
    edges.push({ id: `intro-${introDescId}`, source: 'intro', target: introDescId, type: 'smoothstep', style: edgeStyle })

    data.introduction.objectives.forEach((obj, i) => {
        const oid = `intro-obj-${i}`
        nodes.push({
            id: oid,
            type: 'default',
            data: { label: obj },
            position: { x: 0, y: 0 },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
            style: itemNodeStyle,
        })
        edges.push({ id: `intro-${oid}`, source: 'intro', target: oid, type: 'smoothstep', style: edgeStyle })
    })

    // Tópicos + sub-tópicos
    data.mindMap.topics.forEach((topic) => {
        nodes.push({
            id: topic.id,
            type: 'default',
            data: {
                label: (
                    <div style={{ textAlign: 'center', lineHeight: '1.2' }}>
                        <strong>{topic.name}</strong><br />{topic.description}
                    </div>
                ),
            },
            position: { x: 0, y: 0 },
            sourcePosition: Position.Bottom,
            targetPosition: Position.Top,
            style: itemNodeStyle,
        })
        edges.push({ id: `topics-${topic.id}`, source: 'topics', target: topic.id, type: 'smoothstep', style: edgeStyle })

        topic.subtopics?.forEach((sub) => {
            nodes.push({
                id: sub.id,
                type: 'default',
                data: {
                    label: (
                        <div style={{ textAlign: 'center', lineHeight: '1.2' }}>
                            <strong>{sub.name}</strong><br />{sub.description}
                        </div>
                    ),
                },
                position: { x: 0, y: 0 },
                sourcePosition: Position.Bottom,
                targetPosition: Position.Top,
                style: itemNodeStyle,
            })
            edges.push({ id: `${topic.id}-${sub.id}`, source: topic.id, target: sub.id, type: 'smoothstep', style: edgeStyle })
        })
    })

    // Dicas de Estudo
    if (data.studyTips) {
        data.studyTips.strategies.forEach((str, i) => {
            const id = `tip-str-${i}`
            nodes.push({
                id,
                type: 'default',
                data: { label: str },
                position: { x: 0, y: 0 },
                sourcePosition: Position.Bottom,
                targetPosition: Position.Top,
                style: itemNodeStyle,
            })
            edges.push({ id: `tips-${id}`, source: 'tips', target: id, type: 'smoothstep', style: edgeStyle })
        })
        data.studyTips.additionalResources.forEach((res, i) => {
            const id = `tip-res-${i}`
            nodes.push({
                id,
                type: 'default',
                data: { label: res },
                position: { x: 0, y: 0 },
                sourcePosition: Position.Bottom,
                targetPosition: Position.Top,
                style: itemNodeStyle,
            })
            edges.push({ id: `tips-${id}`, source: 'tips', target: id, type: 'smoothstep', style: edgeStyle })
        })
        data.studyTips.studyOrder.forEach((ord, i) => {
            const id = `tip-ord-${i}`
            nodes.push({
                id,
                type: 'default',
                data: { label: ord },
                position: { x: 0, y: 0 },
                sourcePosition: Position.Bottom,
                targetPosition: Position.Top,
                style: itemNodeStyle,
            })
            edges.push({ id: `tips-${id}`, source: 'tips', target: id, type: 'smoothstep', style: edgeStyle })
        })
    }

    // Personalização
    if (data.customization) {
        data.customization.expansionSuggestions.forEach((exp, i) => {
            const id = `cust-exp-${i}`
            nodes.push({
                id,
                type: 'default',
                data: { label: exp },
                position: { x: 0, y: 0 },
                sourcePosition: Position.Bottom,
                targetPosition: Position.Top,
                style: itemNodeStyle,
            })
            edges.push({ id: `cust-${id}`, source: 'cust', target: id, type: 'smoothstep', style: edgeStyle })
        })
        data.customization.deepDiveAreas.forEach((deep, i) => {
            const id = `cust-deep-${i}`
            nodes.push({
                id,
                type: 'default',
                data: { label: deep },
                position: { x: 0, y: 0 },
                sourcePosition: Position.Bottom,
                targetPosition: Position.Top,
                style: itemNodeStyle,
            })
            edges.push({ id: `cust-${id}`, source: 'cust', target: id, type: 'smoothstep', style: edgeStyle })
        })
    }

    // Layout com Dagre - maior espaçamento vertical para evitar sobreposição
    dagreGraph.setGraph({ rankdir: 'TB', nodesep: 20, ranksep: nodeHeight * 1.6, marginx: 40, marginy: 40 })
    nodes.forEach((n) => dagreGraph.setNode(n.id, { width: nodeWidth, height: nodeHeight }))
    edges.forEach((e) => dagreGraph.setEdge(e.source, e.target))
    dagre.layout(dagreGraph)

    const layoutedNodes = nodes.map((node) => {
        const n = dagreGraph.node(node.id)!
        return { ...node, position: { x: n.x - nodeWidth / 2, y: n.y - nodeHeight / 2 } }
    })

    // 1) Posiciona tópicos lado a lado
    {
        const topicParent = layoutedNodes.find((n) => n.id === 'topics')!
        const topicNodes = layoutedNodes.filter((n) =>
            data.mindMap.topics.some((t) => t.id === n.id)
        )
        const spacing = nodeWidth * 1.6
        const baseX = topicParent.position.x - ((topicNodes.length - 1) * spacing) / 2
        topicNodes.forEach((n, i) => {
            n.position.x = baseX + i * spacing
            n.position.y = topicParent.position.y + nodeHeight * 1.6
        })
        // centraliza "Tópicos" acima dos filhos
        topicParent.position.x = topicNodes.reduce((sum, n) => sum + n.position.x, 0) / topicNodes.length
    }

    // 2) Evita sobreposição mínima (20px) com "Dicas de Estudo"
    {
        const tipCluster = layoutedNodes.find((n) => n.id === 'tips')
        const topicNodes = layoutedNodes.filter((n) =>
            data.mindMap.topics.some((t) => t.id === n.id)
        )
        if (tipCluster && topicNodes.length) {
            const rightmost = topicNodes.reduce((m, n) => (n.position.x > m.position.x ? n : m), topicNodes[0])
            const leftOfTips = tipCluster.position.x - nodeWidth / 2
            const desiredGap = 20
            const overlap = rightmost.position.x + nodeWidth / 2 + desiredGap - leftOfTips
            if (overlap > 0) {
                topicNodes.forEach((n) => { n.position.x -= overlap })
                // reposiciona o título também
                const topicParent = layoutedNodes.find((n) => n.id === 'topics')!
                topicParent.position.x -= overlap
            }
        }
    }

    // 3) Posiciona fixo de INTRO, Dicas e Cust
    {
        const xs = layoutedNodes.map((n) => n.position.x)
        const centerX = (Math.min(...xs) + Math.max(...xs)) / 2
        const introN = layoutedNodes.find((n) => n.id === 'intro')
        const tipsN = layoutedNodes.find((n) => n.id === 'tips')
        const custN = layoutedNodes.find((n) => n.id === 'cust')
        if (introN) introN.position.x = centerX - nodeWidth * 2.0
        if (tipsN) tipsN.position.x = centerX - nodeWidth * 0.5
        if (custN) custN.position.x = centerX + nodeWidth * 1.2
    }

    // 4) Empilha folhas abaixo de cada pai com espaçamento maior para evitar sobreposição
    {
        const parentMap: Record<string, string[]> = {}
        edges.forEach((e) => {
            parentMap[e.source] = [...(parentMap[e.source] || []), e.target]
        })
        const leafGapY = nodeHeight * 1.6
        Object.entries(parentMap).forEach(([pid, kids]) => {
            const leafs = kids.filter((id) => !parentMap[id])
            const pNode = layoutedNodes.find((n) => n.id === pid)!
            leafs.forEach((lid, i) => {
                const leaf = layoutedNodes.find((n) => n.id === lid)!
                leaf.position.x = pNode.position.x
                leaf.position.y = pNode.position.y + leafGapY * (i + 1)
            })
        })
    }

    return { nodes: layoutedNodes, edges }
}

interface MindMapProps {
    data: MindMapData
}

export default function MindMap({ data }: MindMapProps) {
    const { nodes, edges } = useMemo(() => getLayoutedElements(data), [data])
    const flowWrapperRef = useRef<HTMLDivElement>(null)

    const handleDownload = async () => {
        if (!flowWrapperRef.current) return
        const canvas = await html2canvas(flowWrapperRef.current)
        const link = document.createElement('a')
        link.download = `${data.meta.topic}.png`
        link.href = canvas.toDataURL('image/png')
        link.click()
    }

    const handlePrint = () => {
        if (!flowWrapperRef.current) return
        const printContents = flowWrapperRef.current.innerHTML
        const printWindow = window.open('', '', 'width=800,height=600')
        if (!printWindow) return
        printWindow.document.write(`
      <html>
        <head>
          <title>${data.meta.topic}</title>
          <style>body{margin:0;}</style>
        </head>
        <body>${printContents}</body>
      </html>
    `)
        printWindow.document.close()
        printWindow.focus()
        printWindow.print()
        printWindow.close()
    }

    return (
        <>
            <div className="fixed top-4 left-4 text-purple-500 text-2xl z-10 flex items-center space-x-4">
                <button
                    onClick={handleDownload}
                    title="Baixar"
                    className="bg-transparent border-none cursor-pointer"
                >
                    <FontAwesomeIcon icon={faSave} size="lg" />
                </button>
                <button
                    onClick={handlePrint}
                    title="Imprimir"
                    className="bg-transparent border-none cursor-pointer"
                >
                    <FontAwesomeIcon icon={faPrint} size="lg" />
                </button>
            </div>
            <div ref={flowWrapperRef} style={{ width: '100%', height: '100%' }}>
                <ReactFlowProvider>
                    <ReactFlow nodes={nodes} edges={edges} fitView nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}>
                        <Background gap={16} color='#D8B4FE' />
                        <Controls />
                    </ReactFlow>
                </ReactFlowProvider>
            </div>
        </>
    )
}