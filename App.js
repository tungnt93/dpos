import React, { Component } from 'react';
import MyApp from './src/MyApp';
import {Provider} from 'react-redux';
import store from './src/redux/store';

export default class App extends Component<{}> {

    render() {
        return (
            <Provider store={store}>
                <MyApp />
            </Provider>
        );
    }
}

