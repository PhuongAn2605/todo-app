import TodoItemTypes from "./todoItem.types";

export const addItem = title => ({
    type: TodoItemTypes.ADD_ITEM,
    payload: title
});

export const editTitle = (item, title) => ({
    type: TodoItemTypes.EDIT_ITEM,
    payload: {
        item,
        title
    }
});

export const deleteItem = item => ({
    type: TodoItemTypes.DELETE_ITEM,
    payload: item
});

export const toggleCompleted = item => ({
    type: TodoItemTypes.TOOGLE_COMPLETED,
    payload: item
});

export const toggleCompletedAll = () => ({
    type: TodoItemTypes.TOGGLE_COMPLETED_ALL
});

export const clearCompleted = () => ({
    type: TodoItemTypes.CLEAR_COMPLETED
});