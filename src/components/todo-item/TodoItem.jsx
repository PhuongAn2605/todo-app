import React from "react";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

import "./TodoItem.scss";

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      edit: false
    };
  }

  componentDidMount() {
    // console.log('mounted');
    const { item } = this.props;

    this.setState({ title: item.title });
  }

  static getDerivedStateFromProps(nextProps, prevState) {

    if (nextProps.item.title !== prevState.title && !prevState.edit) {
      return { title: nextProps.item.title, edit: prevState.edit };
    } else if(nextProps.item.title !== prevState.title && prevState.edit){
      return { title: prevState.title, edit: prevState.edit }
    }
    
    else {
      return null;
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { item, toggleCompleted, editTitle } = this.props;

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
            this.setState({
              title: event.currentTarget.value,
              edit: true
            })
          }}
          onKeyPress={(event) => {
            if (event.key === "Enter") {
              editTitle(item, this.state.title);
            }
          }}
        />
      </div>
    );
  }
}

export default TodoItem;
