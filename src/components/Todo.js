import React, { useState } from "react";

function Todo() {
  const [input, setInput] = useState("");
  const [arrayTodo, setArrayTodo] = useState([]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddTodo = () => {
    setArrayTodo([...arrayTodo, input]);
    setInput("");
  };

  const handleLogout = () => {
    alert("failed to log out");
  };

  const handleDeleteTodo=()=>{
    console.log("");
  }


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <p>
        <button
          className="w-35  bg-orange-400 text-white font-bold py-2 px-4 rounded mb-2 hover:bg-orange-500"
          onClick={handleLogout}
        >
          Log out
        </button>
      </p>
      <h3 className="font-bold py-2 px-4 text-2xl">Todo-App</h3>
      <div>
        <input
          placeholder="Enter your todo!"
          className="px-2 border border-gray-800 rounded"
          onChange={handleInputChange}
          value={input}
        />
        {"  "}
        {input.length !== 0 ? ( 
        <button
          className="px-2 border border-gray-800 rounded"
          onClick={handleAddTodo}>
          +
        </button>):(<h1></h1>)}
      </div>
      <div>
        <br />
        <ul>
          {arrayTodo.map((arrayT, index) => (
            <li key={index}>
              {arrayT}
              {"   "}
              <button className="px-2 border border-gray-800 rounded">
                Del
              </button>
              {"  "}
              <button className="px-2 border border-gray-800 rounded">
                Completed
              </button>
              {"  "}
              <button className="px-2 border border-gray-800 rounded">
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
