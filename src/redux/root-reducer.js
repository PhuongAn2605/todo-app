import { combineReducers } from 'redux';
import todoItemReducer from './todo-item/todoItem.reducer';

export default combineReducers({
    todoItem: todoItemReducer
});
