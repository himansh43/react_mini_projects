import { useEffect, useRef, useState } from "react";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [updateTask, setUpdateTask] = useState(false);
  const [updateTodoDetail,setUpdateTodoDetail]= useState(null)
  const ref= useRef()

  const handleAddTodo = () => {
    setTodos((prev) => {
      const newTodo = {
        id: crypto.randomUUID(),
        isCompleted: false,
        task: input,
      };
      return [...prev, newTodo];
    });
    setInput("");
  };
  const handleCompleted = (id) => {
    const copyTodos = [...todos];
    const todo = copyTodos.find((item) => item.id === id);
    todo.isCompleted = !todo.isCompleted;
    setTodos(copyTodos);
  };
  console.log("todos are", todos);
  const handleDeleteTodo = (id) => {
    const copyTodos = [...todos];
    const filteredItems = copyTodos.filter((item) => item.id !== id);
    setTodos(filteredItems);
  };

  const handleEdit = (todo) => {
    console.log("todo is", todo);
    setInput(todo.task);
    setUpdateTask(true);
    setUpdateTodoDetail(todo)
  };
  console.log("input is", input);

  const handleUpdate=()=>{
    const copyTodos=[...todos]
    const updateTodo=copyTodos.find((item)=>item.id===updateTodoDetail.id)
    console.log("updateTodo is", updateTodo)
    updateTodo.task=input
  setTodos((prev)=>
    prev.map((todo)=>todo.id===updateTodoDetail.id?{...todo,task:input}:todo)
  )
    setInput("")
    setUpdateTask(false)
    setUpdateTodoDetail(null)
  }

  useEffect(()=>{
    ref.current.focus()
  },[])

  return (
    <div className="flex flex-col gap-5 mt-10 justify-center items-center">
      <h2 className="text-xl font-medium">Todo-App</h2>
      <div className="flex flex-col gap-5 ">
        <div className="flex gap-5">
          <input
            type="text"
            name=""
            id=""
            className="border rounded-sm px-3 py-1 outline-none"
            placeholder="Enter todo..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            ref={ref}
          />
          {!updateTask && (
            <button
              className="bg-blue-500 px-3 py-1 w-24 text-white rounded"
              onClick={handleAddTodo}
            >
              Add task
            </button>
          )}

          {updateTask && (
            <button className="bg-blue-500 px-3 w-24 py-1 text-white rounded" onClick={handleUpdate}>
              update
            </button>
          )}
        </div>
        <div className="flex flex-col gap-3">
          {todos.map((item) => (
            <div
              className="flex justify-between items-center border px-3 py-1 rounded-sm"
              key={item.id}
            >
              <p className={`${item.isCompleted ? "line-through" : ""}`}>
                {item.task}
              </p>
              <div className="flex gap-5">
                <button onClick={() => handleCompleted(item.id)}>✔</button>
                <button onClick={() => handleEdit(item)}>✏</button>
                <button onClick={() => handleDeleteTodo(item.id)}>❌</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
