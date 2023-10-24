import React from "react";

const TodoItem = ({ item, onDelete, onEdit }) => {
  return (
    <>
      <span className="date">
        {new Date(item.date).toLocaleDateString()}
      </span>
      <span className="text">{item.text}</span>

      <button
        className="delete-button"
        Style="font-size:12px;"
        onClick={() => onEdit(item.id)}
      >
        🖊
      </button>
      <button className="delete-button" onClick={() => onDelete(item.id)}>
        &times;
      </button>
    </>
  );
};

export default TodoItem;
