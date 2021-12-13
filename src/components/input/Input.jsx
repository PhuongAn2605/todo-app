import React, { useRef, useState } from "react";
import { connect } from "react-redux";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import "./Input.scss";
import { addItem, toggleCompletedAll } from "../../redux/todo-item/todoItem.actions";


const InputField = ({ addItem, toggleCompletedAll }) => {
  // constructor() {
  //   super();
  //   this.state = {
  //     inputValue: "",
  //   };
  // }

  // const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  const handleChangeInput = (event) => {
    const value = event.currentTarget.value;
    inputRef.current.value = value;
  }
    // const { addItem, completedAll } = props;

    return (
      <div className="text-field">
        <KeyboardArrowDownOutlinedIcon
          fontSize="large"
          style={{ color: "#ccc" }}
          onClick={() => toggleCompletedAll()}
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
                  addItem(inputRef.current.value);
                  inputRef.current.value = null;
                }
                 
              }
          } }
        />
      </div>
    );
  }

const mapDispatchToProps = dispatch => ({
  addItem: title => dispatch(addItem(title)),
  toggleCompletedAll: () => dispatch(toggleCompletedAll())

});


export default connect(null, mapDispatchToProps)(InputField);
