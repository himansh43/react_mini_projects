import { useState } from "react";
import data from "../data.json";
import { useRef } from "react";

const DragAndDrop = () => {
  const [todo, setTodo] = useState(data);
  console.log("todo is", todo);

  const dragItem=useRef()
  const dragContainer= useRef()


  const handleDragStart=(e,currentItem,sourceContainer)=>{
    e.target.style.opacity="0.5"
    console.log("currentItem is", currentItem)
    console.log("sourceContainer is", sourceContainer)
    dragItem.current= currentItem
    dragContainer.current=sourceContainer
  }

  const handleDragEnd=(e)=>{
    e.target.style.opacity="1"
  }

  const handleDrop=(e,targetContainer)=>{
    console.log("target Container", targetContainer)
    setTodo((prev)=>{
        const newData={...prev}
        newData[dragContainer.current]= newData[dragContainer.current].filter((item)=>item!==dragItem.current)
        newData[targetContainer]= [...newData[targetContainer],dragItem.current]
        return newData
  })
  }

  return (
    <div className="flex flex-col justify-center items-center  m-5">
      <h2 className="text-2xl text-center m-5 font-bold">Drag and Drop</h2>

      <div className="flex gap-10 ">
        {Object.keys(todo).map((todoKey, index) => (
          <div  key={index} onDrop={(e)=>handleDrop(e,todoKey)}
          onDragOver={(e)=>e.preventDefault()}>
            <h2 className="text-xl font-bold">{todoKey}</h2>
            <div className="flex flex-col justify-center  items-center mt-2 ">
              <div className="flex flex-col gap-2 p-2 w-96">
                {todo[todoKey].map((todoValue, index) => (
                  <div className="bg-gray-100 p-5" 
                  draggable 
                  onDragStart={(e)=>handleDragStart(e,todoValue,todoKey)}
                  onDragEnd={(e)=>handleDragEnd(e)}          
                  >
                    {index + 1}
                    {`) `}
                    {todoValue}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DragAndDrop;
