import React from "react";
import "./App.scss";
import InputField from "./components/input/Input";
import TodoItem from "./components/todo-item/TodoItem";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todoItems: [
        { title: "Learn NodeJS", isCompleted: false },
        { title: "Learn React", isCompleted: false },
      ],
      currentFilter: "all",
      filteredItems: [],
      unCompletedItems: 2,
      completedAll: false,
    };

    // this.showedTodoItem = [];
    // this.onItemClicked = this.onItemClicked.bind(this);
  }

  // componentDidMount() {
  //   const { currentFilter, todoItems } = this.state;
  //   if(currentFilter === "all"){
  //     for(let item of todoItems){
  //       this.showedTodoItem.push(item);
  //     }
  //   }else if(currentFilter === "active"){
  //     this.showedTodoItem = todoItems.filter(item => item.isCompleted === false);
  //   }else{
  //     this.showedTodoItem = todoItems.filter(item => item.isCompleted === true);
  //   }
  // }

  componentDidMount() {
    this.setState({
      ...this.state,
      currentFilter: "all",
      filteredItems: [...this.state.todoItems],
    });
  }

  shouldComponentUpdate() {
    return true;
  }

  // componentWillReceiveProps(nextProps){
  //   if(nextProps.todoItems !== this.state.todoItems){
  //     console.log('change')
  //   }
  // }

  onItemClicked(item) {
    const isCompleted = item.isCompleted;
    // console.log(isCompleted)
    const { todoItems, filteredItems, currentFilter } = this.state;
    const index = todoItems.indexOf(item);
    const filteredIndex = filteredItems.indexOf(item);

    this.setState({
      todoItems: [
        ...todoItems.slice(0, index),
        {
          ...item,
          isCompleted: !isCompleted,
        },
        ...todoItems.slice(index + 1),
      ],
      filteredItems:
        currentFilter === "all"
          ? [
              ...filteredItems.slice(0, filteredIndex),
              {
                ...item,
                isCompleted: !isCompleted,
              },
              ...filteredItems.slice(filteredIndex + 1),
            ]
          : filteredItems.slice(filteredIndex, 1),
      unCompletedItems: isCompleted
        ? this.state.unCompletedItems + 1
        : this.state.unCompletedItems - 1,
    });
  }

  handleAddItem(title) {
    const newItem = {
      title,
      isCompleted: false,
    };
    if (title.length > 0) {
      this.setState((prevState, props) => ({
        todoItems: [...prevState.todoItems, newItem],
        filteredItems:
          this.state.currentFilter === "all" ||
          this.state.currentFilter === "active"
            ? [...this.state.filteredItems, newItem]
            : [...this.state.filteredItems],
        unCompletedItems: this.state.unCompletedItems + 1,
      }));
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
      });
      this.setState((prevState) => ({
        todoItems: todoItems_temp,
        filteredItems: todoItems_temp,
        unCompletedItems: 0,
        completedAll: !this.state.completedAll,
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
    this.setState({
      ...this.state,
      currentFilter: "all",
      filteredItems: [...this.state.todoItems],
    });
  }

  handleShowActiveItems() {
    console.log(
      this.state.todoItems.filter((item) => item.isCompleted === false)
    );
    this.setState({
      ...this.state,
      currentFilter: "active",
      filteredItems: this.state.todoItems.filter(
        (item) => item.isCompleted === false
      ),
    });
    console.log(this.state.filteredItems);
  }

  handleShowCompletedItems() {
    this.setState({
      ...this.state,
      currentFilter: "completed",
      filteredItems: this.state.todoItems.filter(
        (item) => item.isCompleted === true
      ),
    });
    console.log(
      this.state.todoItems.filter((item) => item.isCompleted === true)
    );
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
