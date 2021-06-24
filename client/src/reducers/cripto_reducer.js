import {GET_CRIPTOS,GET_USER_WALLET} from '../actions/types'

export default function foo(state={},action) {
    switch (action.type) {
        case GET_CRIPTOS:
            return {...state,list: action.payload}
        case GET_USER_WALLET:
            return {...state,wallet:action.payload}        
        case 'GET_BOOK_W_REVIEWER':
            return {
                ...state,
                book: action.payload.book,
                reviewer: action.payload.reviewer
            }
        case 'CLEAR_BOOK_W_REVIEWER':
            return {
                ...state,
                book: action.payload.book,
                reviewer: action.payload.reviewer
            }
        case 'ADD_BOOK':
            return {...state,newbook:action.payload}
        case 'CLEAR_NEWBOOK':
            return {...state,newbook:action.payload}
        case 'UPDATE_BOOK':
            return {
                ...state,
                updateBook:action.payload.success,
                book:action.payload.doc
            }
        case 'DELETE_BOOK':
            return {
                ...state,
                postDeleted:action.payload
            }
        case 'CLEAR_BOOK':
            return {
                ...state,
                updateBook:action.payload.updateBook,
                book:action.payload.book,
                postDeleted:action.payload.postDeleted
            }
        default:
            return state
    }
}