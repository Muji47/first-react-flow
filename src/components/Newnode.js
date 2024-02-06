import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';


export default memo(({data}) => {
    
  return (
    <>
      
      <Handle 
      position={Position.Top} type="target" />
      <button className='border-2 px-8 py-1 h-20 rounded-md w-40 bg-green-600 text-white'>{data.label}</button>
      
    </>
  );
});
