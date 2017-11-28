
import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, ScrollView, FlatList} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {styles} from '../../assets/Styles';
import {connect} from 'react-redux';
import {api_get} from "../../helper/Api";

class Catalog extends Component<{}> {
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

    componentWillMount(){
        let URL = this.props.api + 'catalog';
        api_get(URL, (data)=>{
            console.log(data.message.catalogs);
            if(data.status === 'success'){
                this.setState({catalogs: data.message.catalogs});
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="rgba(0,0,0,0.3)" translucent={true}/>

                <FlatList
                    style={{alignSelf: 'center'}}
                    data={this.state.catalogs}
                    keyExtractor={(item, index) => index}
                    renderItem = {({item})=>
                        <TouchableOpacity
                            onPress={()=>this.props.navigation.navigate('Menu', {catalog: item})}
                            style={{padding: 20}}>
                            <Image source={{uri: item.img}} style={styles.imgMenu}/>
                            <Text style={[styles.text, {marginTop: 6, textAlign:'center'}]}>{item.name}</Text>
                        </TouchableOpacity>
                    }
                    horizontal = {false}
                    numColumns = {2}
                />

                {/*<ScrollView style={{flex: 1}}>*/}
                    {/*<View style={[styles.row, {paddingVertical: 15}]}>*/}
                        {/*<TouchableOpacity*/}
                            {/*onPress={()=>this.props.navigation.navigate('Menu', {catalog: {id: 1, name: 'Món khai vị'}})}*/}
                            {/*style={styles.center}>*/}
                            {/*<Image source={require('../../assets/images/menu/khaivi.png')} style={styles.imgMenu}/>*/}
                            {/*<Text style={[styles.text, {marginTop: 6}]}>Khai vị</Text>*/}
                        {/*</TouchableOpacity>*/}
                        {/*<View style={styles.center}>*/}
                            {/*<Image source={require('../../assets/images/menu/thit.jpg')} style={styles.imgMenu}/>*/}
                            {/*<Text style={[styles.text, {marginTop: 6}]}>Món thịt</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                    {/*<View style={[styles.row, {paddingVertical: 15}]}>*/}
                        {/*<View style={styles.center}>*/}
                            {/*<Image source={require('../../assets/images/menu/lau.png')} style={styles.imgMenu}/>*/}
                            {/*<Text style={[styles.text, {marginTop: 6}]}>Món lẩu</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.center}>*/}
                            {/*<Image source={require('../../assets/images/menu/haisan.png')} style={styles.imgMenu}/>*/}
                            {/*<Text style={[styles.text, {marginTop: 6}]}>Hải sản</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                    {/*<View style={[styles.row, {paddingVertical: 15}]}>*/}
                        {/*<View style={styles.center}>*/}
                            {/*<Image source={require('../../assets/images/menu/rau.png')} style={styles.imgMenu}/>*/}
                            {/*<Text style={[styles.text, {marginTop: 6}]}>Món rau</Text>*/}
                        {/*</View>*/}
                        {/*<View style={styles.center}>*/}
                            {/*<Image source={require('../../assets/images/menu/trangmieng.png')} style={styles.imgMenu}/>*/}
                            {/*<Text style={[styles.text, {marginTop: 6}]}>Tráng miệng</Text>*/}
                        {/*</View>*/}
                    {/*</View>*/}
                {/*</ScrollView>*/}
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        api: state.api,
        token: state.token
    }
};

export default connect(mapStateToProps)(Catalog);