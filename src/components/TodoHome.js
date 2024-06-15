import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import FetchTodos from "./FetchTodos";
import { getFirestore, collection, onSnapshot, addDoc } from "firebase/firestore"; // Import required Firestore functions


function TodoHome() {
  const [input, setInput] = useState("");
  const [arrayTodo, setArrayTodo] = useState([]);
  const [isEditing, setIsEditing] = useState(null); // State to track the todo being edited
  const [editText, setEditText] = useState(""); // State to track the new text of the todo being edited
  const [filter, setFilter] = useState("all"); // State to track the current filter

  const auth = getAuth(); // Get the auth instance
  const db = getFirestore(); // Uncomment and use Firestore if needed

  useEffect(() => {
    const todosRef = collection(db, "todos"); // Reference to the todos collection
    const unsubscribe = onSnapshot(todosRef, (snapshot) => {
      setArrayTodo(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [db]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("email");
      window.location.reload(); // Refresh the page to show the SignIn component
    }).catch((error) => {
      alert("Failed to log out");
      console.error("Logout error: ", error);
    });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddTodo = () => {
    const newTodo = { id: Date.now(), text: input, completed: false }; // Adding a unique id and completed status to each todo
    setArrayTodo([...arrayTodo, newTodo]);
    setInput("");
  };

  const handleDeleteTodo = (id) => {
    setArrayTodo(arrayTodo.filter((todo) => todo.id !== id));
  };

  const handleCompletedTodo = (id) => {
    setArrayTodo(
      arrayTodo.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleEditTodo = (id) => {
    const todoToEdit = arrayTodo.find((todo) => todo.id === id);
    setIsEditing(id);
    setEditText(todoToEdit.text);
  };

  const handleEditInputChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSaveEdit = (id) => {
    setArrayTodo(
      arrayTodo.map((todo) =>
        todo.id === id ? { ...todo, text: editText } : todo
      )
    );
    setIsEditing(null);
    setEditText("");
  };

  // Filter handlers
  const handleFilterAll = () => setFilter("all");
  const handleFilterCompleted = () => setFilter("completed");
  const handleFilterActive = () => setFilter("active");

  // Filtered todos based on the current filter state
  const filteredTodos = arrayTodo.filter(todo => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true; // Default case (should not hit)
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      
      <p>
      <button
          className="absolute top-4 right-4  bg-orange-400 text-white font-bold py-2 px-4 rounded hover:bg-orange-500"
          onClick={handleLogout}
        >
          Log out
        </button>
      </p>
      <h3 className="text-orange-400 font-bold py-2 px-4 text-2xl">Todo-App</h3>
      <div>
        <input
          placeholder="Enter your todo!"
          className="px-2 border border-orange-400 rounded"
          onChange={handleInputChange}
          value={input}
        />
        {"  "}
        {input.length !== 0 ? (
          <button
            className="px-2 border border-gray-800 rounded"
            onClick={handleAddTodo}
          >
            +
          </button>
        ) : (
          <h1> </h1>
        )}
      </div>
      <div>
        <br />
        <br />
        <div className="text-orange-400 flex space-x-4 font-bold">
          <h6 onClick={handleFilterAll} className={filter === "all" ? "text-orange-500 animate-bounce" : ""}>All</h6>
          <h6 onClick={handleFilterCompleted} className={filter === "completed" ? "text-orange-500 animate-bounce" : ""}>Completed</h6>
          <h6 onClick={handleFilterActive} className={filter === "active" ? "text-orange-500 animate-bounce" : ""}>Active</h6>
        </div>
        <br />
        <ul>
          {filteredTodos.map((arrayT) => (
            <li key={arrayT.id} className={` ${arrayT.completed ? 'line-through' : ''}`}>
              {isEditing === arrayT.id ? (
                <>
                  <input
                    value={editText}
                    onChange={handleEditInputChange}
                    className="px-2 border border-gray-800 rounded"
                  />
                  <button
                    className="px-2 border border-gray-800 rounded"
                    onClick={() => handleSaveEdit(arrayT.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  {arrayT.text}
                  {"   "}
                  <button
                    className="px-2 border border-gray-800 rounded"
                    onClick={() => handleDeleteTodo(arrayT.id)}
                  >
                    Del
                  </button>
                  {"  "}
                  <button
                    className="px-2 border border-gray-800 rounded"
                    onClick={() => handleCompletedTodo(arrayT.id)}
                  >
                    Completed
                  </button>
                  {"  "}
                  <button
                    className="px-2 border border-gray-800 rounded"
                    onClick={() => handleEditTodo(arrayT.id)}
                  >
                    Edit
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
        <p><FetchTodos/></p>
      </div>
    </div>
  );
}

export default TodoHome;
