import * as types from './types';

export function actionIncrement() {
    return {type: 'INCREMENT'}
}

//xu ly dong bo
export function decrement() {
    return {type: 'DECREMENT'}
}

//xu ly bat dong bo
export function increment() {
    return dispatch => {
        dispatch(actionIncrement());
    }
}