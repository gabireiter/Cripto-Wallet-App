import {
    USER_LOGIN,
    USER_AUTH,
    GET_USER,
    USER_REGISTER
} from '../actions/types'

export default function foo(state={},action) {
    switch (action.type) {
        case USER_LOGIN:
            return {...state,login: action.payload}
        case USER_AUTH:
            return {...state,login: action.payload}
        case GET_USER:
            return {...state,users:action.payload}
        case USER_REGISTER:
            return {
                ...state,
                register:action.payload.success,
                users:action.payload.users
            }    
        default:
            return state
    }
}