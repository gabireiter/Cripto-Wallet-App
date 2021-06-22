import {combineReducers} from 'redux'
import cripto from './cripto_reducer'
import user from './user_reducer'

const rootReducer = combineReducers({
    cripto,  
    user
})

export default rootReducer;