import { put, all, takeLatest, call } from "@redux-saga/core/effects";
import Http from "../../utils/http";
import {
  addTodoItemSuccess,
  clearCompletedAllSuccess,
  deleteTodoItemSuccess,
  editTodoItemSuccess,
  fetchTodoItemsFailure,
  fetchTodoItemsSuccess,
  toggleCompletedAllSuccess,
  toggleCompletedSuccess,
} from "./todoItem.actions";
import TodoItemTypes from "./todoItem.types";

export function* fetchTodoItemsData() {
  try {
    const data = yield Http.get("/");
    const todoItems = data.data;

    yield put(fetchTodoItemsSuccess(todoItems));
  } catch (error) {
    yield put(fetchTodoItemsFailure(error));
  }
}

export function* addTodoItem(action) {
  const title = action.payload.title;
  try {
    const data = yield Http.post("/add", {
      title,
    });
    const result = data.data;
    yield put(addTodoItemSuccess(result));
  } catch (error) {
    yield put(fetchTodoItemsFailure(error));
  }
}

export function* editTodoItemHandler(action) {
  const { title, item } = action.payload;
  const itemId = action.payload.item._id;
  try {
    yield Http.patch(`/edit/${itemId}`, {
      title,
    });
    yield put(editTodoItemSuccess(item, title));
  } catch (error) {
    yield put(fetchTodoItemsFailure(error));
  }
}

export function* deleteTodoItemHandler(action) {
  const item = action.payload;
  const itemId = action.payload._id;
  try {
    yield Http.delete(`/delete/${itemId}`);

    yield put(deleteTodoItemSuccess(item));
  } catch (error) {
    yield put(fetchTodoItemsFailure(error));
  }
}

export function* toggleTodoItemHandler(action) {
  const item = action.payload;
  const itemId = action.payload._id;
  try {
    yield Http.patch(`/toggle-completed/${itemId}`);
    yield put(toggleCompletedSuccess(item));
  } catch (error) {
    yield put(fetchTodoItemsFailure(error));
  }
}

export function* clearCompletedAllHandler() {
  try {
    yield Http.put("/clear-completed");

    yield put(clearCompletedAllSuccess());
  } catch (error) {
    yield put(fetchTodoItemsFailure(error));
  }
}

export function* toggleCompletedAllHandler(action) {
  const { completedAll } = action.payload;
  try {
    yield Http.patch("/toggle-completed-all", {
      completedAll,
    });

    yield put(toggleCompletedAllSuccess());
  } catch (error) {
    yield put(fetchTodoItemsFailure(error));
  }
}

export function* fetchTodoItems() {
  yield takeLatest(TodoItemTypes.FETCH_TODO_ITEMS, fetchTodoItemsData);
}

export function* addNewTodoItem() {
  yield takeLatest(TodoItemTypes.ADD_NEW_TODO_ITEM, addTodoItem);
}

export function* editTodoItem() {
  yield takeLatest(TodoItemTypes.EDIT_TODO_ITEM, editTodoItemHandler);
}

export function* deleteTodoItem() {
  yield takeLatest(TodoItemTypes.DELETE_TODO_ITEM, deleteTodoItemHandler);
}

export function* toggleTodoItemCompleted() {
  yield takeLatest(
    TodoItemTypes.TOOGLE_TODO_ITEM_COMPLETED,
    toggleTodoItemHandler
  );
}

export function* clearCompletedAll() {
  yield takeLatest(TodoItemTypes.CLEAR_COMPLETED, clearCompletedAllHandler);
}

export function* toggleCompletedAll() {
  yield takeLatest(
    TodoItemTypes.TOGGLE_COMPLETED_ALL,
    toggleCompletedAllHandler
  );
}

export function* todoItemsSaga() {
  yield all([
    call(fetchTodoItems),
    call(addNewTodoItem),
    call(editTodoItem),
    call(deleteTodoItem),
    call(toggleTodoItemCompleted),
    call(clearCompletedAll),
    call(toggleCompletedAll),
  ]);
}
