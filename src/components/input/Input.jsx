import React, { useRef, useState } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import "./Input.scss";

const InputField = (props) => {
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
    const { addItem, completedAll } = props;

    return (
      <div className="text-field">
        <KeyboardArrowDownOutlinedIcon
          fontSize="large"
          style={{ color: "#ccc" }}
          onClick={() => completedAll()}
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
                  addItem(inputRef.current.value);
                  inputRef.current.value = null;
              }
          } }
        />
      </div>
    );
  }
export default InputField;
