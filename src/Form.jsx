import React, { useState } from "react";

const Form = ({ onNewTodoSubmit }) => {
  const [newTodo, setNewTodo] = useState("");

  const handleNewTodoChange = (e) => {
    setNewTodo(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim() !== "") {
      onNewTodoSubmit(newTodo);
      setNewTodo("");
    }
  };

  return (
    <form className="add-todo-form" onSubmit={handleFormSubmit}>
      <input
        type="text"
        value={newTodo}
        onChange={handleNewTodoChange}
        placeholder="Add a new todo..."
        className="add-todo-input"
      />
      <button className="submit-button" type="submit">
        Add
      </button>
    </form>
  );
};

export default Form;