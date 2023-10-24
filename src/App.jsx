import React, { useState, useEffect } from "react";
import { v4 as uuid } from "uuid"; 
import Header from "./Header";
import Form from "./Form";
import DraggableList from "./DraggableList";
import "./App.css";



const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  const [darkMode, setDarkMode] = useState(false);

 
  const handleToggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  useEffect(() => {
    const storedTodoList = localStorage.getItem("todoList");
    const storedInProgressList = localStorage.getItem("inProgressList");
    const storedDoneList = localStorage.getItem("doneList");

    setTodoList(storedTodoList ? JSON.parse(storedTodoList) : []);
    setInProgressList(storedInProgressList ? JSON.parse(storedInProgressList) : []);
    setDoneList(storedDoneList ? JSON.parse(storedDoneList) : []);
  }, []);

  useEffect(() => {
    if (
      todoList.length === 0 ||
      inProgressList.length === 0 ||
      doneList.length === 0
    ) return;
    // Update local storage whenever todo items change
    localStorage.setItem("todoList", JSON.stringify(todoList));
    localStorage.setItem("inProgressList", JSON.stringify(inProgressList));
    localStorage.setItem("doneList", JSON.stringify(doneList));
  }, [todoList, inProgressList, doneList]);

  
  const handleNewTodoSubmit = (newTodo) => {
    const newTodoItem = {
      id: uuid(),
      date: new Date(),
      text: newTodo,
    };
    setTodoList((prevList) => [newTodoItem, ...prevList]);
    localStorage.setItem("todoList", JSON.stringify([newTodoItem, ...todoList]));
  };

  const handleEditTodo = (listName, itemId, newText) => {

    if (listName === "todoList") {
      const updatedTodoList = todoList.map((item) => {
        if (item.id === itemId) {
          return { ...item, text: newText };
        }
        return item;
      });
      setTodoList(updatedTodoList);
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
    } else if (listName === "inProgressList") {
      const updatedInProgressList = inProgressList.map((item) => {
        if (item.id === itemId) {
          return { ...item, text: newText };
        }
        return item;
      });
      setInProgressList(updatedInProgressList);
      localStorage.setItem("inProgressList", JSON.stringify(updatedInProgressList));
    } else if (listName === "doneList") {
      const updatedDoneList = doneList.map((item) => {
        if (item.id === itemId) {
          return { ...item, text: newText };
        }
        return item;
      });
      setDoneList(updatedDoneList);
      localStorage.setItem("doneList", JSON.stringify(updatedDoneList));
    }
  };



  const handleDeleteTodo = (listName, itemId) => {
    if (listName === "todoList") {
      const updatedTodoList = todoList.filter((item) => item.id !== itemId);
      setTodoList(updatedTodoList);
      localStorage.setItem("todoList", JSON.stringify(updatedTodoList));
    } else if (listName === "inProgressList") {
      const updatedInProgressList = inProgressList.filter((item) => item.id !== itemId);
      setInProgressList(updatedInProgressList);
      localStorage.setItem("inProgressList", JSON.stringify(updatedInProgressList));
    } else if (listName === "doneList") {
      const updatedDoneList = doneList.filter((item) => item.id !== itemId);
      setDoneList(updatedDoneList);
      localStorage.setItem("doneList", JSON.stringify(updatedDoneList));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e, listName, itemId, index) => {
    e.dataTransfer.setData("listName", listName);
    e.dataTransfer.setData("itemId", itemId);
    e.dataTransfer.setData('draggedItemIndex', index);
  };

  const listData = {
    "todoList": { list: todoList, setList: setTodoList },
    "inProgressList": { list: inProgressList, setList: setInProgressList },
    "doneList": { list: doneList, setList: setDoneList },
  };
  
  const handleDropOnList = (e, listName, itemId) => {
    const { list, setList } = listData[listName];
  
    const draggedItemIndex = e.dataTransfer.getData('draggedItemIndex');
    const draggedItem = list[draggedItemIndex];
    const dropIndex = list.findIndex(item => item.id === itemId);
  
    setList(prevItems => {
      const newItems = [...prevItems];
      newItems.splice(dropIndex, 0, draggedItem);
      
      return newItems;
    });
  };

  const handleDrop = (e, listName, itemId) => {

    const droppedListName = e.dataTransfer.getData("listName");
    const droppedItemId = e.dataTransfer.getData("itemId");

    if (droppedListName === "todoList") {
      const droppedItem = todoList.find((item) => item.id === droppedItemId);
      setTodoList(todoList.filter((item) => item.id !== droppedItemId));

      if (listName === "inProgressList") {
        setInProgressList([droppedItem, ...inProgressList]);
        console.log(droppedListName);
        console.log(droppedItem);
      } else if (listName === "doneList") {
        setDoneList([droppedItem, ...doneList]);
      } else if(listName === "todoList"){
        handleDropOnList(e, listName, itemId);
      }
    } else if (droppedListName === "inProgressList") {
      const droppedItem = inProgressList.find((item) => item.id === droppedItemId);
      setInProgressList(inProgressList.filter((item) => item.id !== droppedItemId));

      if (listName === "todoList") {
        setTodoList([droppedItem, ...todoList]);
      } else if (listName === "doneList") {
        setDoneList([droppedItem, ...doneList]);
      } else if (listName === "inProgressList") {
        handleDropOnList(e, listName, itemId);
      }
    } else if (droppedListName === "doneList") {
      const droppedItem = doneList.find((item) => item.id === droppedItemId);
      setDoneList(doneList.filter((item) => item.id !== droppedItemId));

      if (listName === "todoList") {
        setTodoList([droppedItem, ...todoList]);
      } else if (listName === "inProgressList") {
        setInProgressList([droppedItem, ...inProgressList]);
      }  else if (listName === "doneList") {
        handleDropOnList(e, listName, itemId);
      }
    }
    
  };


  return (
    <div className={`App ${darkMode ? "dark" : "light"}`}>
      <Header darkMode={darkMode} onToggleDarkMode={handleToggleDarkMode} />
      <Form onNewTodoSubmit={handleNewTodoSubmit}/>
        
      <div className="todo-container">
        <DraggableList
          title="To Do"
          list={todoList}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          listName="todoList"
        />
        <DraggableList
          title="In Progress"
          list={inProgressList}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          listName="inProgressList"
        />
        <DraggableList
          title="Done"
          list={doneList}
          onEdit={handleEditTodo}
          onDelete={handleDeleteTodo}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onDragStart={handleDragStart}
          listName="doneList"
        />
      </div>
    </div>
  );
};

export default App;