import React, { useState,useEffect } from 'react'
import { Handle, Position, getIncomers,getOutgoers,useReactFlow,useStore } from 'reactflow'
import Delete from './Delete'
import ConditionalModal from './ConditionalModal'

function Conditional(props) {
  const { deleteElements, getNodes,setEdges} = useReactFlow();
  const [showModal,setShowModal]=useState(false)
  const nodes=getNodes()
  const {edges } = useStore();
  const [dltNodes, setDltNodes] = useState([]);
  const [side, setSide] = useState("");

  const modalOpen = () => {
    setShowModal(true);
  };

  const modalClose = () => {
    setShowModal(false);
  };

  const findLast = (nodeId) => {
    const deleteNode = nodes.find((n) => n.id === nodeId);
    const outgoers = getOutgoers(deleteNode, nodes, edges);
    const incomers = getIncomers(deleteNode, nodes, edges);
    console.log(side,"side")
    const i=side==="1"?"0":side==="0"?"1":""
    let nextNode = outgoers[i]; 
    const newDltNodes = i!==""?[deleteNode]:""
    
    
    while (nextNode&&!newDltNodes.includes(nextNode)) {
      newDltNodes.push(nextNode)
      if(nextNode.type!=="plusNod"){
      nextNode=getOutgoers(nextNode,nodes,edges)[0]
    }
      else{
        const incom=getIncomers(nextNode,nodes,edges)
        nextNode=getOutgoers(incom[0],nodes,edges)[1]
    }
    }
    const newEdge=
    side==="1"?{
      id:`${Date.now()}`,
      source:incomers[0].id,
      target:outgoers[1].id
    }:side==="0"?{
      id:`${Date.now()}`,
      source:incomers[0].id,
      target:outgoers[0].id
    }:""
    setDltNodes(newDltNodes);
    setEdges([...edges,newEdge])
  };

  useEffect(() => {
    if(dltNodes){
      deleteElements({ nodes: dltNodes })
    }
  }, [dltNodes,deleteElements]);
  return (
    <div>
        <Handle type='target' position={Position.Top}/>
        <div className="border-2 text-center py-1 h-20 w-40 rounded-md bg-slate-600 text-white flex flex-col" >
        <Delete
          onClick={() => {
           modalOpen()
          }}
        />
        <p>{props.data.label}</p>
        <p className="text-xs">Ctg:{props.data.category}</p>
      </div>
        <Handle type='source' position={Position.Bottom}/>
        {
          showModal&&<ConditionalModal
          modalClose={modalClose}
          deleteNodes={findLast}
          data={props}
          selectSide={side}
          setSide={setSide}
          />
        }
    </div>
  )
}

export default Conditional
