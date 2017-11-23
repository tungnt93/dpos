
import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, ScrollView} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {styles} from '../../assets/Styles';

export default class Menu extends Component<{}> {
    static navigationOptions = ({ navigation }) => ({
        header:
            <View style={[styles.headerStyle, {paddingTop: 10}]}>
                <TouchableOpacity
                    style={{position:'absolute', padding: 10, marginTop: 25}}
                    onPress={() => navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" style={{color: '#fff', fontSize: 20}}/>
                </TouchableOpacity>
                <Text style={styles.headerTitleStyle}>{navigation.state.params.catalog.name}</Text>
            </View>
    });

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="rgba(0,0,0,0.3)" translucent={true}/>
                <ScrollView style={{flex: 1}}>
                    <View style={[styles.row, styles.borderBottom, {padding: 10}]}>
                        <Image source={require('../../assets/images/menu/khaivi.png')} style={styles.imgMenu}/>
                        <View style={{marginLeft: 10}}>
                            <Text style={[styles.text, styles.textSemibold, {color: '#C62828'}]}>Khai vị</Text>
                            <Text style={[styles.text]}>Giá: 100.000đ</Text>
                            <Text style={[styles.text]}>Khuyến mãi: 0đ</Text>
                        </View>
                    </View>
                    <View style={[styles.row, styles.borderBottom, {padding: 10}]}>
                        <Image source={require('../../assets/images/menu/thit.jpg')} style={styles.imgMenu}/>
                        <View style={{marginLeft: 10}}>
                            <Text style={[styles.text, styles.textSemibold, {color: '#C62828'}]}>Khai vị</Text>
                            <Text style={[styles.text]}>Giá: 100.000đ</Text>
                            <Text style={[styles.text]}>Khuyến mãi: 0đ</Text>
                        </View>
                    </View>
                    <View style={[styles.row, styles.borderBottom, {padding: 10}]}>
                        <Image source={require('../../assets/images/menu/lau.png')} style={styles.imgMenu}/>
                        <View style={{marginLeft: 10}}>
                            <Text style={[styles.text, styles.textSemibold, {color: '#C62828'}]}>Khai vị</Text>
                            <Text style={[styles.text]}>Giá: 100.000đ</Text>
                            <Text style={[styles.text]}>Khuyến mãi: 0đ</Text>
                        </View>
                    </View>
                    <View style={[styles.row, styles.borderBottom, {padding: 10}]}>
                        <Image source={require('../../assets/images/menu/haisan.png')} style={styles.imgMenu}/>
                        <View style={{marginLeft: 10}}>
                            <Text style={[styles.text, styles.textSemibold, {color: '#C62828'}]}>Khai vị</Text>
                            <Text style={[styles.text]}>Giá: 100.000đ</Text>
                            <Text style={[styles.text]}>Khuyến mãi: 0đ</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}