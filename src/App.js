import React from "react";
import "./App.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import TodoApp from "./pages/todo-app/TodoApp";
import UserForm from "./pages/user-form/UserForm";

const App = () => {


  return (
    <React.Fragment>
      <Switch>
        <Route exact path='/'>
          <TodoApp />
        </Route>
        <Route exact path='/users'>
          <UserForm />
        </Route>
      </Switch>
    </React.Fragment>
  );
};

export default App;
