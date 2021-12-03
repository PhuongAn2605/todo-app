import React from "react";
import "./App.scss";
import InputField from "./components/input/Input";
import TodoItem from "./components/todo-item/TodoItem";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todoItems: [
        // { title: "Learn NodeJS", isCompleted: false },
        // { title: "Learn React", isCompleted: false },
      ],
      newItem: "",
      unCompletedItems: 0,
    };
    // this.onItemClicked = this.onItemClicked.bind(this);
  }

  onItemClicked(item) {
    const isCompleted = item.isCompleted;
    // console.log(isCompleted)
    const { todoItems } = this.state;
    const index = todoItems.indexOf(item);
    // console.log(index);
    // let count = 0;
    // if(todoItems.length !== 0){
    //   for(let item of todoItems){
    //     console.log(item)
    //     if(!item.isCompleted){
    //       count ++;
    //     }
    //   }
    // }
    console.log(!item.isCompleted);
    this.setState(prevState => ({
      todoItems: [
        ...prevState.todoItems.slice(0, index),
        {
          title: item.title,
          isCompleted: !isCompleted,
        },
        ...prevState.todoItems.slice(index + 1),
      ],
      unCompletedItems: todoItems.filter(item => item.isCompleted === false).length - 1
    }));
    console.log(todoItems.filter(item => item.isCompleted === false));

  }

  handleAddItem(title) {
    // const {todoItems} = this.state;


    if (title.length > 0) {
      this.setState((prevState, props) => ({
        todoItems: [
          ...prevState.todoItems,
          {
            title,
            isCompleted: false,
          },
        ],
        unCompletedItems: this.state.unCompletedItems + 1
      }));
    }
  }

  handleCompletedAll() {
    const { todoItems } = this.state;
    let todoItems_temp = [];
    for (let item of todoItems) {
      // console.log(item);

      todoItems_temp.push({
        title: item.title,
        isCompleted: true,
      });
      this.setState((prevState) => ({
        todoItems: todoItems_temp,
        unCompletedItems: 0
      }));
    }
  }

  render() {
    const { todoItems, unCompletedItems } = this.state;
    // console.log(todoItems);
    return (
      <div className="App">
        <header className="App-header">
          <p className="todos">todos</p>
        </header>
        <InputField
          addItem={(title) => this.handleAddItem(title)}
          completedAll={() => this.handleCompletedAll()}
        />
        {todoItems.length > 0 &&
          todoItems.map((item, index) => (
            <TodoItem
              key={index}
              item={item}
              toggleCompleted={() => this.onItemClicked(item)}
            />
          ))}
        {todoItems.length > 0 && (
          <div className="footer">
            <div className="footer__left-item">
              {unCompletedItems > 1
                ? `${unCompletedItems} items left`
                : `${unCompletedItems} item left`}
            </div>
            <div className="footer__right-item">
              <span className="all">All</span>
              <span className="active">Active</span>
              <span className="completed">Completed</span>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
