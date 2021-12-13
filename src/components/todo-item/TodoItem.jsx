import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import "./TodoItem.scss";
import { deleteItem, editTitle, toggleCompleted } from "../../redux/todo-item/todoItem.actions";

const TodoItem = ({item, toggleCompleted, editTitle, deleteItem}) => {

  const [title, setTitle] = useState('');
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
        {edit && <input
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
              setTitle(false);
            }
          }}
        />}
        {!edit && <div
          className={
            item.isCompleted
              ? "todo-item__title--completed"
              : "todo-item__title--uncompleted"
          }
        >{title}</div>}
        <div className="icons" style={{color: "#6e6b6b"}}>
        <EditIcon onClick={()=> {
          setEdit(!edit)
        }} />
        <DeleteIcon onClick={ (item) => deleteItem(item)}/>
        </div>
      </div>
    );
  }

  const mapDispatchToProps = dispatch => ({
    editTitle: (item, title) => dispatch(editTitle(item, title)),
    deleteItem: item => dispatch(deleteItem(item)),
    toggleCompleted: item => dispatch(toggleCompleted(item))
  })

export default connect(null, mapDispatchToProps)(TodoItem);
