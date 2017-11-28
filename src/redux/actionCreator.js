

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

export function saveToken(token) {
    return {type: 'SAVE_TOKEN', token}
}

export function saveUser(user) {
    return {type: 'SAVE_USER', user}
}

export function saveApi(api) {
    return {type: 'SAVE_API', api}
}