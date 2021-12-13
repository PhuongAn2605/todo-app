import React, { useEffect, useState } from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import "./TodoItem.scss";

const TodoItem = (props) => {

  console.log(props);

  const [title, setTitle] = useState('');
  const [edit, setEdit] = useState(false);

  useEffect(() => {

    setTitle(props.item.title);
  }, [props]);

    const { item, toggleCompleted, editTitle, removeItem } = props;
    return (
      <div className="todo-item">
        {item.isCompleted ? (
          <CheckCircleOutlineOutlinedIcon onClick={toggleCompleted} />
        ) : (
          <CircleOutlinedIcon onClick={toggleCompleted} />
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
        <DeleteIcon onClick={ () => removeItem(item)}/>
        </div>
      </div>
    );
  }

export default TodoItem;
