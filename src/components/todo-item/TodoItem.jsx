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
    // console.log(nextProps);
    // console.log(prevState);
    // console.log('derived')
    if (nextProps.item.title !== prevState.title && !prevState.edit) {
      // console.log('diff')
      return { title: nextProps.item.title, edit: prevState.edit };
    } else if(nextProps.item.title !== prevState.title && prevState.edit){
      return { title: prevState.title, edit: prevState.edit }
    }
    
    else {
      // console.log(prevState.title)
      // return {title: prevState.title};
      // console.log("not update");
      return null;
    }
  }

  shouldComponentUpdate() {
    return true;
  }

  render() {
    const { item, toggleCompleted, editTitle } = this.props;

    // console.log(item.title)
    // console.log(this.state.item.title)

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
            // console.log(event.currentTarget.value)
            // console.log(this.state.title);
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
