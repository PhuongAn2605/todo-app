import React from "react";
import "./App.scss";
import { v4 as uuidv4 } from "uuid";

import InputField from "./components/input/Input";
import TodoItem from "./components/todo-item/TodoItem";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [
        // { title: "Learn NodeJS", isCompleted: false },
        // { title: "Learn React", isCompleted: false },
      ],
      currentFilter: "all",
      filteredItems: [],
      unCompletedItems: 0,
      completedAll: false,
      // isUpdating: false
    };
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log(nextState);
    return true;
  }

  componentDidUpdate() {
    console.log("Did update");
  }

  onItemClicked(item) {
    console.log(item)
    const isCompleted = item.isCompleted;
    // console.log(isCompleted)
    // const { todoItems, filteredItems, currentFilter } = this.state;
    // const index = todoItems.indexOf(item);
    // const filteredIndex = filteredItems.indexOf(item);

    this.setState((prevState) => ({
      todoItems: prevState.todoItems.map((i) =>
        i.id === item.id ? { ...i, isCompleted: !isCompleted } : i
      ),
      filteredItems:
        prevState.currentFilter === "all"
          ? prevState.filteredItems.map((i) =>
              i.id === item.id ? { ...i, isCompleted: !isCompleted } : i
            )
          : prevState.filteredItems.filter((i) => i.id !== item.id),
      unCompletedItems: isCompleted
        ? prevState.unCompletedItems + 1
        : prevState.unCompletedItems - 1,
    }));
  }

  handleAddItem(title) {
    if (title.trim().length > 0) {
      const newItem = {
        title: title.trim(),
        isCompleted: false,
        id: uuidv4(),
      };
      // console.log(newItem)
      if (title.length > 0) {
        this.setState((prevState, props) => ({
          todoItems: [...prevState.todoItems, newItem],
          filteredItems:
            prevState.currentFilter === "all" ||
            prevState.currentFilter === "active"
              ? [...prevState.filteredItems, newItem]
              : [...prevState.filteredItems],
          unCompletedItems: prevState.unCompletedItems + 1,
        }));
      }
    }
  }

  handleToogleCompletedAll() {
    const { todoItems } = this.state;
    let todoItems_temp = [];

    for (let item of todoItems) {
      // console.log(item);

      todoItems_temp.push({
        title: item.title,
        isCompleted: this.state.completedAll ? false : true,
        id: item.id
      });
      this.setState((prevState) => ({
        todoItems: todoItems_temp,
       
        unCompletedItems: todoItems_temp.filter(
          (item) => item.isCompleted === false
        ).length,
        completedAll: !this.state.completedAll,
        // filteredItems: () => {
        //   console.log(prevState)
        //   if(this.state.completedAll && prevState.currentFilter === "active"){
        //     return prevState.filteredItems.map(i => i.isCompleted === false)
        //   }else{
        //     return todoItems_temp;
        //   }
        // }
        filteredItems: (prevState.currentFilter === "active" && !this.state.completedAll) || (prevState.currentFilter === "completed" && this.state.completedAll) ? [] : todoItems_temp
      }));
    }
  }

  handleEditTitle(item, title) {
    const { todoItems, filteredItems } = this.state;
    const index = todoItems.indexOf(item);
    const filteredIndex = filteredItems.indexOf(item);

    this.setState({
      todoItems: [
        ...todoItems.slice(0, index),
        {
          ...item,
          title,
        },
        ...todoItems.slice(index + 1),
      ],
      filteredItems: [
        ...filteredItems.slice(0, filteredIndex),
        {
          ...item,
          title,
        },
        ...filteredItems.slice(filteredIndex + 1),
      ],
    });
  }

  handleShowAllItems() {
    // console.log(this.state.todoItems);
    this.setState({
      ...this.state,
      currentFilter: "all",
      filteredItems: [...this.state.todoItems],
    });
  }

  handleShowActiveItems() {
    // console.log(
    //   this.state.todoItems.filter((item) => item.isCompleted === false)
    // );
    this.setState({
      ...this.state,
      currentFilter: "active",
      filteredItems: this.state.todoItems.filter(
        (item) => item.isCompleted === false
      ),
    });
    // console.log(this.state.filteredItems);
  }

  handleShowCompletedItems() {
    this.setState({
      ...this.state,
      currentFilter: "completed",
      filteredItems: this.state.todoItems.filter(
        (item) => item.isCompleted === true
      ),
    });
    // console.log(
    //   this.state.todoItems.filter((item) => item.isCompleted === true)
    // );
  }

  handleClearCompleted() {
    this.setState({
      ...this.state,
      todoItems: this.state.todoItems.filter(
        (item) => item.isCompleted === false
      ),
      filteredItems: this.state.filteredItems.filter(
        (item) => item.isCompleted === false
      ),
    });
  }

  render() {
    const { filteredItems, unCompletedItems, currentFilter } = this.state;
    // console.log(todoItems);
    return (
      <div className="App">
        <header className="App-header">
          <p className="todos">todos</p>
        </header>
        <InputField
          addItem={(title) => this.handleAddItem(title)}
          completedAll={() => this.handleToogleCompletedAll()}
        />
        {filteredItems.length > 0 &&
          filteredItems.map((item, index) => (
            <TodoItem
              key={index}
              item={item}
              toggleCompleted={() => this.onItemClicked(item)}
              editTitle={(item, title) => this.handleEditTitle(item, title)}
            />
          ))}
        {this.state.todoItems.length > 0 && (
          <div className="footer">
            <div className="footer__left-item">
              {unCompletedItems > 1
                ? `${unCompletedItems} items left`
                : `${unCompletedItems} item left`}
            </div>
            <div className="footer__right-item">
              <span
                className={currentFilter === "all" ? "active-span" : ""}
                onClick={() => this.handleShowAllItems()}
              >
                All
              </span>
              <span
                className={currentFilter === "active" ? "active-span" : ""}
                onClick={() => this.handleShowActiveItems()}
              >
                Active
              </span>
              <span
                className={currentFilter === "completed" ? "active-span" : ""}
                onClick={() => this.handleShowCompletedItems()}
              >
                Completed
              </span>
            </div>
            <div
              className="clear-completed"
              onClick={() => this.handleClearCompleted()}
            >
              Clear Completed
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
