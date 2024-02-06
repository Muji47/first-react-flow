import React, { useState, useMemo, useCallback } from "react";
import start from "./Start";
import plusNod from "./Newnode";
import eNode from "./Email";
import mNode from "./Message";
import ePoint from "./EndNode";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
  ReactFlowProvider,
  getIncomers,
} from "reactflow";
import "reactflow/dist/style.css";
import { nodes } from "./exportnode-edge";
import { edges } from "./exportnode-edge";
import OpenModule from "./Modal";

function CustomNode() {
  const [node, setNode] = useState(nodes);
  const [edge, setEdge] = useState(edges);
  const [newNodeId, setNewNodeId] = useState(2);
  const [openModal, setOpenModal] = useState(false);
  const [addNode, setAddNode] = useState({
    title: "",
    category: "",
  });
  const handleModal = (e, node) => {
    if (node.id === "a") setOpenModal(true);
    return;
  };
  const onCloseModal = () => {
    setOpenModal(false);
    setAddNode({
      title: "",
      category: "",
    })
  };
  const onClickAdd = () => {
    const id = `${newNodeId}`;
    const out=node.find(n=>n.id==="a")
    const incomers=getIncomers(out,node,edge)
    const newNode =
      addNode.category === "message"
        ? {
            id:`${Number(incomers[0].id)+1}`,
            position: {
              x: incomers[0].position.x,
              y: (incomers[0].position.y + 110),
            },
            data: {
              label: addNode.title,
              category: addNode.category,
              id:`${Number(incomers[0].id)+1}`,
            },
            type: "mNode",
          }
        : addNode.category === "email"
        ? {
            id:`${Number(incomers[0].id)+1}`,
            position: {
              x: incomers[0].position.x,
              y: (incomers[0].position.y + 110),
            },
            data: {
              label: addNode.title,
              category: addNode.category,
              id:`${Number(incomers[0].id)+1}`,
            },
            type: "eNode",
          }
        : {
            id:`${Number(incomers[0].id)+1}`,
            position: {
              x: incomers[0].position.x,
              y: (incomers[0].position.y + 110),
            },
            data: {
              label: addNode.title,
              category: addNode.category,
              id:`${Number(incomers[0].id)+1}`,
            },
            type: "ePoint",
          }
    const newEdge = {
      id: `e${id}`,
      source: incomers[0].id,
      target: `${Number(incomers[0].id)+1}`,
    };
    setNewNodeId((prev) => prev + 1);
    const updatedEdge = edge.map((edge) => {
      if (edge.target === "a") {
        return {
          ...edge,
          source: `${Number(incomers[0].id)+1}`,
        };
      }
      return edge;
    });
    const updatedNode =addNode.category==="endpint"?
    node.filter(nd=>nd.id!=="a"):
     node.map((node) => {
      if (node.id === "a") {
        return {
          ...node,
          position: {
            x: incomers[0].position.x,
            y: incomers[0].position.y + 220,
          },
        };
      }
      return node;
    });
    setNode([...updatedNode, newNode]);
    setEdge([newEdge, ...updatedEdge]);
    setAddNode({
      title: "",
      category: "",
    });
  };
  
  const nodeTypes = useMemo(
    () => ({
      start: start,
      plusNod: plusNod,
      eNode: eNode,
      mNode: mNode,
      ePoint: ePoint,
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
          onNodeClick={handleModal}
        >
          <Background variant="dots" />
          <MiniMap />
          <Controls />
          {openModal && (
            <OpenModule
              onClickAdd={onClickAdd}
              addNode={addNode}
              setAddNode={setAddNode}
              openModal={openModal}
              closeModal={onCloseModal}
              setOpenModal={setOpenModal}
            />
          )}
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
}

export default CustomNode;
 //  const onNodDlt = useCallback((deleted) => {
  //     setEdge(
  //       deleted.reduce((acc, nod) => {
  //         const incomers = getIncomers(nod, node, edge);
  //         const outgoers = getOutgoers(nod, node, edge);
  //         const connectedEdges = getConnectedEdges([nod], edge);
  //         const remainingEdges = acc.filter((edg) => !connectedEdges.includes(edg));
  //         console.log(incomers,outgoers,"incomers,outgoers")
  //         const createdEdges = incomers.flatMap(({ id: source }) =>
  //           outgoers.map(({ id: target }) => ({ id: `s-e1`, source, target }))
  //         );
  //         console.log(remainingEdges,"remainingEdges",createdEdges,"createdEdges")
  //         return [...remainingEdges, ...createdEdges];
  //       }, edge)
  //     );
  //     setNewNodeId(prev=>prev-1)
  //   },
  //   [node, edge,setEdge]
  // );

  // startNode,
  // endNode,
  // emailNode,
  // messageNode,
  // conditionNode,