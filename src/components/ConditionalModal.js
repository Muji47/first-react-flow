import { Button ,Modal ,Select} from 'flowbite-react';
import React from 'react'

function ConditionalModal({modalClose,deleteNodes,data,setSide,selectSide}) {
  const sides=[
    {name:"select the category"},
    {
      name:"left",
      value:"1"
    },
    {
      name:"right",
      value:"0"
    }
  ]
  return (
    <div>
        <Modal show={modalClose} size="md" onClose={modalClose} popup>
        <Modal.Header />
        <h1 className='font-bold px-4'>Select The Flow</h1>
        <Modal.Body>
          <div className="space-y-6 ">
          <Select id="category" 
              onChange={(e)=>setSide(e.target.value)}
              value={selectSide}
              required
              >
               {sides.map(side=>(
                <option value={side.value}>{side.name}</option>)
               ) }
              </Select>
            <div className="w-full flex gap-3">

              <Button onClick={()=>{
                deleteNodes(data.id)
                modalClose()
                }}>Add</Button>
              <Button onClick={modalClose}>Cancel</Button>
            </div>
           
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
  
}


export default ConditionalModal