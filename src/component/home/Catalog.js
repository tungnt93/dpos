
import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, ScrollView} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {styles} from '../../assets/Styles';


export default class Catalog extends Component<{}> {
    static navigationOptions = ({ navigation }) => ({
        headerLeft:
            <TouchableOpacity onPress={() => {navigation.goBack()}}>

            </TouchableOpacity>,
        header:
            <View style={[styles.headerStyle, {paddingTop: 10}]}>
                <TouchableOpacity
                    style={{position:'absolute', padding: 10, marginTop: 25}}
                    onPress={() => navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" style={{color: '#fff', fontSize: 20}}/>
                </TouchableOpacity>
                <Text style={styles.headerTitleStyle}>Thực đơn</Text>
            </View>
    });

    constructor(props){
        super(props);
        this.state = {
            catalogs: []
        }
    }

    // componentWillMount(){
    //     let URL = 'http://127.0.0.1/restaurant/api/index/catalog';
    //     fetch(URL)
    //         .then((response)=> response.json())
    //         .then((responseData)=>{
    //             console.log(responseData.data);
    //         });
    // }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="rgba(0,0,0,0.3)" translucent={true}/>
                <ScrollView style={{flex: 1}}>
                    <View style={[styles.row, {paddingVertical: 15}]}>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('Menu', {catalog: {id: 1, name: 'Món khai vị'}})}
                            style={styles.center}>
                            <Image source={require('../../assets/images/menu/khaivi.png')} style={styles.imgMenu}/>
                            <Text style={[styles.text, {marginTop: 6}]}>Khai vị</Text>
                        </TouchableOpacity>
                        <View style={styles.center}>
                            <Image source={require('../../assets/images/menu/thit.jpg')} style={styles.imgMenu}/>
                            <Text style={[styles.text, {marginTop: 6}]}>Món thịt</Text>
                        </View>
                    </View>
                    <View style={[styles.row, {paddingVertical: 15}]}>
                        <View style={styles.center}>
                            <Image source={require('../../assets/images/menu/lau.png')} style={styles.imgMenu}/>
                            <Text style={[styles.text, {marginTop: 6}]}>Món lẩu</Text>
                        </View>
                        <View style={styles.center}>
                            <Image source={require('../../assets/images/menu/haisan.png')} style={styles.imgMenu}/>
                            <Text style={[styles.text, {marginTop: 6}]}>Hải sản</Text>
                        </View>
                    </View>
                    <View style={[styles.row, {paddingVertical: 15}]}>
                        <View style={styles.center}>
                            <Image source={require('../../assets/images/menu/rau.png')} style={styles.imgMenu}/>
                            <Text style={[styles.text, {marginTop: 6}]}>Món rau</Text>
                        </View>
                        <View style={styles.center}>
                            <Image source={require('../../assets/images/menu/trangmieng.png')} style={styles.imgMenu}/>
                            <Text style={[styles.text, {marginTop: 6}]}>Tráng miệng</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }
}