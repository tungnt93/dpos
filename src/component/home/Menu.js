
import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, Dimensions, FlatList} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {styles} from '../../assets/Styles';
import {connect} from 'react-redux';
import {api_get} from "../../helper/Api";
import {MoneyToText} from "../../helper/Helper";

const width = Dimensions.get('window').width;

class Menu extends Component<{}> {
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

    constructor(props){
        super(props);
        this.state = {
            products: []
        }
    }

    componentWillMount(){
        let catalog = this.props.navigation.state.params.catalog;
        let URL = this.props.api + 'product?catalog_id=' + catalog.id;
        console.log(URL);
        api_get(URL, (data)=>{
            console.log(data.message.products);
            if(data.status === 'success'){
                this.setState({products: data.message.products});
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="rgba(0,0,0,0.3)" translucent={true}/>
                <FlatList
                    style={{alignSelf: 'center'}}
                    data={this.state.products}
                    keyExtractor={(item, index) => index}
                    renderItem = {({item})=>
                        <View style={[styles.row, styles.borderBottom, {padding: 10}]}>
                            <Image source={{uri: item.img_link}} style={styles.imgMenu}/>
                            <View style={{paddingLeft: 10, width: width - 140}}>
                                <Text style={[styles.text, styles.textSemibold, {color: '#C62828'}]}>{item.name}</Text>
                                <Text style={[styles.text]}>Giá: {MoneyToText(item.price)}đ</Text>
                                <Text style={[styles.text]}>Khuyến mãi: {MoneyToText(item.discount)}đ</Text>
                            </View>
                        </View>
                    }
                />
            </View>
        );
    }
}

const mapStateToProps = (state) =>{
    return{
        user: state.user,
        api: state.api,
        token: state.token
    }
};

export default connect(mapStateToProps)(Menu);