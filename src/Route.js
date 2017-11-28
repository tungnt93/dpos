
import React, { Component } from 'react';
import {TabNavigator, StackNavigator, DrawerNavigator} from 'react-navigation';

import Home from './component/home/Home';
import Catalog from './component/home/Catalog';
import Menu from './component/home/Menu';
import Order from './component/home/Order';
import TableOrder from './component/home/TableOrder';
import Setting from './component/home/Setting';
import Login from './component/login/Login';

export const HomeStack = StackNavigator({
    Login: { screen: Login, navigationOptions:{ title: '', header: null }},
    Home: { screen: Home, navigationOptions:{ title: 'Trang chủ' }},
    Catalog: { screen: Catalog, navigationOptions:{ title: 'Thực đơn' }},
    Menu: { screen: Menu, navigationOptions:{ title: '' }},
    Order: { screen: Order, navigationOptions:{ title: '' }},
    TableOrder: { screen: TableOrder, navigationOptions:{ title: '' }},
    Setting: { screen: Setting, navigationOptions:{ title: '' }},

    // Home: { screen: Home, navigationOptions:{ title: null, header: null }},
});

export const LoginStack = StackNavigator({
    Login: { screen: Login, navigationOptions:{ title: '', header: null }},
});

export const AppNavigation =  StackNavigator({
    NavHome:{
        screen: HomeStack
    },
    NavLogin:{
        screen: LoginStack
    }
});