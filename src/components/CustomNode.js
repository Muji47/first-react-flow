import React, { useState, useMemo, useCallback } from "react";
import start from "./Start";
import plusNod from "./Newnode";
import eNode from "./Email";
import mNode from "./Message";
import ePoint from "./EndNode";
import condition from "./Conditional";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlowProvider,

} from "reactflow";
import "reactflow/dist/style.css";
import { nodes } from "./exportnode-edge";
import { edges } from "./exportnode-edge";


function CustomNode() {
  const [node, setNode] = useState(nodes);
  const [edge, setEdge] = useState(edges);

  const nodeTypes = useMemo(
    () => ({
      start: start,
      plusNod: plusNod,
      eNode: eNode,
      mNode: mNode,
      ePoint: ePoint,
      condition:condition
    }),
    []
  );

 
  const onNodesChange = useCallback(
    (changes) => setNode((nds) => applyNodeChanges(changes, nds)),
    [setNode]
  );
  const onEdgesChange = useCallback(
    (changes) => setEdge((eds) => applyEdgeChanges(changes, eds)),
    [setEdge]
  );
  const onConnectEdge = useCallback(
    (params) => {
      setEdge(addEdge(params, edge));
    },
    [setEdge, edge]
  );
  const nodeColors=(node)=>{
    switch(node.type){
      case 'start':
        return '#e3a008';
      case 'plusNod':
        return '#057a55';
      case 'eNode':
        return '#fdba8c';
      case 'mNode':
        return '#ff5a1f';
      case 'ePoint':
        return '#e02424';
      case 'condition':
        return '#475569';
      default:
        return '#ff0072';
    }
  }
console.log(node,edge,"node,edge")
  return (
    <div className="h-[100vh] w-[100vw]">
      <ReactFlowProvider>
        <ReactFlow
          onEdgesChange={onEdgesChange}
          nodes={node}
          edges={edge}
          onNodesChange={onNodesChange}                                                                          
          onConnect={onConnectEdge}
          nodeTypes={nodeTypes}
        >
          <Background variant="dots" />
          <MiniMap nodeColor={nodeColors}/>
          <Controls />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default CustomNode;
 