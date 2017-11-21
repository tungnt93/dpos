
import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, StatusBar, TouchableOpacity } from 'react-native';
import {StackNavigator, TabNavigator, DrawerNavigator, addNavigationHelpers} from 'react-navigation';
import {Provider} from 'react-redux';
import store from './redux/store';
// import io from "react-native-socket.io-client";

import { HomeStack } from './Route';
// import { getItem } from './function/AsyncStorage';

export default class MyApp extends Component<{}> {
    constructor(props){
        super(props);

        // this.isShowSlide = getItem('isShowSlide');

        // this.socket = io.connect(config.node_server, {jsonp: false});
        // this.onListenerSocket();
        // console.ignoredYellowBox = ['Setting a timer'];
    }

    // onListenerSocket(){
    //     console.log(self.socket.connected);
    //     console.log('listener server');
    //     this.socket.on('push message', function (data) {
    //         console.log(data);
    //     });
    //     this.socket.on('connect', function (data) {
    //         console.log(self.socket.connected);
    //         console.log(data);
    //     });
    // }

    render() {
        return (
            <HomeStack/>
        );
    }
}



