import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';



export default memo(() => {
  return (
    <>
      
      
      <button className='border-2 px-8 py-1 h-20 bg-yellow-400 text-white rounded-md w-40'>Start</button>
      <Handle position={Position.Bottom} type="source" id="a"/>
      
    </>
  );
});
