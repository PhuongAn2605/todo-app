import React, { useRef } from "react";
import { connect } from "react-redux";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import "./Input.scss";
import { addNewTodoItem, toggleCompletedAll } from "../../redux/todo-item/todoItem.actions";


const InputField = ({ addItem, toggleCompletedAll, completedAll }) => {


  const inputRef = useRef(null);

  const handleChangeInput = (event) => {
    const value = event.currentTarget.value;
    inputRef.current.value = value;
  }

    return (
      <div className="text-field">
        <KeyboardArrowDownOutlinedIcon
          fontSize="large"
          style={{ color: "#ccc" }}
          onClick={() => toggleCompletedAll(completedAll)}
        />
        <input
          type="text"
          placeholder="What needs to be done?"
          // value={inputRef.current}
          ref={inputRef}
          required
          onChange={(event) => handleChangeInput(event)}
          onKeyPress={event => {
              if(event.key === 'Enter'){
                event.preventDefault();
                if(inputRef.current.value.length === 0){
                  alert('Empty task is not accepted!')
                }else{
                  addItem({title: inputRef.current.value });
                  inputRef.current.value = null;
                }
                 
              }
          } }
        />
      </div>
    );
  }

const mapStateToProps = state => ({
  completedAll: state.todoItem.completedAll
})

const mapDispatchToProps = dispatch => ({
  addItem: title => dispatch(addNewTodoItem(title)),
  toggleCompletedAll: (completedAll) => dispatch(toggleCompletedAll(completedAll))

});


export default connect(mapStateToProps, mapDispatchToProps)(InputField);
