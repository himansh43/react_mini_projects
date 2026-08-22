import React, { useState } from "react";
import { useStoreContext } from "../StoreContext/StoreContext";
import { FaFile } from "react-icons/fa";
import { FaFolder } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { IoIosAdd } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";

const FileExplorer = ({ id }) => {
  const {
    nodes,
    handleAdd,
    inputValue,
    setInputValue,
    handleDelete,
    handleEdit,
    editValue,
    setEditValue,
  } = useStoreContext();
  const [showChildren, setShowChildren] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [showEditInput, setShowEditInput] = useState(false);
  console.log("edit value is", editValue);

  const handleClick = () => {
    setShowChildren(!showChildren);
  };
  const handleShowInput = () => {
    setShowInput(!showInput);
  };

  return (
    <div>
      <div className="flex gap-1 items-center" >
        <div>{nodes[id]?.type === "folder" ? <FaFolder /> : <FaFile />}</div>
        <div onClick={handleClick}>{nodes[id]?.fileName}</div>
        {nodes[id]?.type === "folder" && (
          <div onClick={handleShowInput}>
            <IoIosAdd />
          </div>
        )}
        <div>
          <MdEdit onClick={() => setShowEditInput(!showEditInput)} />
        </div>
        <div>
          <RxCross2 onClick={() => handleDelete(id)} />
        </div>
      </div>

      {showInput && (
        <div className="flex ml-4 gap-2 items-center">
          <input
            type="text"
            className="border rounded-sm px-3 "
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />

          <IoIosAdd onClick={() => handleAdd(inputValue, id, setShowInput)} />
          <RxCross2 onClick={() => setShowInput(false)} />
        </div>
      )}
      {showEditInput && (
        <div className="flex ml-4 gap-2 items-center">
          <input
            type="text"
            className="border-2 rounded-sm px-3 "
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
          />
          <IoIosAdd
            onClick={() => handleEdit(id, editValue, setShowEditInput)}
          />
          <RxCross2 onClick={() => setShowEditInput(false)} />
        </div>
      )}
      {showChildren && (
        <div className="ml-5">
          {nodes[id]?.children?.map((item, index) => (
            <div key={index}>
              <FileExplorer id={item} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileExplorer;
