import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';

let isLoading = false;
const showLoading = (state = isLoading, action)=>{
    if(action.type === 'SHOW_LOADING'){
        if(action.name === 'SHOW') isLoading = true;
        else isLoading = false;
        return isLoading;
    }
    return isLoading;
};

const reducer = combineReducers({
    showLoading: showLoading
});

const store = createStore(reducer, applyMiddleware(thunk));
export default store;