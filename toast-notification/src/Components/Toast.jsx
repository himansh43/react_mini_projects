import "../App.css"

const Toast = ({ toast,handleRemove }) => {
  return (
    <div className={`w-60 border flex justify-between px-3 py-2 rounded-md ${toast.message}` }>
      <div>{toast.message}</div>
      <button onClick={()=>handleRemove(toast.id)}>X</button>
    </div>
  );
};
export default Toast;
