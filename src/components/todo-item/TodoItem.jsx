import React from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { EditText } from "react-edit-text";

import "./TodoItem.scss";

class TodoItem extends React.Component {
  constructor(){
    super();
    this.state = {
      title: ''
    }
  }
  componentDidMount(){
    const { item } = this.props;
    this.setState({ title: item.title })
  }
  render() {
    const { item, toggleCompleted, editTitle } = this.props;

    // console.log(item)

    return (
      <div className="todo-item">
        {item.isCompleted ? (
          <CheckCircleOutlineOutlinedIcon onClick={toggleCompleted} />
        ) : (
          <CircleOutlinedIcon onClick={toggleCompleted} />
        )}
        <input
          className={
            item.isCompleted
              ? "todo-item__title--completed"
              : "todo-item__title--uncompleted"
          }
          value={this.state.title}
          onChange={(event) => {
            this.setState({title: event.currentTarget.value});
            editTitle(item, this.state.title)
          }}
        />
      </div>
    );
  }
}

export default TodoItem;
