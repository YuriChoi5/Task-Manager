import React, { useState } from "react";

const EditTodoForm = ({ itemId, item, onSubmit, onCancel }) => {
  const [updateInput, setUpdateInput] = useState(item.text);

  const handleChange = (e) => {
    setUpdateInput(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(itemId, updateInput);
    console.log(updateInput)
  };

  console.log(updateInput)

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };

  return (
    <form className="EditTodoForm"  onSubmit={handleSubmit} >
      <input
        type="text"
        value={updateInput}
        onChange={handleChange}
        className='edit-input'
      />
      <button type="submit" className="edit-button">Save</button>
      <button onClick={handleCancel} className="edit-button">Cancel</button>
    </form>
  );
};

export default EditTodoForm;