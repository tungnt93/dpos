
import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, FlatList, Dimensions} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {styles} from '../../assets/Styles';
import {api_get} from "../../helper/Api";
import {connect} from 'react-redux';

const width = Dimensions.get('window').width;
// const tables = [
//     {id: 1, name: 'Bàn 1', status: 1},
//     {id: 2, name: 'Bàn 2', status: 1},
//     {id: 3, name: 'Bàn 3', status: 1},
//     {id: 4, name: 'Bàn 4', status: 1},
//     {id: 5, name: 'Bàn 5', status: 0},
//     {id: 6, name: 'Bàn 6', status: 2},
//     {id: 7, name: 'Bàn 7', status: 0},
//     {id: 8, name: 'Bàn 8', status: 1},
//     {id: 9, name: 'Bàn 9', status: 0},
//     {id: 10, name: 'Bàn 10', status: 0},
//     {id: 11, name: 'Bàn 11', status: 0},
//     {id: 12, name: 'Bàn 12', status: 0},
//     {id: 13, name: 'Bàn 12', status: 1},
//     {id: 14, name: 'Bàn 12', status: 0},
//     {id: 15, name: 'Bàn 12', status: 0},
// ];
var self;
class Order extends Component<{}> {
    static navigationOptions = ({ navigation }) => ({
        header:
            <View style={[styles.headerStyle, {paddingTop: 10}]}>
                <TouchableOpacity
                    style={{position:'absolute', padding: 10, marginTop: 25}}
                    onPress={() => navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" style={{color: '#fff', fontSize: 20}}/>
                </TouchableOpacity>
                <Text style={styles.headerTitleStyle}>Gọi món</Text>
            </View>
    });

    constructor(props){
        super(props);
        this.state = {
            tables: []
        };
        // this.socket = this.props.socket;
        // console.log(this.socket);

        this.onListenerSocket();
        self = this;
    }

    onListenerSocket(){
        this.props.socket.on('CHANGE_TABLE', function (data) {
            self.getListTable();
        });
    }

    componentWillMount(){
        // let catalog = this.props.navigation.state.params.catalog;
        this.getListTable();
    }

    getListTable(){
        let URL = this.props.api + 'listTable';
        console.log(URL);
        api_get(URL, (data)=>{
            console.log(data.message.tables);
            if(data.status === 'success'){
                this.setState({tables: data.message.tables});
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="rgba(0,0,0,0.3)" translucent={true}/>
                <View style={{flex: 1}}>
                    <Text style={[styles.text, styles.textSemibold, {textAlign: 'center', paddingVertical: 10}]}>Danh sách bàn</Text>
                    <FlatList
                        style={{alignSelf: 'center'}}
                        data={this.state.tables}
                        keyExtractor={(item, index) => index}
                        renderItem = {({item})=>
                            <TouchableOpacity
                                onPress={()=>this.props.navigation.navigate('TableOrder', {table: item})}
                                style={[styles.border,{width: 90, height: 90, borderRadius: 45, alignItems:'center', justifyContent:'center',
                                    marginHorizontal: (width - 270)/6, marginVertical: 15}]}>
                                <Ionicons name= {item.status === 2 ? 'ios-restaurant-outline' : (item.status === 3 ? 'ios-more' : 'ios-add')}
                                          style={styles.icon}/>
                                <Text style={[styles.text, styles.textRed]}>{item.name}</Text>
                            </TouchableOpacity>
                        }
                        horizontal = {false}
                        numColumns = {3}
                    />
                </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return{
        user: state.user,
        api: state.api,
        token: state.token,
        socket: state.socket
    }
};

export default connect(mapStateToProps)(Order);