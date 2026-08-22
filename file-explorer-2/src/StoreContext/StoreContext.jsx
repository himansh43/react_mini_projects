import { createContext, useContext, useState } from "react";

import data from "../../data";

export const StoreContext = createContext();
export const StoreContextProvider = ({ children }) => {
  const [nodes, setNodes] = useState(data);
  const [inputValue, setInputValue] = useState("");
  const [editValue,setEditValue]= useState("")

  const handleAdd = (fileName, parentId,setShowInput) => {
    if (!fileName) return alert("Name is required");
    // Check duplicate name inside the same parent
    const isDuplicate = Object.values(nodes).some(
      (node) =>
        node.fileName.toLowerCase() === fileName.toLowerCase() &&
        node.parentId === parentId,
    );

    if (isDuplicate) {
      return alert("A file or folder with this name already exists");
    }

    //adding new node
    const id = Date.now();
    const newNode = {
      id: id,
      fileName: fileName,
      type: fileName.split(".").length > 1 ? "file" : "folder",
      children: [],
      parentId: parentId,
    };
    const copyNodes = { ...nodes, [id]: newNode };
    copyNodes[parentId]?.children?.unshift(id);
    setNodes(copyNodes);
    setInputValue("");
    setShowInput(false)
  };

  const handleDelete = (id) => {
    const copyNodes = { ...nodes };
    const parentId = copyNodes[id].parentId;
    if (parentId) {
      copyNodes[parentId].children = copyNodes[parentId].children.filter(
        (childId) => childId !== id,
      );
    }

    const queue = [id];
    while (queue.length > 0) {
      const currentId = queue.shift();
      if (nodes[currentId].children) {
        queue.push(...nodes[currentId].children);
        delete copyNodes[currentId];
      }
    }
    setNodes(copyNodes);
  };

  const handleEdit=(id,newFileName,setShowEditInput)=>{
    console.log("id is", id)
    const copyNodes={...nodes}
    copyNodes[id].fileName= newFileName
    setNodes(copyNodes)
    setShowEditInput(false)
    
    
  }

  return (
    <StoreContext.Provider
      value={{ nodes, handleAdd, inputValue, setInputValue, handleDelete ,handleEdit,editValue,setEditValue}}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};
