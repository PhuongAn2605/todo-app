import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import "./App.scss";
// import { v4 as uuidv4 } from "uuid";

// import { Switch, Link, Route, Browser as Router } from 'react-router-dom';

import InputField from "./components/input/Input";
import TodoItem from "./components/todo-item/TodoItem";
import FormDemo from "./components/form/FormDemo";
import { FormStyles } from "./components/form/FormDemo.styles";
import {
  showActiveItems,
  showAllItems,
  showCompletedItems,
} from "./redux/todo-item/todoItem.actions";
import FilterTypes from "./redux/todo-item/todoItem.filterTypes";

const App = ({todoItems, unCompletedItemsCount, filteredItems, showAllItems, showCompletedItems, showActiveItems}) => {
  // const { todoItems, unCompletedItemsCount, filteredItems, showAllItems, currentFilter } =
    // props;
  // console.log(todoItems)
  // console.log(filteredItems)

  // const [todoItems, setTodoItems] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  // const [filteredItems, setFilteredItems] = useState([]);
  // const [uncompletedItems, setUncompletedItems] = useState(0);
  const [completedAll, setCompletedAll] = useState(false);

  const [userinfo, setUserInfo] = useState([]);

  useEffect(() => {
    setCurrentFilter(FilterTypes.ALL);
  }, []);

  useEffect(() => {
    if(currentFilter === FilterTypes.ALL){
      showAllItems();
    }else if(currentFilter === FilterTypes.COMPLETED){
      showCompletedItems();
    }else{
      showActiveItems();
    }

  }, [currentFilter, todoItems]);

  const handleToogleCompletedAll = () => {
    let todoItems_temp = [];

    for (let item of todoItems) {
      todoItems_temp.push({
        title: item.title,
        isCompleted: completedAll ? false : true,
        id: item.id,
      });
      // setTodoItems(todoItems_temp);
      setCompletedAll(!completedAll);
    }
  };

  const handleClearCompleted = () => {
    // setTodoItems(todoItems.filter(i => !i.isCompleted));
  };

  const handleChangeUserinfo = (info) => {
    setUserInfo([...userinfo, info]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className="todos">todos</p>
      </header>
      <InputField
      // addItem={(title) => handleAddItem(title)}
      // completedAll={() => handleToogleCompletedAll()}
      />
      {filteredItems.length > 0 &&
        filteredItems.map((item, index) => (
          <TodoItem
            key={index}
            item={item}
            // toggleCompleted={() => onItemClicked(item)}
            // editTitle={(item, title) => handleEditTitle(item, title)}
            // removeItem={item => handleRemoveItem(item)}
          />
        ))}
      {todoItems.length > 0 && (
        <div className="footer">
          <div className="footer__left-item">
            {unCompletedItemsCount > 1
              ? `${unCompletedItemsCount} items left`
              : `${unCompletedItemsCount} item left`}
          </div>
          <div className="footer__right-item">
            <span
              className={currentFilter === FilterTypes.ALL ? "active-span" : ""}
              onClick={() => setCurrentFilter(FilterTypes.ALL)}
            >
              All
            </span>
            <span
              className={
                currentFilter === FilterTypes.ACTIVE ? "active-span" : ""
              }
              onClick={() => setCurrentFilter(FilterTypes.ACTIVE)}
            >
              Active
            </span>
            <span
              className={
                currentFilter === FilterTypes.COMPLETED ? "active-span" : ""
              }
              onClick={() => setCurrentFilter(FilterTypes.COMPLETED)}
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

      <FormDemo changeInfo={(info) => handleChangeUserinfo(info)} />
      {userinfo.length > 0 ? (
        userinfo.map((user) => (
          <FormStyles style={{ flexDirection: "row" }}>
            <span>{user.username}</span> - <span>{user.email}</span>
          </FormStyles>
        ))
      ) : (
        <FormStyles>No existing user!</FormStyles>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  todoItems: state.todoItem.todoItems,
  filteredItems: state.todoItem.filteredItems,
  unCompletedItemsCount: state.todoItem.unCompletedItemsCount,
  currentFilter: state.todoItem.currentFilter
});

const mapDispatchToProps = (dispatch) => ({
  showAllItems: () => dispatch(showAllItems()),
  showActiveItems: () => dispatch(showActiveItems()),
  showCompletedItems: () => dispatch(showCompletedItems()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
