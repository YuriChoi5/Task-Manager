import React, {useState} from "react";
import TodoItem from "./TodoItem";
import EditTodoForm from "./EditTodoForm";

const DraggableList = ({ title, list, onDelete, onDragOver, onDrop, onDragStart, listName, onEdit }) => {
  
  const handleDelete = (itemId) => {onDelete(listName, itemId)};

  
  const [editItemId, setEditItemId] = useState(null);

  const toggleEditForm = (itemId) => {
    setEditItemId(itemId);
  };

  const handleEditFormSubmit = (itemId, updatedText) => {
    
    onEdit(listName, itemId, updatedText);
    setEditItemId(null);
  };



  return (
    <div
      className="list-column"
      onDragOver={onDragOver}
      onDrop={(e) => onDrop(e, listName)}
    >
      <h2>{title}</h2>
      <ul className="todo-list">
        {list.map((item, index) => (
          <li
            key={item.id}
            draggable
            onDragStart={(e) => onDragStart(e, listName, item.id, index)}
            onDrop={(e) => { e.stopPropagation(); onDrop(e, listName, item.id)}}
          >
            {/* <TodoItem item={item} list={list} onDelete={handleDelete} /> */}
            {editItemId === item.id ? (
              <EditTodoForm
                itemId={item.id}
                item={item}
                listName={listName}
                onSubmit={handleEditFormSubmit}
                onCancel={() => toggleEditForm(null)}
              />
            ) : (
              <TodoItem item={item} onDelete={handleDelete} onEdit={toggleEditForm} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DraggableList;