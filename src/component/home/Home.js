
import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, FlatList} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {styles} from '../../assets/Styles';

export default class Home extends Component<{}> {
    static navigationOptions = ({ navigation }) => ({
        headerTitleStyle: styles.headerTitleStyle,
        headerStyle: styles.headerStyle,
    });

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="rgba(0,0,0,0.3)" translucent={true}/>
                <View style={{flex: 1, paddingVertical: 10}}>
                    <View style={styles.center}>
                        <Image source={require('../../assets/images/logo.png')} style={{width: 200, height: 100, resizeMode:'contain'}}/>
                    </View>

                    <View style={[styles.row, {flex: 1}]}>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('Catalog')}
                            style={styles.center}>
                            <Ionicons name='ios-list' style={styles.icon}/>
                            <Text style={[styles.text]}>Thực đơn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('Order')}
                            style={[styles.center, styles.borderLeft]}>
                            <Ionicons name='ios-restaurant-outline' style={styles.icon}/>
                            <Text style={[styles.text]}>Gọi món</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.row, {flex: 1}]}>
                        <View style={[styles.center, styles.borderTop, styles.borderBottom]}>
                            <Ionicons name='ios-add-circle-outline' style={styles.icon}/>
                            <Text style={[styles.text]}>Đặt bàn</Text>
                        </View>
                        <View style={[styles.center, styles.borderTop, styles.borderBottom, styles.borderLeft]}>
                            <Ionicons name='ios-calculator-outline' style={styles.icon}/>
                            <Text style={[styles.text]}>Thanh toán</Text>
                        </View>
                    </View>
                    <View style={[styles.row, {flex: 1}]}>
                        <View style={styles.center}>
                            <Ionicons name='ios-restaurant-outline' style={styles.icon}/>
                            <Text style={[styles.text]}>Gọi món</Text>
                        </View>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('Setting')}
                            style={[styles.center, styles.borderLeft]}>
                            <Ionicons name='ios-settings-outline' style={styles.icon}/>
                            <Text style={[styles.text]}>Thiết lập</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}