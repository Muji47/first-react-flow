import React, { useState,useEffect } from 'react'
import { Handle, Position, getIncomers,getOutgoers,useReactFlow,useStore } from 'reactflow'
import Delete from './Delete'
import ConditionalModal from './ConditionalModal'

function Conditional(props) {
  const { deleteElements, getNodes,setEdges,setNodes} = useReactFlow();
  const [showModal,setShowModal]=useState(false)
  const nodes=getNodes()
  const {edges } = useStore();
  const [dltNodes, setDltNodes] = useState([]);
  const [side, setSide] = useState("");

  const modalOpen = () => {
    setShowModal(true);
  };
  const deleteNod=(nodeId)=>{
    const deleteNode = nodes.find((n) => n.id === nodeId);
    const outgoers = getOutgoers(deleteNode, nodes, edges);
    const incomers = getIncomers(deleteNode, nodes, edges);
    const updateNode=nodes.find(node=>node.id===nodeId)
    const newNode={
      id:`a${Date.now()}`,
      position:{
          x:updateNode.position.x,
          y:updateNode.position.y
      },
      data:{
          label:"+"
      },
      type:"plusNod"
  }
  console.log(incomers[0])
  const newPlusEdge = {
    id: `e-${Date.now()}`,
    source:incomers[0].id, 
    target:newNode.id,
    sourceHandle: 'a',
  };
  
  
    if(outgoers[0].type==="plusNod"&&outgoers[1].type==="plusNod"){
      setDltNodes([deleteNode,outgoers[0],outgoers[1]])
        deleteElements({ nodes: dltNodes })
        setEdges([...edges,newPlusEdge])
        setNodes([newNode,...nodes])
    }
    else{
      modalOpen()
    }
    
  }
  const modalClose = () => {
    setShowModal(false);
  };
  const order=(nextNode)=>{
    setDltNodes(prev=>[...prev,nextNode])
    const outgoers = getOutgoers(nextNode, nodes, edges);
    if(!edges.find(e=>e.source===nextNode.id)&&dltNodes.includes(nextNode)){
      return
    }
    if(outgoers[0]){
      order(outgoers[0])}
    if(outgoers[1]){
      order(outgoers[1])
}
  }
  const findLast = (nodeId) => {
    const deleteNode = nodes.find((n) => n.id === nodeId);
    setDltNodes(prev=>[...prev,deleteNode])
    const outgoers = getOutgoers(deleteNode, nodes, edges);
    const incomers = getIncomers(deleteNode, nodes, edges);
    console.log(side,"side")
    const i=side==="1"?"0":"1"
    let nextNode = outgoers[Number(i)]; 
    order(nextNode)
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
           deleteNod(props.id)
          }}
        />
        <p>{props.data.label}</p>
        <p className="text-xs">Ctg:{props.data.category}</p>
      </div>
        <Handle type='source' position={Position.Bottom} style={{  borderRadius:"50%", width:"10px",height:"10px" }} id='a'/>
        <Handle type='source' position={Position.Bottom} style={{ left: 90,backgroundColor:"#e3a008", borderRadius:"50%", width:"10px",height:"10px" }} id='b'/>
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
