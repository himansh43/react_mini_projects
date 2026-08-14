import React from "react";
import { useRef } from "react";

const Modal = ({ modalRef,setShowModal }) => {
  return (
    <div ref={modalRef} className="flex flex-col gap-5 bg-gray-200">
      <div className="w-96  px-3 py-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui iure
        corrupti dolorum possimus maxime nam aspernatur similique quisquam
        delectus ad rerum velit dolor, consequuntur dicta soluta culpa sit
        laboriosam nostrum?
      </div>
      <div className="px-3 py-1">
        <button className="border border-gray-500 cursor-pointer px-3 py-1 mb-2 " onClick={()=>setShowModal(false)}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
