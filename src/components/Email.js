import React from 'react'
import { Handle, Position,useReactFlow,getIncomers,useStore} from 'reactflow'
import Delete from './Delete';

function EmailNode(props) {
  const { deleteElements, setEdges, getNodes} = useReactFlow();
  const {edges } = useStore();
  const nodes=getNodes()

  const handleDeleteNode = (nodeId) => {
    console.log("getNodes",getNodes(),edges);
    const updateNode=nodes.find(node=>node.id===nodeId)
    const incomers=getIncomers(updateNode,nodes,edges)
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
    deleteElements({ nodes: [{ id: nodeId }] })
    const deleteE=updatedEdges.filter(e=>e.target!==nodeId)
    setEdges([...deleteE])
  };
  
  return (
    <div>
      <Handle position={Position.Top} type="target" />
      <div className="border-2 text-center py-1 h-20 w-40 rounded-md bg-orange-300 text-white flex flex-col">
        <Delete
          onClick={() => {
            handleDeleteNode(props.id);
          }}
        />
        <p>{props.data.label}</p>
        <p className="text-xs">Ctg:{props.data.category}</p>
      </div>
      <Handle position={Position.Bottom} type="source" id="a"/>
    </div>
  );
}
export default EmailNode