import TodoItemTypes from "./todoItem.types";

export const fetchTodoItems = () => ({
  type: TodoItemTypes.FETCH_TODO_ITEMS,
});

export const fetchTodoItemsSuccess = (result) => ({
  type: TodoItemTypes.FETCH_TODO_ITEMS_SUCCESS,
  payload: result,
});

export const fetchTodoItemsFailure = (error) => ({
  type: TodoItemTypes.FETCH_TODO_ITEMS_FAILURE,
  payload: error,
});

export const addNewTodoItem = (item) => ({
  type: TodoItemTypes.ADD_NEW_TODO_ITEM,
  payload: item,
});

export const addTodoItemSuccess = (item) => ({
  type: TodoItemTypes.ADD_NEW_TODO_ITEM_SUCCESS,
  payload: item,
});

export const editTodoItem = (item, title) => ({
  type: TodoItemTypes.EDIT_TODO_ITEM,
  payload: {
    item,
    title,
  },
});

export const editTodoItemSuccess = (item, title) => ({
  type: TodoItemTypes.EDIT_TODO_ITEM_SUCCESS,
  payload: {
    item,
    title,
  },
});

export const deleteTodoItem = (item) => ({
  type: TodoItemTypes.DELETE_TODO_ITEM,
  payload: item,
});

export const deleteTodoItemSuccess = (item) => ({
  type: TodoItemTypes.DELETE_TODO_ITEM_SUCCESS,
  payload: item,
});

export const toggleCompleted = (item) => ({
  type: TodoItemTypes.TOOGLE_TODO_ITEM_COMPLETED,
  payload: item,
});

export const toggleCompletedSuccess = (item) => ({
  type: TodoItemTypes.TOOGLE_TODO_ITEM_COMPLETED_SUCCESS,
  payload: item,
});

export const clearCompletedAll = () => ({
    type: TodoItemTypes.CLEAR_COMPLETED
});

export const clearCompletedAllSuccess = () =>({
    type: TodoItemTypes.CLEAR_COMPLETED_SUCCESS
});

export const toggleCompletedAll = (completedAll) => ({
    type: TodoItemTypes.TOGGLE_COMPLETED_ALL,
    payload: {
        completedAll
    }
});

export const toggleCompletedAllSuccess = () => ({
    type: TodoItemTypes.TOGGLE_COMPLETED_ALL_SUCCESS,
})

