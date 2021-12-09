import React from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";

import "./Input.scss";

class InputField extends React.Component {
  constructor() {
    super();
    this.state = {
      inputValue: "",
    };
  }

  handleChangeInput(event) {
    const value = event.currentTarget.value;
    // console.log(value);
    this.setState({
      inputValue: value,
    });
  }
  render() {
    const { addItem, completedAll } = this.props;
    const { inputValue } = this.state;

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
          value={inputValue}
          required
          onChange={(event) => this.handleChangeInput(event)}
          onKeyPress={event => {
              if(event.key === 'Enter'){
                event.preventDefault();
                  addItem(inputValue);
                  this.setState({
                      inputValue: ''
                  })
              }
          } }
        />
      </div>
    );
  }
}

export default InputField;
