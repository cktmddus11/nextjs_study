"use client"

import React, { useRef, useCallback } from 'react';
import {
    ReactFlow,
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    useReactFlow,
    Background,
    useStoreApi,
    MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';


import './index.css';
import { DnDProvider, useDnD } from '@/components/flow/DnDContext';
import Sidebar from '@/components/flow/Sidebar';
import { Edge } from "reactflow";

import CustomNode from '@/components/flow/CustomNode';


const nodeTypes = {
    custom: CustomNode,
};

const initialNodes = [
    {
        id: '1',
        type: 'input',
        data: { label: 'START' },
        position: { x: 10, y: 150 },
        emoji: '😎'
    },
    {
        id: '2',
        type: 'api spec',
        data: { label: 'API 스펙' },
        position: { x: 10, y: 220 },
        emoji: '🤓'
    },
    {
        id: '3',
        type: 'sql',
        data: { label: 'SQL' },
        position: { x: 10, y: 290 },
        emoji: '🤩'
    },
    {
        id: '4',
        type: 'output',
        data: { label: 'END' },
        position: { x: 10, y: 360 },
        emoji: '🤩'
    },
];

const initialEdges: Edge[] = [
    {
        id: '1-2',
        source: '1',
        target: '2',
    },
    {
        id: '2-3',
        source: '2',
        target: '3',
    },
    {
        id: '3-4',
        source: '3',
        target: '4',
    },
];


let id = 0;
const MIN_DISTANCE = 150;
const getId = () => `dndnode_${id++}`;

const DnDFlow = () => {
    const store = useStoreApi();
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);//([]);
    const { screenToFlowPosition } = useReactFlow();
    const [type] = useDnD();
    const { getInternalNode } = useReactFlow();

    const onConnect = useCallback(
        (params: any) => setEdges((eds: any) => addEdge(params, eds)),
        [],
    );
    const getClosestEdge = useCallback((node) => {
        const { nodeLookup } = store.getState();
        const internalNode = getInternalNode(node.id);

        const closestNode = Array.from(nodeLookup.values()).reduce(
            (res, n) => {
                if (n.id !== internalNode.id) {
                    const dx =
                        n.internals.positionAbsolute.x -
                        internalNode.internals.positionAbsolute.x;
                    const dy =
                        n.internals.positionAbsolute.y -
                        internalNode.internals.positionAbsolute.y;
                    const d = Math.sqrt(dx * dx + dy * dy);

                    if (d < res.distance && d < MIN_DISTANCE) {
                        res.distance = d;
                        res.node = n;
                    }
                }

                return res;
            },
            {
                distance: Number.MAX_VALUE,
                node: null,
            },
        );

        if (!closestNode.node) {
            return null;
        }

        const closeNodeIsSource =
            closestNode.node.internals.positionAbsolute.x <
            internalNode.internals.positionAbsolute.x;

        return {
            id: closeNodeIsSource
                ? `${closestNode.node.id}-${node.id}`
                : `${node.id}-${closestNode.node.id}`,
            source: closeNodeIsSource ? closestNode.node.id : node.id,
            target: closeNodeIsSource ? node.id : closestNode.node.id,
        };
    }, []);

    const onNodeDragStop = useCallback(
        (_, node) => {
            const closeEdge = getClosestEdge(node);

            setEdges((es) => {
                const nextEdges = es.filter((e) => e.className !== 'temp');

                if (
                    closeEdge &&
                    !nextEdges.find(
                        (ne) =>
                            ne.source === closeEdge.source && ne.target === closeEdge.target,
                    )
                ) {
                    nextEdges.push(closeEdge);
                }

                return nextEdges;
            });
        },
        [getClosestEdge],
    );

    const onDragOver = useCallback((event: any) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            // check if the dropped element is valid
            if (!type) {
                return;
            }

            // project was renamed to screenToFlowPosition
            // and you don't need to subtract the reactFlowBounds.left/top anymore
            // details: https://reactflow.dev/whats-new/2023-11-10
            const position = screenToFlowPosition({
                x: event.clientX,
                y: event.clientY,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` },
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [screenToFlowPosition, type],
    );

    return (
        <div className="dndflow">
            <div className="reactflow-wrapper" ref={reactFlowWrapper}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onNodeDragStop={onNodeDragStop}
                    fitView
                    style={{ backgroundColor: "#F7F9FB" }}
                >
                    <MiniMap />
                    <Controls />
                    <Background />
                </ReactFlow>
            </div>
            <Sidebar />
        </div>
    );
};

export default () => {
    return (
        <div id="app">
            <ReactFlowProvider>
                <DnDProvider>
                    <DnDFlow />
                </DnDProvider>
            </ReactFlowProvider>
        </div>
    )
};

// 드래그 앤 드롭 / 근접 연결