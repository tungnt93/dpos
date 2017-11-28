
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, ActivityIndicator  } from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator, addNavigationHelpers} from 'react-navigation';
// import {Provider} from 'react-redux';
// import store from './redux/store';
import io from "react-native-socket.io-client";
import {connect} from 'react-redux';
import * as actionCreator from './redux/actionCreator';

import { AppNavigation, HomeStack, LoginStack } from './Route';
// import { getItem } from './function/AsyncStorage';
import * as asyncStorage from './helper/AsyncStorage';

class MyApp extends Component<{}> {
    constructor(props){
        super(props);
        this.state = {
            isLogin: false,
            showLoading: 0
        };

        let socket = io.connect('http://10.0.2.2:3000/', {jsonp: false});
        this.props.actionSaveSocket(socket);
        console.log(socket);
        console.ignoredYellowBox = ['Setting a timer'];

        // this.onListenerSocket();
        // this.isShowSlide = getItem('isShowSlide');
        // this.socket = io.connect(config.node_server, {jsonp: false});
        // this.onListenerSocket();
        // console.ignoredYellowBox = ['Setting a timer'];
    }

    onListenerSocket(){
        // console.log(self.socket.connected);
        // console.log('listener server');
        // this.socket.on('CLIENT_SEND', function (data) {
        //     alert(data);
        // });
        // this.socket.on('connect', function (data) {
        //     console.log(self.socket.connected);
        //     console.log(data);
        // });
    }

    componentWillMount(){
        // asyncStorage.removeItem('user');
        // asyncStorage.removeItem('api');
        // asyncStorage.removeItem('token');
    }

    render() {
        return (
            <HomeStack/>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        socket: state.socket
    }
};

export default connect(mapStateToProps, actionCreator)(MyApp)