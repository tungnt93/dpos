
import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, FlatList} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {styles} from '../../assets/Styles';

export default class Setting extends Component<{}> {
    static navigationOptions = ({ navigation }) => ({
        header:
            <View style={[styles.headerStyle, {paddingTop: 10}]}>
                <TouchableOpacity
                    style={{position:'absolute', padding: 10, marginTop: 25}}
                    onPress={() => navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" style={{color: '#fff', fontSize: 20}}/>
                </TouchableOpacity>
                <Text style={styles.headerTitleStyle}>Thiết lập</Text>
            </View>
    });

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="rgba(0,0,0,0.3)" translucent={true}/>
                <View style={{flex: 1, backgroundColor:'#fff'}}>
                    <View style={{flexDirection: 'row', backgroundColor:'#F5FCFF', padding: 10, alignItems:'center'}}>
                        <Text style={[styles.text, styles.textSemibold, styles.textRed, {flex :1}]}>
                            Website
                        </Text>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems:'center'}}>
                            <Text style={styles.textSmall}>Đổi website</Text>
                            <Ionicons name='ios-repeat' style={{marginLeft: 5, fontSize: 24, color: '#333'}}/>
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.text, {padding: 10, paddingBottom: 20, textDecorationLine:'underline'}]}>http://myrestaurant.com</Text>


                    <View style={{flexDirection: 'row', backgroundColor:'#F5FCFF', padding: 10, alignItems:'center'}}>
                        <Text style={[styles.text, styles.textSemibold, styles.textRed, {flex :1}]}>
                            Tài khoản
                        </Text>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems:'center'}}>
                            <Text style={styles.textSmall}>Đăng xuất</Text>
                            <Ionicons name='ios-log-out' style={{marginLeft: 5, fontSize: 24, color: '#333'}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.row, styles.borderBottom, {padding: 10, alignItems:'center'}]}>
                        <Text style={[styles.textSmall, {flex: 1}]}>Tên đăng nhập</Text>
                        <Text style={[styles.text, styles.textSemibold, {flex: 1.5}]}>tungnt</Text>
                    </View>
                    <View style={[styles.row, styles.borderBottom, {padding: 10, alignItems:'center'}]}>
                        <Text style={[styles.textSmall, {flex: 1}]}>Vị trí</Text>
                        <Text style={[styles.text, styles.textSemibold, {flex: 1.5}]}>Nhân viên</Text>
                    </View>
                </View>
            </View>
        );
    }
}