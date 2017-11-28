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

let token = '';
const saveToken = (state = token, action) => {
    if(action.type === 'SAVE_TOKEN'){
        token = action.token;
        return token;
    }
    return state;
};

let user = null;
const saveUser = (state = user, action) => {
    if(action.type === 'SAVE_USER'){
        user = action.user;
        return user;
    }
    return state;
};

let api = '';
const saveApi = (state = api, action) => {
    if(action.type === 'SAVE_API'){
        api = action.api;
        return api;
    }
    return state;
};

let socket = null;
const saveSocket = (state = socket, action) => {
    if(action.type === 'SAVE_SOCKET'){
        socket = action.socket;
        return socket;
    }
    return state;
};

const reducer = combineReducers({
    showLoading: showLoading,
    token: saveToken,
    user: saveUser,
    api: saveApi,
    socket: saveSocket
});

const store = createStore(reducer, applyMiddleware(thunk));
export default store;