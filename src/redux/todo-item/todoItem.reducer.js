import { FormControlUnstyledContext } from "@mui/material";
import FilterTypes from "./todoItem.filterTypes";
import TodoItemTypes from "./todoItem.types";
import { addItem, editItem, deleteItem, editTitle, toggleCompleted, toggleCompletedAll, clearCompleted } from "./todoItem.utils";

const INITIAL_STATE = {
  todoItems: [],
  completedAll: false
};

const todoItemReducer = (state = INITIAL_STATE, action) => {
  // console.log(action.payload)
  switch (action.type) {
    case TodoItemTypes.ADD_ITEM:
      console.log("Add");
      // console.log(action.payload)
      return {
        ...state,
        todoItems: addItem(state.todoItems, action.payload),
      };
    case TodoItemTypes.EDIT_ITEM:
    //   console.log(action);
      return {
        ...state,
        todoItems: editTitle(
          state.todoItems,
          action.payload.item,
          action.payload.title
        ),
      };
    case TodoItemTypes.DELETE_ITEM:
        console.log('delete')
        return {
            ...state,
            todoItems: deleteItem(state.todoItems, action.payload)
        }

    case TodoItemTypes.TOOGLE_COMPLETED:
        console.log('toggle')
        return {
            ...state,
            todoItems: toggleCompleted(state.todoItems, action.payload)
        }
    case TodoItemTypes.TOGGLE_COMPLETED_ALL:
      return {
        todoItems: toggleCompletedAll(state.todoItems, state.completedAll),
        completedAll: !state.completedAll
      }
    case TodoItemTypes.CLEAR_COMPLETED:
      return {
        ...state,
        todoItems: clearCompleted(state.todoItems)
      }
    default:
      return state;
  }
};

export default todoItemReducer;
