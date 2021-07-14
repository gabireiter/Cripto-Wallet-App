import {
    GET_CRIPTOS,
    GET_USER_WALLET,
    SAVE_COIN_ID,
    UPDATE_WALLET_COIN,
    INSERT_WALLET_COIN,
    DELETE_WALLET_COIN,
    PASS_AMOUNT_PARAMETER,
    USER_REGISTER,
    SAVE_LOGIN_MESSAGE
} from '../actions/types'

export default function foo(state={},action) {
    switch (action.type) {
        case GET_CRIPTOS:
            return {...state,list: action.payload}
        case GET_USER_WALLET:
            return {...state,wallet:action.payload}        
        case SAVE_COIN_ID:
            return {...state,coin_data:action.payload}
        case UPDATE_WALLET_COIN:
            return {
                    ...state,
                    updatedCoin:action.payload.success,
                    coin:action.payload.doc
                }
        case INSERT_WALLET_COIN:
            return {
                    ...state,
                    insertedCoin:action.payload.success,
                    coin:action.payload.doc
                }
        case DELETE_WALLET_COIN:
            return {
                    ...state,
                    coinDeleted:action.payload
            }               
        case PASS_AMOUNT_PARAMETER:
            return {...state,parameters:action.payload}
        case USER_REGISTER:
            return {...state,user_registered:action.payload}
        case SAVE_LOGIN_MESSAGE:
            return {...state,message:action.payload}
        default:
            return state
    }
}