import React, { useEffect, useState } from "react";
import "./App.scss";
import { v4 as uuidv4 } from "uuid";


// import { Switch, Link, Route, Browser as Router } from 'react-router-dom'; 

import InputField from "./components/input/Input";
import TodoItem from "./components/todo-item/TodoItem";
import FormDemo from "./components/form/FormDemo";
import { FormStyles } from './components/form/FormDemo.styles';

const App = () => {

  const [todoItems, setTodoItems] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [filteredItems, setFilteredItems] = useState([]);
  const [uncompletedItems, setUncompletedItems] = useState(0);
  const [completedAll, setCompletedAll] = useState(false);

  const [userinfo, setUserInfo] = useState([]);

  useEffect(() => {
    console.log(todoItems)
    setUncompletedItems(todoItems && todoItems.filter(i => !i.isCompleted).length);

  }, [todoItems]);

  useEffect(() => {
    if(currentFilter === "all"){
      setFilteredItems(todoItems);
    }else if(currentFilter === "completed"){
      setFilteredItems(todoItems.filter(i => i.isCompleted));
    }else{
      setFilteredItems(todoItems.filter(i => !i.isCompleted));
    }

  }, [currentFilter, todoItems]);

  const onItemClicked = (item) => {
    const isCompleted = item.isCompleted;

    setTodoItems(todoItems.map(i => i.id === item.id ? {...i, isCompleted: !isCompleted} : i));
    
  }

  const handleAddItem = (title) => {
    if (title.trim().length > 0) {
      const newItem = {
        title: title.trim(),
        isCompleted: false,
        id: uuidv4(),
      };

      const todoItems_temp = [...todoItems];
      todoItems_temp.push(newItem);
      if (title.trim().length > 0) {
        setTodoItems(todoItems_temp);
      }
    }
  }

  const handleToogleCompletedAll = () => {
    let todoItems_temp = [];

    for (let item of todoItems) {
      todoItems_temp.push({
        title: item.title,
        isCompleted: completedAll ? false : true,
        id: item.id,
      });
      setTodoItems(todoItems_temp);
      setCompletedAll(!completedAll);

    }
  }

  const handleEditTitle = (item, title) => {
    const index = todoItems.indexOf(item);
    const filteredIndex = filteredItems.indexOf(item);

    setTodoItems([
      ...todoItems.slice(0, index),
      {
        ...item,
        title
      },
      ...todoItems.slice(index + 1)
    ])
  }

  const handleShowAllItems = () => {
    setCurrentFilter("all");
  }

  const handleShowActiveItems = () => {
    setCurrentFilter("active");
  }

  const handleShowCompletedItems = () => {
    setCurrentFilter("completed");
  }

  const handleClearCompleted = () => {
    setTodoItems(todoItems.filter(i => !i.isCompleted));
  }

  const handleChangeUserinfo = (info) => {
    setUserInfo([...userinfo, info]);

  }

  const handleRemoveItem = (item) => {
    console.log(item)
    setTodoItems(todoItems.filter(i => i.id !== item.id));
    console.log(todoItems);

  }

    return (
      <div className="App">
        <header className="App-header">
          <p className="todos">todos</p>
        </header>
        <InputField
          addItem={(title) => handleAddItem(title)}
          completedAll={() => handleToogleCompletedAll()}
        />
        {filteredItems.length > 0 &&
          filteredItems.map((item, index) => (
            <TodoItem
              key={index}
              item={item}
              toggleCompleted={() => onItemClicked(item)}
              editTitle={(item, title) => handleEditTitle(item, title)}
              removeItem={item => handleRemoveItem(item)}
            />
          ))}
        {todoItems.length > 0 && (
          <div className="footer">
            <div className="footer__left-item">
              {uncompletedItems > 1
                ? `${uncompletedItems} items left`
                : `${uncompletedItems} item left`}
            </div>
            <div className="footer__right-item">
              <span
                className={currentFilter === "all" ? "active-span" : ""}
                onClick={() => handleShowAllItems()}
              >
                All
              </span>
              <span
                className={currentFilter === "active" ? "active-span" : ""}
                onClick={() => handleShowActiveItems()}
              >
                Active
              </span>
              <span
                className={currentFilter === "completed" ? "active-span" : ""}
                onClick={() => handleShowCompletedItems()}
              >
                Completed
              </span>
            </div>
            <div
              className="clear-completed"
              onClick={() => handleClearCompleted()}
            >
              Clear Completed
            </div>
          </div>
        )}

        <FormDemo changeInfo={(info) => handleChangeUserinfo(info)}/>
        {userinfo.length > 0 ? (
          userinfo.map((user) => (
            <FormStyles style={{flexDirection: "row"}}>
              <span>{user.username}</span> - <span>{user.email}</span>
            </FormStyles>
          ))
        ) : (
          <FormStyles>No existing user!</FormStyles>
        )}
      </div>
    );
  }

export default App;
