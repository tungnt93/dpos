
import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, Dimensions, TextInput} from 'react-native';
import {NavigationActions} from 'react-navigation';
var CryptoJS =  require("crypto-js");
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {styles} from '../../assets/Styles';
import * as asyncStorage from '../../helper/AsyncStorage';
import * as api from '../../helper/Api';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;


export default class Login extends Component<{}> {
    constructor(props){
        super(props);
        this.state = {
            username: 'admin',
            password: 'adminA123',
            api: 'http://kyucxua.net/api/MobileApp/',
            step: 1
        }
    }

    componentWillMount(){
        asyncStorage.getItem('user').then(info=>{
            console.log(info);
            if(info){
                this.gotoHome();
            }
            else{
                asyncStorage.getItem('api').then(api=>{
                    if(!api){
                        this.setState({step: 2});
                    }
                    else{
                        this.setState({api})
                    }
                });
            }
        });
    }

    login(){
        if(this.state.username === ''){

        }
        else if(this.state.password === ''){

        }
        else{
            let username = this.state.username;
            let password = CryptoJS.MD5(this.state.password).toString();
            api.api(this.state.api + 'login', {username, password}).then(res=>{
                // alert(res);
                res = JSON.parse(res);
                console.log(res.message.token);
                if(res.status === 'success'){
                    asyncStorage.setItem('token', res.message.token);
                    asyncStorage.setItem('user', res.message.info, 'JSON').then(r=>{
                        this.gotoHome();
                    });
                }
                else{
                    alert(res.message.error);
                }
            })
        }
    }

    gotoHome(){
        let action = NavigationActions.reset({
            index: 0,
            key: null,
            actions: [
                NavigationActions.navigate({ routeName: 'Home'})
            ]
        });
        this.props.navigation.dispatch(action);
    }

    setLink(){
        if(this.state.api === ''){
            alert(123);
        }
        else{
            asyncStorage.setItem('api', this.state.api, 'TEXT').then(res=>{
                this.setState({step: 1});
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="rgba(0,0,0,0.3)" translucent={true}/>
                <Image source={require('../../assets/images/bg.png')} style={{width, height, resizeMode:'stretch', position:'absolute'}}/>
                <View style={{ flex: 1}}>
                    <View style={[styles.center, {backgroundColor:'rgba(255,255,255,0.5)'}]}>
                        <Image source={require('../../assets/images/logo.png')} style={{width: 200, height: 100, resizeMode:'contain'}}/>
                    </View>
                    <View style={{flex: 2, backgroundColor:'rgba(0,0,0,0.5)', padding: 20}}>
                        {this.state.step === 1 ? this.formLogin() : this.formLink()}
                    </View>
                </View>
            </View>
        );
    }

    formLogin(){
        return(
            <View>
                <Text style={[styles.text, styles.textSemibold, {color:'#fff', fontSize: 20, textAlign:'center', margin: 20}]}>ĐĂNG NHẬP</Text>
                <View style={styles.input}>
                    <FontAwesome name='user-o' style={{color: '#666', fontSize: 20, width: 25}}/>
                    <TextInput
                        style={{flex:1, backgroundColor: 'transparent', paddingBottom: 6, color:'#333', fontFamily: "OpenSans-Light", fontSize: 14}}
                        underlineColorAndroid='transparent'
                        placeholder = "Tên đăng nhập"
                        onChangeText={(username) => this.setState({username})}
                        value={this.state.username}
                    />
                </View>
                <View style={styles.input}>
                    <FontAwesome name='key' style={{color: '#666', fontSize: 20, width: 25}}/>
                    <TextInput
                        style={{flex:1, backgroundColor: 'transparent', paddingBottom: 6, color:'#333', fontFamily: "OpenSans-Light", fontSize: 14}}
                        underlineColorAndroid='transparent'
                        placeholder = "Mật khẩu"
                        onChangeText={(password) => this.setState({password})}
                        value={this.state.password}
                    />
                </View>
                <TouchableOpacity
                    style={{marginTop: 20}}
                    onPress={()=>this.login()}>
                    <Text style={[styles.button]}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>
            </View>
        )
    }

    formLink(){
        return(
            <View>
                <Text style={[styles.text, styles.textSemibold, {color:'#fff', fontSize: 20, textAlign:'center', margin: 20}]}>THIẾT LẬP</Text>
                <View style={styles.input}>
                    <FontAwesome name='link' style={{color: '#666', fontSize: 20, width: 25}}/>
                    <TextInput
                        style={{flex:1, backgroundColor: 'transparent', paddingBottom: 6, color:'#333', fontFamily: "OpenSans-Light", fontSize: 14}}
                        underlineColorAndroid='transparent'
                        placeholder = "Nhập đường link website"
                        onChangeText={(api) => this.setState({api})}
                        value={this.state.api}
                    />
                </View>
                <TouchableOpacity
                    style={{marginTop: 20}}
                    onPress={()=>this.setLink()}>
                    <Text style={[styles.button]}>TIẾP TỤC</Text>
                </TouchableOpacity>
            </View>
        )
    }
}