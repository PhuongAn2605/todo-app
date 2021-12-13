import UserTypes from "./user.types";

export const addUser = (user) => ({
    type: UserTypes.ADD_USER,
    payload: user
});