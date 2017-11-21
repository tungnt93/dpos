
import React, { Component } from 'react';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';

import Home from './component/home/Home';
import Menu from './component/home/Menu';

export const HomeStack = StackNavigator({
    Home: { screen: Home, navigationOptions:{ title: 'Trang chủ' }},
    Menu: { screen: Menu, navigationOptions:{ title: 'Thực đơn' }},
    // Home: { screen: Home, navigationOptions:{ title: null, header: null }},
});

// export const AppNavigation =  StackNavigator({
//     NavHome:{
//         screen: HomeStack
//     },
// });