import React from 'react'
import { Handle,Position, useReactFlow, useStore} from 'reactflow'
import Delete from './Delete';

function EndNode(props) {
  const { deleteElements, setEdges, getNodes,setNodes} = useReactFlow();
  const {edges } = useStore();
  const nodes=getNodes()

  const handleDeleteNode = (nodeId) => {
    const updateNode=nodes.find(node=>node.id===nodeId)
    // const incomers=getIncomers(updateNode,nodes,edges)
  
    
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
  const updatedEdges = edges.map((edge) => {
    if (edge.target === nodeId) {
      return {
        ...edge, 
        target:newNode.id
      };
    }
      return edge;
    
  });
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
            handleDeleteNode(props.id);
          }}
        />
        <p>{props.data.label}</p>
        <p className="text-xs">Ctg:{props.data.category}</p>
        </div>
    </div>
  )
}

export default EndNode