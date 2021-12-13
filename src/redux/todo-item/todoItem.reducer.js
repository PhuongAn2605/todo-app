import { FormControlUnstyledContext } from "@mui/material";
import FilterTypes from "./todoItem.filterTypes";
import TodoItemTypes from "./todoItem.types";
import { addItem, editItem, deleteItem, editTitle, toggleCompleted } from "./todoItem.utils";

const INITIAL_STATE = {
  todoItems: [],
  unCompletedItemsCount: 0,
//   currentFilter: FilterTypes.ALL,
  filteredItems: []
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
        unCompletedItemsCount: state.unCompletedItemsCount + 1
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
        return {
            ...state,
            todoItems: deleteItem(state.todoItems, action.payload),
            unCompletedItemsCount: state.unCompletedItemsCount - 1
        }

    case TodoItemTypes.TOOGLE_COMPLETED:
        console.log('toggle')
        return {
            ...state,
            todoItems: toggleCompleted(state.todoItems, action.payload)
        }
    case TodoItemTypes.SHOW_ALL:
        return {
            ...state,
            // currentFilter: FilterTypes.ALL,
            filteredItems: [...state.todoItems]
        }
    case TodoItemTypes.SHOW_ACTIVE:
        return {
            ...state,
            // currentFilter: FilterTypes.ACTIVE,
            filteredItems: state.todoItems.filter(item => !item.isCompleted)
        }
    case TodoItemTypes.SHOW_COMPLETED:
        return {
            ...state,
            // currentFilter: FilterTypes.COMPLETED,
            filteredItems: state.todoItems.filter(item => item.isCompleted)
        }
    default:
      return state;
  }
};

export default todoItemReducer;
