import { useRef, useState } from "react";
import Toast from "./Components/Toast";

const App = () => {
  const btnMessages = ["Success", "Info", "Warning", "Error"];
  const [allToasts, setAllToasts] = useState([]);
  const timersId = useRef({});

  const handleClick = (e, btnMsg) => {
    const newToast = {
      id: crypto.randomUUID(),
      message: btnMsg,
    };
    const copyAllToasts = [...allToasts, newToast];
    setAllToasts(copyAllToasts);
    timersId.current[newToast.id] = setTimeout(() => {
      handleRemove(newToast.id);
    }, 5000);
  };
  console.log("allToasts are", allToasts);

  const handleRemove = (id) => {
    clearTimeout(timersId.current[id]);
    delete timersId.current[id];
    setAllToasts((prev) => {
      return prev.filter((item) => item.id !== id);
    });
  };

  return (
    <div className="flex flex-col gap-3 mt-10 justify-center items-center">
      <h2 className="font-bold text-2xl">Toast Notifications</h2>
      <div className="absolute top-10 right-20  flex flex-col gap-2">
        {allToasts.map((toast) => (
          <Toast key={toast.id} toast={toast} handleRemove={handleRemove} />
        ))}
      </div>
      <div className="flex gap-3">
        {btnMessages.map((btnMsg) => (
          <div key={btnMsg} className="flex gap-3">
            <button
              className=" px-3 py-1 rounded-sm w-32 bg-gray-300 text-black cursor-pointer "
              onClick={(e) => handleClick(e, btnMsg)}
            >
              {btnMsg}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
export default App;
