"use client"
import { useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: '시작 노드' },
    position: { x: 250, y: 0 },
  },
  {
    id: '2',
    data: { label: '중간 노드' },
    position: { x: 250, y: 100 },
  },
  {
    id: '3',
    type: 'output',
    data: { label: '끝 노드' },
    position: { x: 250, y: 200 },
  },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];

function Flow() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    },
    [setEdges],
  );

  return (
    <div style={{ width: '100%', height: '500px' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      />
    </div>
  );
}

export default Flow;