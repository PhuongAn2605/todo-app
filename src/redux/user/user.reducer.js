import UserTypes from "./user.types"

const INITIAL_STATE = {
    userList: []
}
const userReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case UserTypes.ADD_USER:
            return {
                ...state,
                userList: [...state.userList, action.payload]
            }
        default:
            return state;
    }

}

export default userReducer;