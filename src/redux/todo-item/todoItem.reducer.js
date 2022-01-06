import TodoItemTypes from "./todoItem.types";
import {
  deleteItem,
  editTitle,
  toggleCompleted,
  toggleCompletedAll,
  clearCompleted,
} from "./todoItem.utils";

const INITIAL_STATE = {
  todoItems: [],
  completedAll: false,
  error: null,
};

const todoItemReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TodoItemTypes.FETCH_TODO_ITEMS_SUCCESS:
      return {
        ...state,
        todoItems: [...state.todoItems, ...action.payload.todoItems],
        error: null,
      };

    case TodoItemTypes.FETCH_TODO_ITEMS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case TodoItemTypes.ADD_NEW_TODO_ITEM_SUCCESS:
     
      return {
        ...state,
        todoItems: [...state.todoItems, action.payload.todoItem],
        error: null
      };

    case TodoItemTypes.EDIT_TODO_ITEM_SUCCESS:
      return {
        ...state,
        todoItems: editTitle(
          state.todoItems,
          action.payload.item,
          action.payload.title
        ),
        error: null
      };

    case TodoItemTypes.DELETE_TODO_ITEM_SUCCESS:
      return {
        ...state,
        todoItems: deleteItem(state.todoItems, action.payload),
        error: null
      };

    case TodoItemTypes.TOOGLE_TODO_ITEM_COMPLETED_SUCCESS:
      return {
        ...state,
        todoItems: toggleCompleted(state.todoItems, action.payload),
        error: null
      };

    case TodoItemTypes.CLEAR_COMPLETED_SUCCESS:
      return {
        ...state,
        todoItems: clearCompleted(state.todoItems),
        error: null
      };

    case TodoItemTypes.TOGGLE_COMPLETED_ALL_SUCCESS:
      return {
        todoItems: toggleCompletedAll(state.todoItems, state.completedAll),
        completedAll: !state.completedAll,
        error: null
      };
    default:
      return state;
  }
};

export default todoItemReducer;
