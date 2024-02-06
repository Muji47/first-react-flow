import React from 'react'
import { useState,useCallback,useMemo } from 'react';
import ReactFlow, { Controls, Background, applyNodeChanges, applyEdgeChanges, addEdge } from 'reactflow';
import TextUpdaterNode from "./TextUpdaterNode"

function Nodeswithlabeledge() {
    const node=[
        { id: 'node-1', type: 'textUpdater', position: { x: 0, y: 0 }, data: { value: 123 } },
        { id: 'node-2', position: { x: 40, y: 22 }, data: { label: 123 } },
    ]
    
    const edege=[{
    
      id :"e1-2",
      type:"straight",
      source:"node-1",
      target:"node-2",
      label:"path"
    }
    ]
      const [nodeval,setNodeVal]=useState(node)
      const [edgeval,setEdgeVal]=useState(edege)
    
    const onNodesChange = useCallback(
      (changes) => setNodeVal((nds) => applyNodeChanges(changes, nds)),
      [],
    );
    const onEdgesChange = useCallback(
      (changes) => setEdgeVal((eds) => applyEdgeChanges(changes, eds)),
      [],
    );
    const connecting=useCallback(
      (params)=>setEdgeVal((eds)=>addEdge(params,eds))
      ,[]
    )
    const nodeTypes = useMemo(() => ({ textUpdater: TextUpdaterNode }), []);
      return (
        
        <ReactFlow 
        nodes={nodeval} 
        edges={edgeval}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={connecting}
        nodeTypes={nodeTypes}
        >
          <Background variant="dots" />
          <Controls />
        </ReactFlow>
      );
}

export default Nodeswithlabeledge