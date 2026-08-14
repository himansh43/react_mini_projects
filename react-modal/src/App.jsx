import { useState } from "react";
import Modal from "./Components/Modal";
import { useRef } from "react";
import { useEffect } from "react";

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const handleCloseModal = (e) => {
    if (!showModal) return;
    if (modalRef?.current?.contains(e.target)) {
      console.log("inside modal");
      return;
    } else {
      console.log("outside modal");
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseModal);
    return () => {
      document.removeEventListener("click", handleCloseModal);
    };
  }, [showModal]);
  return (
    <div
      className="flex flex-col justify-center items-center mt-10 gap-5 "
      onClick={handleCloseModal}
    >
      <div className=" px-3 py-1 cursor-pointer rounded-sm flex flex-col gap-5 ">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(true);
          }}
          className="border bg-red-500 px-3 py-1 w-28 text-md text-white cursor-pointer"
        >
          Click here
        </button>
      </div>
      <div>
        {showModal && <Modal modalRef={modalRef} setShowModal={setShowModal} />}
      </div>
    </div>
  );
};

export default App;
