import {combineReducers} from 'redux'
import cripto from './cripto_reducer'
import user from './user_reducer'
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    cripto,  
    user,
    form: formReducer
})

export default rootReducer;