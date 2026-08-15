import { useEffect, useMemo, useState } from "react"
import { Background, Controls, MiniMap, ReactFlow, type Edge, type Node } from "@xyflow/react"
import ELK from "elkjs/lib/elk.bundled.js"
import { stages } from "../roadmap-data"
import { facultiesV43 } from "./curriculum-v43"

const elk = new ELK()

function stageLinksForFaculty(index: number) {
  const start = Math.min(stages.length - 1, Math.max(0, Math.floor((index / Math.max(1, facultiesV43.length - 1)) * (stages.length - 1))))
  const indexes = [start, Math.min(stages.length - 1, start + 3), Math.min(stages.length - 1, start + 7)]
  return [...new Set(indexes)].map((i) => stages[i]?.code).filter(Boolean) as string[]
}

export default function KnowledgeGraphV43() {
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [ready, setReady] = useState(false)

  const graph = useMemo(() => {
    const children = [
      ...stages.map((stage) => ({ id: `s-${stage.code}`, width: 230, height: 82 })),
      ...facultiesV43.map((faculty) => ({ id: `f-${faculty.code}`, width: 250, height: 92 })),
    ]
    const graphEdges: Array<{ id: string; sources: string[]; targets: string[] }> = []
    for (let i = 0; i < stages.length - 1; i += 1) {
      graphEdges.push({ id: `seq-${stages[i].code}-${stages[i + 1].code}`, sources: [`s-${stages[i].code}`], targets: [`s-${stages[i + 1].code}`] })
    }
    facultiesV43.forEach((faculty, index) => {
      stageLinksForFaculty(index).forEach((stageCode) => {
        graphEdges.push({ id: `map-${stageCode}-${faculty.code}`, sources: [`s-${stageCode}`], targets: [`f-${faculty.code}`] })
      })
    })
    return {
      id: "root",
      layoutOptions: {
        "elk.algorithm": "layered",
        "elk.direction": "RIGHT",
        "elk.spacing.nodeNode": "45",
        "elk.layered.spacing.nodeNodeBetweenLayers": "90",
        "elk.layered.nodePlacement.strategy": "NETWORK_SIMPLEX",
        "elk.edgeRouting": "SPLINES",
      },
      children,
      edges: graphEdges,
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    setReady(false)
    elk.layout(graph as any).then((layout: any) => {
      if (cancelled) return
      const nextNodes: Node[] = (layout.children ?? []).map((node: any) => {
        const isStage = String(node.id).startsWith("s-")
        const key = String(node.id).slice(2)
        const stage = isStage ? stages.find((item) => item.code === key) : null
        const faculty = !isStage ? facultiesV43.find((item) => item.code === key) : null
        return {
          id: node.id,
          position: { x: node.x ?? 0, y: node.y ?? 0 },
          draggable: false,
          selectable: true,
          className: isStage ? "v43-kg-stage" : `v43-kg-faculty tone-${faculty?.tone ?? "green"}`,
          data: {
            label: isStage ? (
              <div className="v43-kg-label"><small>{stage?.code}</small><strong>{stage?.title}</strong><span>{stage?.year}</span></div>
            ) : (
              <div className="v43-kg-label"><small>{faculty?.code}</small><strong>{faculty?.title}</strong><span>{faculty?.stageRange}</span></div>
            ),
          },
          style: { width: node.width, height: node.height },
        }
      })
      const nextEdges: Edge[] = (layout.edges ?? []).map((edge: any) => ({
        id: edge.id,
        source: edge.sources?.[0],
        target: edge.targets?.[0],
        type: "smoothstep",
        animated: String(edge.id).startsWith("seq-"),
        className: String(edge.id).startsWith("seq-") ? "v43-kg-edge v43-kg-seq" : "v43-kg-edge v43-kg-map",
      }))
      setNodes(nextNodes)
      setEdges(nextEdges)
      setReady(true)
    }).catch(() => {
      if (!cancelled) setReady(true)
    })
    return () => { cancelled = true }
  }, [graph])

  return (
    <div className="v43-knowledge-graph" data-lenis-prevent>
      {!ready && <div className="v43-graph-loading">Calculando el grafo de dependencias con ELK…</div>}
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodesDraggable={false}
        nodesConnectable={false}
        minZoom={0.18}
        maxZoom={1.6}
        fitView
        fitViewOptions={{ padding: 0.08, maxZoom: 0.62 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#d8ddd8" gap={32} size={1} />
        <Controls position="bottom-left" showInteractive={false} />
        <MiniMap position="bottom-right" pannable zoomable nodeColor={(node: Node) => node.id.startsWith("f-") ? "#d8ff4f" : "#bfe6d4"} maskColor="rgba(250,249,242,.75)" />
      </ReactFlow>
    </div>
  )
}
