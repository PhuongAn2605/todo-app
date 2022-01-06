import { all, call } from '@redux-saga/core/effects';
import { todoItemsSaga } from './todo-item/todoItem.sagas';


export default function* rootSaga(){
    yield all([
        call(todoItemsSaga)
    ])
}