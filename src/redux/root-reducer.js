import { combineReducers } from 'redux';
import todoItemReducer from './todo-item/todoItem.reducer';
import userReducer from './user/user.reducer';

const rootReducer = combineReducers({
    todoItem: todoItemReducer,
    users: userReducer
});

export default rootReducer;
