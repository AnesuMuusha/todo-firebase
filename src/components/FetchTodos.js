import React, { useState, useEffect } from 'react';

function FetchTodos() {
  const [todos, setTodos] = useState({});

  useEffect(() => {
    fetch("https://todolist-46004-default-rtdb.firebaseio.com/todos.json")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setTodos(data);
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });
  }, []);

  return (
    <div>
      <ul>
        {todos && Object.keys(todos).map((day) => (
          Object.keys(todos[day]).map((key) => (
            <li key={key}>{todos[day][key]}</li>
          ))
        ))}
      </ul>
    </div>
  );
}

export default FetchTodos;

