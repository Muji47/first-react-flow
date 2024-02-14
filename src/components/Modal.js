import { Button,Select, Label, Modal, TextInput } from 'flowbite-react';
import { useState } from 'react';
function OpenModule({setAddNode,addNode,onClickAdd,openModal,closeModal,setOpenModal}) {
const categories=[
{name:"select the category"},
{name:"email",
cvalue:"email"},
{name:"message",
cvalue:"message"},
{name:"endpint",
cvalue:"endpint"},
{name:"condition",
cvalue:"condition"}
]
const[requiredValue,setRequiredValue]=useState({
  title:false,
  category:false
})
const handleEmptyTitle=()=>{
  if(addNode.title===""){
    setRequiredValue({...requiredValue,title:true})
    setOpenModal(true)
  }
  else if(addNode.category===""){
    setRequiredValue({...requiredValue,category:true})
    setOpenModal(true)
  }
  else
  onClickAdd()
}
const addValue=()=>{
  closeModal()
  handleEmptyTitle()
  }
  return (
    <>
   
      <Modal show={openModal} size="md" onClose={closeModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="title" value="Node Title" />
              </div>
              <TextInput
                id="title"
                placeholder="title"
                onChange={(e)=>setAddNode({...addNode,title:e.target.value})}
                value={addNode.title}
                required
                helperText={
                  <>
                    {requiredValue.title&&<span className="font-medium text-red-700">enter title</span>}
                  </>
                }
              />
            </div>
            <div className="max-w-md">
            <div className="mb-2 block">
                <Label htmlFor="category" value="Select your category" />
              </div>
              <Select id="category" 
              onChange={(e)=>setAddNode({...addNode,category:e.target.value})}
              value={addNode.category}
              required
              helperText={
                <>
                  {requiredValue.category&&<span className="font-medium text-red-700">enter category</span>}
                </>
              }
              >
               {categories.map(category=>(
                <option value={category.cvalue}>{category.name}</option>)
               ) }
              </Select>
            </div>
           
            <div className="w-full flex gap-3">
              <Button onClick={addValue}>Add</Button>
              <Button onClick={closeModal}>Cancel</Button>
            </div>
           
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
export default  OpenModule