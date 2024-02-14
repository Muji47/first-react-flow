import React, { memo,useState } from 'react';
import { Handle, Position ,useReactFlow,useStore,getIncomers, getOutgoers} from 'reactflow';
import OpenModule from "./Modal";


export default memo((props) => {
  const { setEdges, getNodes,setNodes} = useReactFlow();
  const {edges } = useStore();
  const nodes=getNodes()

  const [nodeId, setNodeId] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [addNode, setAddNode] = useState({
    title: "",
    category: "",
  });
  const handleModal = (id) => {
    setOpenModal(true);
    setNodeId(id)
  };
  const onCloseModal = () => {
    setOpenModal(false);
    setAddNode({
      title: "",
      category: "",
    })
  };
  const onClickAdd = () => {
    const out=nodes.find(n=>n.id===nodeId)
    // const outgoers=getOutgoers(out,nodes,edges)
    const incomers=getIncomers(out,nodes,edges)
    
    const addId=`${Date.now()}`
    const newNode =
      addNode.category === "message"
        ? {
            id:addId,
            position: {
              x: out.position.x,
              y: incomers[0].position.y+120 ,
            },
            data: {
              label: addNode.title,
              category: addNode.category,
            },
            type: "mNode",
          }
        : addNode.category === "email"
        ? {
            id:addId,
            position: {
              x: out.position.x,
              y: incomers[0].position.y+120,
            },
            data: {
              label: addNode.title,
              category: addNode.category,
            },
            type: "eNode",
          }
        : addNode.category === "endpint"?{
            id:addId,
            position: {
              x: out.position.x,
              y: incomers[0].position.y+120,
            },
            data: {
              label: addNode.title,
              category: addNode.category,
            },
            type: "ePoint",
          }:
          {
            id:addId,
            position: {
              x: out.position.x,
              y: incomers[0].position.y+120,
            },
            data: {
              label: addNode.title,
              category: addNode.category,
            },
            type: "condition",
          }
    const newEdge = {
      id: `e${addId}`,
      source:  incomers[0].id,
      target:newNode.id 
    }
    const newPlusEdge = {
      id: `e-${addId}`,
      source:newNode.id, 
      target:`a${Number(incomers[0].id)+1}`,
    };
    const newPlusNode=  {
      id:`a${Number(incomers[0].id)+1}`,
      position:{
          x:newNode.position.x+200,
          y: (newNode.position.y + 100)
      },
      data:{
          label:"+"
      },
      type:"plusNod"
  }
    
    const updatedEdge = edges.map((edge) => {
      if (edge.target ===nodeId ) {
        return {
          ...edge,
          source: newNode.id,
        };
      }
      return edge;
    });
    const updatedNode =addNode.category==="endpint"?
    nodes.filter(nd=>nd.id!==nodeId):addNode.category==="condition"?
     nodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          position: {
            x: newNode.position.x-200,
            y: newNode.position.y + 100,
          },
        };
      }
      return node;
    }):nodes.map((node) => {
      if (node.id === nodeId) {
        return {
          ...node,
          position: {
            x: newNode.position.x,
            y: newNode.position.y + 120,
          },
        };
      }
      return node;
    });
    if(addNode.category==="condition")
    setNodes([...updatedNode,newPlusNode, newNode])
    else
    setNodes([...updatedNode,newNode])
  if(addNode.category==="condition")
  setEdges([...updatedEdge,newEdge,newPlusEdge])
  else
  setEdges([...updatedEdge,newEdge])
    setAddNode({
      title: "",
      category: "",
    });
  };
    
  return (
    <>
      
      <Handle 
      position={Position.Top} type="target" />
      <button className='border-2 px-8 py-1 h-20 rounded-md w-40 bg-green-600 text-white'onClick={()=>handleModal(props.id)}>{props.data.label}</button>
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
    </>
  );
});
