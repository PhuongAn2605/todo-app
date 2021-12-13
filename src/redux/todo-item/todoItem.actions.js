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

export const showAllItems = () => ({
    type: TodoItemTypes.SHOW_ALL
})

export const showActiveItems = () => ({
    type: TodoItemTypes.SHOW_ACTIVE
})

export const showCompletedItems = () => ({
    type: TodoItemTypes.SHOW_COMPLETED
})