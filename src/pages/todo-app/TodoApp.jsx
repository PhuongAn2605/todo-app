import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import "../../App.scss";

import InputField from "../../components/input/Input";
import TodoItem from "../../components/todo-item/TodoItem";
import { LinkStyles, TitleStyles } from "../utils/styles";

import {
  clearCompleted,
  showActiveItems,
  showAllItems,
  showCompletedItems,
} from "../../redux/todo-item/todoItem.actions";
import FilterTypes from "../../redux/todo-item/todoItem.filterTypes";

const TodoApp = ({ todoItems, clearCompleted }) => {
  const [currentFilter, setCurrentFilter] = useState(FilterTypes.ALL);
  const [filteredItems, setFilteredItems] = useState([]);
  const [uncompletedItemsCount, setUncompletedItemsCount] = useState(0);
  const [userinfo, setUserInfo] = useState([]);

  useEffect(() => {
    setCurrentFilter(FilterTypes.ALL);
  }, []);

  useEffect(() => {
    if (currentFilter === FilterTypes.ALL) {
      setFilteredItems([...todoItems]);
    } else if (currentFilter === FilterTypes.ACTIVE) {
      setFilteredItems(todoItems.filter((item) => !item.isCompleted));
    } else if (currentFilter === FilterTypes.COMPLETED) {
      setFilteredItems(todoItems.filter((item) => item.isCompleted));
    }
    console.log(filteredItems);
  }, [currentFilter, todoItems]);

  useEffect(() => {
    setUncompletedItemsCount(
      todoItems.filter((i) => i.isCompleted === false).length
    );
  }, [todoItems]);

  return (
    <div className="App">
      <header className="App-header">
        <TitleStyles>todos</TitleStyles>
      </header>
      <InputField />
      {filteredItems.length > 0 &&
        filteredItems.map((item, index) => (
          <TodoItem key={index} item={item} />
        ))}
      {todoItems.length > 0 && (
        <div className="footer">
          <div className="footer__left-item">
            {uncompletedItemsCount > 1
              ? `${uncompletedItemsCount} items left`
              : `${uncompletedItemsCount} item left`}
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
          <div className="clear-completed" onClick={() => clearCompleted()}>
            Clear Completed
          </div>
        </div>
      )}
      <LinkStyles>
        <NavLink to="/users" className="nav-link">
          User Form
        </NavLink>
      </LinkStyles>
    </div>
  );
};

const mapStateToProps = (state) => ({
  todoItems: state.todoItem.todoItems,
  filteredItems: state.todoItem.filteredItems,
  completedAll: state.todoItem.completedAll,
});

const mapDispatchToProps = (dispatch) => ({
  clearCompleted: () => dispatch(clearCompleted()),
});

export default connect(mapStateToProps, mapDispatchToProps)(TodoApp);
