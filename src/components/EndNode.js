import React from 'react'
import { Handle,Position, useReactFlow, useStore, getIncomers} from 'reactflow'
import Delete from './Delete';

function EndNode({data}) {
  const { deleteElements, setEdges, getNodes,setNodes} = useReactFlow();
  const {edges } = useStore();
  const nodes=getNodes()

  const handleDeleteNode = (nodeId) => {
    console.log("getNodes",getNodes(),edges);
    const updateNode=nodes.find(node=>node.id===nodeId)
    const incomers=getIncomers(updateNode,nodes,edges)
    console.log(incomers,"incomers",nodes)
    const updatedEdges = edges.map((edge) => {
      if (edge.source === nodeId) {
        return {
          ...edge,
          source: incomers[0].id, 
        };
      }else {
        return edge;
      }
    });
    const newNode={
      id:"a",
      position:{
          x:incomers[0].position.x,
          y:incomers[0].position.y+120
      },
      data:{
          label:"+"
      },
      type:"plusNod"
  }
  setNodes([newNode,...nodes])
    deleteElements({ nodes: [{ id: nodeId }] })
   
    setEdges([...updatedEdges])
    
  };
  return (
    <div>
        <Handle type='target' position={Position.Top}/>
        <div className='border-2 text-center py-1 h-20 w-40 rounded-md bg-red-600 text-white flex flex-col'>
        <Delete
          onClick={() => {
            handleDeleteNode(data.id);
          }}
        />
        <p>{data.label}</p>
        <p className="text-xs">Ctg:{data.category}</p>
        </div>
    </div>
  )
}

export default EndNode