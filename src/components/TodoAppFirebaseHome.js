import { getAuth, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, set, push, remove, update } from "firebase/database";

function TodoAppFirebaseHome() {
  const [input, setInput] = useState("");
  const [arrayTodo, setArrayTodo] = useState([]);
  const [isEditing, setIsEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");

  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return; // Ensure the user is logged in

    const todosRef = ref(db, `todos/${user.uid}`);
    const unsubscribe = onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      const todosArray = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      setArrayTodo(todosArray);
    });

    return () => unsubscribe();
  }, [db, auth.currentUser]);

  const handleLogout = () => {
    signOut(auth).then(() => {
      localStorage.removeItem("email");
      window.location.reload();
    }).catch((error) => {
      alert("Failed to log out");
      console.error("Logout error: ", error);
    });
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddTodo = async () => {
    const user = auth.currentUser;
    if (!user) return; // Ensure the user is logged in

    const newTodoRef = push(ref(db, `todos/${user.uid}`));
    const newTodo = { text: input, completed: false };
    try {
      await set(newTodoRef, newTodo);
      setInput("");
    } catch (error) {
      console.error("Error adding todo: ", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleAddTodo();
    }
  };

  const handleDeleteTodo = async (id) => {
    const user = auth.currentUser;
    if (!user) return; // Ensure the user is logged in

    try {
      await remove(ref(db, `todos/${user.uid}/${id}`));
    } catch (error) {
      console.error("Error deleting todo: ", error);
    }
  };

  const handleCompletedTodo = async (id, completed) => {
    const user = auth.currentUser;
    if (!user) return; // Ensure the user is logged in

    try {
      await update(ref(db, `todos/${user.uid}/${id}`), { completed: !completed });
    } catch (error) {
      console.error("Error updating todo: ", error);
    }
  };

  const handleEditTodo = (id) => {
    const todoToEdit = arrayTodo.find((todo) => todo.id === id);
    if (!todoToEdit.completed) { // Only allow editing if the todo is not completed
      setIsEditing(id);
      setEditText(todoToEdit.text);
    }
  };

  const handleEditInputChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSaveEdit = async (id) => {
    const user = auth.currentUser;
    if (!user) return; // Ensure the user is logged in

    try {
      await update(ref(db, `todos/${user.uid}/${id}`), { text: editText });
      setIsEditing(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating todo: ", error);
    }
  };

  const handleFilterAll = () => setFilter("all");
  const handleFilterCompleted = () => setFilter("completed");
  const handleFilterActive = () => setFilter("active");

  const filteredTodos = arrayTodo.filter(todo => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.completed;
    if (filter === "active") return !todo.completed;
    return true;
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <p>
        <button
          className="absolute top-4 right-4 bg-orange-400 text-white font-bold py-2 px-4 rounded hover:bg-orange-500"
          onClick={handleLogout}
        >
          Log out
        </button>
      </p>
      <h3 className="text-orange-400 font-bold lg:pt-20 lg:pb-6 md:pb-4 sm:pb-4 px-2 md:text-2xl lg:text-4xl sm:text-sm ">Todo-App</h3>
      <div className="w-full max-w-md">
        <input
          placeholder="Enter your todo!"
          className="w-full px-2 py-1 border border-orange-400 rounded"
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          value={input}
        />
      </div>
      <div className="w-full max-w-md mt-4">
        <div className="text-orange-400 flex space-x-4 font-bold sm:text-sm md:text-lg  lg:text-xl">
          <h6 onClick={handleFilterAll} className={`cursor-pointer ${filter === "all" ? "text-orange-500 animate-bounce" : ""}`}>All</h6>
          <h6 onClick={handleFilterCompleted} className={`cursor-pointer ${filter === "completed" ? "text-orange-500 animate-bounce" : ""}`}>Completed</h6>
          <h6 onClick={handleFilterActive} className={`cursor-pointer ${filter === "active" ? "text-orange-500 animate-bounce" : ""}`}>Active</h6>
        </div>
        <ul className="mt-4 space-y-2 sm:text-sm">
          {filteredTodos.map((arrayT) => (
            <li key={arrayT.id} className="flex flex-row items-center break-words text-orange-500">
              {isEditing === arrayT.id ? (
                <>
                  <input
                    value={editText}
                    onChange={handleEditInputChange}
                    placeholder="Enter your todo!"
                    className="flex-grow px-2 py-1 border border-orange-400 rounded"
                  />
                  <button
                    className="px-2 py-1 ml-2 border border-orange-400 rounded bg-orange-400 text-white hover:bg-orange-500"
                    onClick={() => handleSaveEdit(arrayT.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className={`flex-grow break-all ${arrayT.completed ? 'line-through' : ''}`}>
                    {arrayT.text}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      className="px-2 py-1 border border-orange-400 rounded bg-orange-400 text-white hover:bg-orange-500"
                      onClick={() => handleDeleteTodo(arrayT.id)}
                    >
                      Del
                    </button>
                    <button
                      className="px-2 py-1 border border-orange-400 rounded bg-orange-400 text-white hover:bg-orange-500"
                      onClick={() => handleCompletedTodo(arrayT.id, arrayT.completed)}
                    >
                      Completed
                    </button>
                    <button
                      className={`px-2 py-1 border border-orange-400 rounded ${arrayT.completed ? 'bg-gray-400 text-gray-200 cursor-not-allowed' : 'bg-orange-400 text-white hover:bg-orange-500'}`}
                      onClick={() => handleEditTodo(arrayT.id)}
                      disabled={arrayT.completed}
                    >
                      Edit
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default TodoAppFirebaseHome;
