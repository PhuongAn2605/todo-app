import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import "./TodoItem.scss";
import {
  deleteTodoItem,
  editTodoItem,
  toggleCompleted,
} from "../../redux/todo-item/todoItem.actions";

const TodoItem = ({ item, toggleCompleted, editTitle, deleteItem }) => {
  const [title, setTitle] = useState("");
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    setTitle(item.title);
  }, [item]);

  // const { item, toggleCompleted, editTitle, removeItem } = props;
  return (
    <div className="todo-item">
      {item.isCompleted ? (
        <CheckCircleOutlineOutlinedIcon onClick={() => toggleCompleted(item)} />
      ) : (
        <CircleOutlinedIcon onClick={() => toggleCompleted(item)} />
      )}
      {edit && (
        <input
          className={
            item.isCompleted
              ? "todo-item__title--completed"
              : "todo-item__title--uncompleted"
          }
          value={title}
          onChange={(event) => {
            setTitle(event.currentTarget.value);
            setEdit(true);
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              editTitle(item, title);
              setEdit(false);
            }
          }}
        />
      )}
      {!edit && (
        <div
          className={
            item.isCompleted
              ? "todo-item__title--completed"
              : "todo-item__title--uncompleted"
          }
        >
          {title}
        </div>
      )}
      <div className="icons" style={{ color: "#6e6b6b" }}>
        <EditIcon
          onClick={() => {
            setEdit(!edit);
          }}
        />
        <DeleteIcon onClick={() => deleteItem(item)} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  editTitle: (item, title) => dispatch(editTodoItem(item, title)),
  deleteItem: (item) => dispatch(deleteTodoItem(item)),
  toggleCompleted: (item) => dispatch(toggleCompleted(item)),
});

export default connect(null, mapDispatchToProps)(TodoItem);
