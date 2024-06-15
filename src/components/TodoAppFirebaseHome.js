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
    setIsEditing(id);
    setEditText(todoToEdit.text);
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <p>
        <button
          className="absolute top-4 right-4 bg-orange-400 text-white font-bold py-2 px-4 rounded hover:bg-orange-500"
          onClick={handleLogout}
        >
          Log out
        </button>
      </p>
      <h3 className="text-orange-400 font-bold py-2 px-4 text-2xl sm:text-3xl">Todo-App</h3>
      <div className="w-full max-w-md">
        <input
          placeholder="Enter your todo!"
          className="w-full px-2 py-1 border border-orange-400 rounded"
          onChange={handleInputChange}
          value={input}
        />
        {"  "}
        {input.length !== 0 ? (
          <button
            className="px-2 py-1 mt-2 border border-gray-800 rounded"
            onClick={handleAddTodo}
          >
            +
          </button>
        ) : (
          <div className="mt-2"></div>
        )}
      </div>
      <div className="w-full max-w-md mt-4">
        <div className="text-orange-400 flex space-x-4 font-bold">
          <h6 onClick={handleFilterAll} className={`cursor-pointer ${filter === "all" ? "text-orange-500 animate-bounce" : ""}`}>All</h6>
          <h6 onClick={handleFilterCompleted} className={`cursor-pointer ${filter === "completed" ? "text-orange-500 animate-bounce" : ""}`}>Completed</h6>
          <h6 onClick={handleFilterActive} className={`cursor-pointer ${filter === "active" ? "text-orange-500 animate-bounce" : ""}`}>Active</h6>
        </div>
        <ul className="mt-4 space-y-2">
          {filteredTodos.map((arrayT) => (
            <li key={arrayT.id} className={`flex flex-col sm:flex-row sm:justify-between items-center break-words ${arrayT.completed ? 'line-through text-gray-500' : ''}`}>
              {isEditing === arrayT.id ? (
                <>
                  <input
                    value={editText}
                    onChange={handleEditInputChange}
                    className="flex-grow px-2 py-1 border border-gray-800 rounded mb-2 sm:mb-0 sm:mr-2"
                  />
                  <button
                    className="px-2 py-1 mb-2 sm:mb-0 sm:ml-2 border border-gray-800 rounded"
                    onClick={() => handleSaveEdit(arrayT.id)}
                  >
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-grow mb-2 sm:mb-0 break-all">{arrayT.text}</span>
                  <div className="flex flex-col sm:flex-row">
                    <button
                      className="px-2 py-1 mb-2 sm:mb-0 sm:ml-2 border border-gray-800 rounded"
                      onClick={() => handleDeleteTodo(arrayT.id)}
                    >
                      Del
                    </button>
                    <button
                      className="px-2 py-1 mb-2 sm:mb-0 sm:ml-2 border border-gray-800 rounded"
                      onClick={() => handleCompletedTodo(arrayT.id, arrayT.completed)}
                    >
                      Completed
                    </button>
                    <button
                      className="px-2 py-1 mb-2 sm:mb-0 sm:ml-2 border border-gray-800 rounded"
                      onClick={() => handleEditTodo(arrayT.id)}
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
