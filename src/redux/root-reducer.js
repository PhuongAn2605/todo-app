import { combineReducers } from 'redux';
import todoItemReducer from './todo-item/todoItem.reducer';
import userReducer from './user/user.reducer';

export default combineReducers({
    todoItem: todoItemReducer,
    users: userReducer
});
