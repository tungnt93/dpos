
import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View, StatusBar, Image, TouchableOpacity, ScrollView, FlatList, Modal, TextInput, Keyboard} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/dist/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import {styles} from '../../assets/Styles';
import {StrToLatin} from '../../helper/Helper';
import {connect} from 'react-redux';
import {api_get} from "../../helper/Api";
import moment from 'moment';
import {MoneyToText} from "../../helper/Helper";

const ordereds = [
    {id: 6, name: 'Súp hải sản đậu phụ', quantity: 1, order_time: '19:01', price: 65000},
    {id: 7, name: 'Bò nhúng giấm cuốn bánh tráng', quantity: 1, order_time: '19:15', price: 265000},
    {id: 13, name: 'HEO CẮP NÁCH NƯỚNG RIỀNG MẺ', quantity: 2, order_time: '19:25', price: 165000},
];

const products = [
    {id: 1, name: 'Súp hải sản đậu phụ'},
    {id: 2, name: 'Bò nhúng giấm cuốn bánh tráng'},
    {id: 3, name: 'Súp hải sản đậu phụ'},
    {id: 4, name: 'Bò nhúng giấm cuốn bánh tráng'},
    {id: 5, name: 'Súp hải sản đậu phụ'},
    {id: 6, name: 'Bò nhúng giấm cuốn bánh tráng'},
    {id: 7, name: 'Súp hải sản đậu phụ'},
    {id: 8, name: 'Bò nhúng giấm cuốn bánh tráng'},
    {id: 9, name: 'Súp hải sản đậu phụ'},
    {id: 10, name: 'Bò nhúng giấm cuốn bánh tráng'},
];

class TableOrder extends Component<{}> {
    static navigationOptions = ({ navigation }) => ({
        header:
            <View style={[styles.headerStyle, {paddingTop: 10}]}>
                <TouchableOpacity
                    style={{position:'absolute', padding: 10, marginTop: 25}}
                    onPress={() => navigation.goBack()}>
                    <SimpleLineIcons name="arrow-left" style={{color: '#fff', fontSize: 20}}/>
                </TouchableOpacity>
                <Text style={styles.headerTitleStyle}>{navigation.state.params.table.name}</Text>
                <TouchableOpacity
                    style={{position:'absolute', padding: 10, top: 22, right: 0}}
                    onPress={() => {navigation.state.params.payment()}}>
                    <Ionicons name="ios-calculator-outline" style={{color: '#fff', fontSize: 32}}/>
                </TouchableOpacity>
            </View>
    });


    constructor(props){
        super(props);
        this.products = [];
        this.state = {
            showAddOrder: false,
            showModalProduct: false,
            products: this.products,
            product: null,
            searchProduct: '',
            quantity: '',
            orders: [],
            showPayment: false,
            payments: [],
            ordereds: [],
            pendings: [],
            isOpen: false
        };

    }

    componentWillMount(){
        let table = this.props.navigation.state.params.table;
        if(table.status !== 1){
            this.setState({isOpen: true});
            let URL = this.props.api + 'ordereds?bill_id=' + table.bill_id;
            api_get(URL, (data)=>{
                console.log(data.message.ordereds);
                if(data.status === 'success'){
                    let arrOrdereds = [];
                    let arrPending = [];
                    let arrPayment = [];
                    data.message.ordereds.map((e)=>{
                        if(e.status === 1){
                            arrPending.push(e);
                        }
                        else if(e.status === 2){
                            arrOrdereds.push(e);
                        }
                        if(e.status !== 4){
                            arrPayment.push(e);
                        }
                    });
                    this.setState({ordereds: arrOrdereds, pendings: arrPending, payments: arrPayment});
                }
            });

            URL = this.props.api + 'all_product';
            api_get(URL, (data)=>{
                if(data.status === 'success'){
                    this.products =  data.message.products;
                    this.setState({products:  data.message.products});
                }
            });
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({
            payment: this.payment.bind(this)
        });
    }

    payment(){
        this.setState({showPayment : true})
    }

    openTable(){

    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="rgba(0,0,0,0.3)" translucent={true}/>
                <ScrollView style={{flex: 1, backgroundColor:'#fff'}}>
                    {this.state.isOpen ?
                        <View>
                            <Text style={[styles.text, styles.textSemibold, styles.textRed, {backgroundColor:'#F5FCFF', padding: 10}]}>
                                Đang chờ
                            </Text>
                            {this.state.pendings.length === 0 ?
                                <View style={{padding: 10}}>
                                    <Text style={[styles.text, {paddingVertical: 10}]}>Không có món nào</Text>
                                </View>
                                :
                                this.listOrder(this.state.pendings)
                            }

                            <Text style={[styles.text, styles.textSemibold, styles.textRed, {backgroundColor:'#F5FCFF', padding: 10}]}>
                                Đã gọi
                            </Text>
                            {this.state.ordereds.length === 0 ?
                                <View style={{padding: 10}}>
                                    <Text style={[styles.text, {paddingVertical: 10}]}>Không có món nào</Text>
                                </View>
                                :
                                this.listOrder(this.state.ordereds)
                            }
                        </View>
                        :
                        <Text style={[styles.text, {padding: 50, textAlign:'center'}]}>Bàn chưa mở</Text>
                    }

                </ScrollView>
                <View style={{padding: 10}}>
                    {this.state.isOpen ?
                        <TouchableOpacity onPress={()=>this.setState({showAddOrder: true})}>
                            <Text style={[styles.button]}>GỌI MÓN</Text>
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={()=> this.openTable()}>
                            <Text style={[styles.button]}>MỞ BÀN</Text>
                        </TouchableOpacity>
                    }

                </View>
                {this.modalAdd()}
                {this.modalPayment()}
            </View>
        );
    }

    listOrder(list){
        return(
            <View>
                <View style={[styles.row, styles.borderBottom, {padding: 10}]}>
                    <Text style={[styles.text, styles.textSmall, styles.textSemibold,  {flex: 2}]}>Tên món</Text>
                    <Text style={[styles.text, styles.textSmall,styles.textSemibold, {flex: 1, textAlign:'center'}]}>
                        Số lượng
                    </Text>
                    <Text style={[styles.text, styles.textSmall, styles.textSemibold, {flex: 1, textAlign:'center'}]}>
                        Thời gian
                    </Text>
                </View>
                <FlatList
                    data={list}
                    keyExtractor={(item, index) => index}
                    renderItem = {({item})=>
                        <View style={[styles.row, styles.borderBottom, {padding: 10, alignItems:'center'}]}>
                            <Text style={[styles.text, {flex: 2}]}>{item.product_name}</Text>
                            <Text style={[styles.text, {flex: 1, textAlign:'center'}]}>{item.quantity}</Text>
                            <Text style={[styles.text, styles.textSmall, {flex: 1, textAlign:'center'}]}>
                                {moment.unix(item.created).format("DD/MM/YYYY") === moment().format("DD/MM/YYYY")
                                    ? moment.unix(item.created).format("HH:mm")
                                    : moment.unix(item.created).format("HH:mm DD/MM/YYYY")}
                            </Text>
                        </View>
                    }
                />
            </View>
        )
    }

    addOrder(){
        if(!this.state.product){
            alert(1);
        }
        else if(this.state.quantity === ''){
            alert(2);
        }
        else{
            let order = {id: this.state.product.id, name: this.state.product.name, quantity: this.state.quantity};
            this.setState({
                orders: this.state.orders.concat(order),
                quantity: '',
                product: null
            });
            Keyboard.dismiss();
        }

    }

    modalAdd(){
        return(
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.showAddOrder}
                onRequestClose={() => {this.setState({showAddOrder: false})}}
            >
                <View style={{backgroundColor:'#fff', flex: 1}}>
                    <View style={[styles.headerStyle, {paddingTop: 10, height: 45}]}>
                        <TouchableOpacity
                            style={{position:'absolute', padding: 10}}
                            onPress={() => this.setState({showAddOrder: false})}>
                            <SimpleLineIcons name="arrow-left" style={{color: '#fff', fontSize: 20}}/>
                        </TouchableOpacity>
                        <Text style={[styles.headerTitleStyle, {paddingTop: 0}]}>
                            Gọi món - {this.props.navigation.state.params.table.name}
                        </Text>
                    </View>
                    <ScrollView keyboardShouldPersistTaps='always'>
                        <Text style={[styles.text, styles.textSemibold, styles.textRed, {backgroundColor:'#F5FCFF', padding: 10}]}>
                            Ghi order
                        </Text>
                        <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 3, marginTop: 5, alignItems:'center'}}>
                            <Text style={[styles.text, {flex: 1}]}>Chọn món</Text>
                            <TouchableOpacity
                                onPress={()=>this.setState({showModalProduct: true})}
                                style={[styles.border, {flex: 2.5, flexDirection:'row', alignItems:'center',
                                borderRadius: 5, padding: 10, position:'relative'}]}>
                                <View style={[{flex: 4}]}>
                                    <Text numberOfLines ={1} style={styles.textSmall}>
                                        {this.state.product ? this.state.product.name : ''}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 3, alignItems:'center'}}>
                            <Text style={[styles.text, {flex: 1}]}>Số lượng</Text>
                            <TextInput
                                style={[styles.text, styles.border, {flex:2.5, padding: 8, borderRadius: 5,
                                    backgroundColor: 'transparent', }]}
                                underlineColorAndroid='transparent'
                                placeholder = "Nhập số lượng"
                                keyboardType = 'phone-pad'
                                onChangeText={(quantity) => this.setState({quantity})}
                                value={this.state.quantity}
                            />
                        </View>
                        <View style={{flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 3, alignItems:'center'}}>
                            <View style={{flex: 1}}/>
                            <TouchableOpacity
                                style={{flex: 2.5}}
                                onPress={()=>this.addOrder()}>
                                <Text style={[styles.button, {width: 80, padding: 6}]}>THÊM</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={[styles.text, styles.textSemibold, styles.textRed, {backgroundColor:'#F5FCFF',
                            padding: 10, marginTop: 10}]}>
                            Danh sách ({this.state.orders.length})
                        </Text>

                        {this.state.orders.length > 0 ?
                            <View>
                                <View style={[styles.row, styles.borderBottom, {padding: 10}]}>
                                    <Text style={[styles.text, styles.textSmall, styles.textSemibold,  {flex: 3}]}>Tên món</Text>
                                    <Text style={[styles.text, styles.textSmall, styles.textSemibold, {flex: 1, textAlign:'center'}]}>
                                        Số lượng
                                    </Text>
                                </View>
                                <FlatList
                                    data={this.state.orders}
                                    keyExtractor={(item, index) => index}
                                    renderItem = {({item})=>
                                        <View style={[styles.row, styles.borderBottom, {padding: 10, alignItems:'center'}]}>
                                            <Text style={[styles.text, {flex: 3}]}>{item.name}</Text>
                                            <Text style={[styles.text, {flex: 1, textAlign:'center'}]}>{item.quantity}</Text>
                                        </View>
                                    }
                                />
                            </View>
                            : <Text style={[styles.text, {padding: 10}]}>Không có món nào</Text>}

                    </ScrollView>
                    <View style={{padding: 10, flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={{flex: 2}}
                            onPress={()=>this.sendOrder()}>
                            <Text style={[styles.button]}>ĐỒNG Ý</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flex: 1, marginLeft: 5}}
                            onPress={()=>this.setState({showAddOrder: false, product: null, quantity: '', orders: []})}>
                            <Text style={[styles.button, {backgroundColor: '#666'}]}>HỦY</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.modalProduct()}
            </Modal>
        )
    }

    sendOrder(){
        if(this.state.orders.length === 0){
            this.setState({showAddOrder: false, quantity: ''});
        }
        else{

        }
    }

    searchProduct(key){
        let result = this.products.filter((e)=> StrToLatin(e.name.toLowerCase()).indexOf(StrToLatin(key.toLowerCase())) >= 0);
        this.setState({searchProduct: key, products: result});
    }

    modalProduct(){
        return(
            <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.showModalProduct}
                onRequestClose={() => {this.setState({showModalProduct: false})}}
            >
                <View style={{flex: 1, backgroundColor:'rgba(0,0,0,0.5)'}}>
                    <View style={{flex: 1, backgroundColor:'#fff', margin: 10}}>
                        <View style={[styles.borderBottom, {flexDirection:'row', padding: 10, alignItems:'center'}]}>
                            <Ionicons name='ios-search-outline' style={{color: '#999', fontSize: 20, width: 15}}/>
                            <TextInput
                                style={{flex:1, backgroundColor: 'transparent', paddingBottom: 6, color:'#666', fontFamily: "OpenSans-Light", fontSize: 14}}
                                underlineColorAndroid='transparent'
                                placeholder = "Tìm kiếm"
                                onChangeText={(searchProduct) => this.searchProduct(searchProduct)}
                                value={this.state.searchProduct}
                            />
                            <Text
                                onPress={()=>this.setState({showModalProduct: false})}
                                style={[styles.textSmall, styles.textSemibold, {paddingVertical: 5}]}>Xong</Text>
                        </View>
                        <FlatList
                            data={this.state.products}
                            keyExtractor={(item, index) => index}
                            keyboardShouldPersistTaps='always'
                            renderItem = {({item})=>
                                <TouchableOpacity
                                    onPress={()=>{this.setState({product: item, showModalProduct: false})}}
                                    style={[styles.row, styles.borderBottom, {padding: 10, alignItems:'center'}]}>
                                    <Text style={[styles.text, {flex: 1}]}>{item.id}</Text>
                                    <Text style={[styles.text, {flex: 6}]}>{item.name}</Text>
                                </TouchableOpacity>
                            }
                        />
                    </View>
                </View>
            </Modal>
        )
    }

    modalPayment(){
        return(
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.showPayment}
                onRequestClose={() => {this.setState({showPayment: false})}}
            >
                <View style={{backgroundColor:'#fff', flex: 1}}>
                    <View style={[styles.headerStyle, {paddingTop: 10, height: 45}]}>
                        <TouchableOpacity
                            style={{position:'absolute', padding: 10}}
                            onPress={() => this.setState({showPayment: false})}>
                            <SimpleLineIcons name="arrow-left" style={{color: '#fff', fontSize: 20}}/>
                        </TouchableOpacity>
                        <Text style={[styles.headerTitleStyle, {paddingTop: 0}]}>
                            Thanh toán - {this.props.navigation.state.params.table.name}
                        </Text>
                    </View>
                    <ScrollView keyboardShouldPersistTaps='always'>
                        <Text style={[styles.text, styles.textSemibold, styles.textRed, {backgroundColor:'#F5FCFF',padding: 10}]}>
                            Danh sách ({this.state.payments.length})
                        </Text>

                        {this.state.payments.length > 0 ?
                            <View>
                                <View style={[styles.row, styles.borderBottom, {padding: 10}]}>
                                    <Text style={[styles.text, styles.textSmall, styles.textSemibold, {flex: 2}]}>Tên món</Text>
                                    <Text style={[styles.text, styles.textSmall, styles.textSemibold, {flex: 0.8, textAlign:'center'}]}>
                                        Số lượng
                                    </Text>
                                    <Text style={[styles.text, styles.textSmall, styles.textSemibold, {flex: 1, textAlign:'center'}]}>
                                        Giá
                                    </Text>
                                    <Text style={[styles.text, styles.textSmall, styles.textSemibold, {flex: 1, textAlign:'center'}]}>
                                        Thành tiền
                                    </Text>
                                </View>
                                <FlatList
                                    data={this.state.payments}
                                    keyExtractor={(item, index) => index}
                                    renderItem = {({item})=>
                                        <View style={[styles.row, styles.borderBottom, {padding: 10, alignItems:'center'}]}>
                                            <Text style={[styles.textSmall, {flex: 2}]}>{item.product_name}</Text>
                                            <Text style={[styles.textSmall, {flex: 1, textAlign:'center'}]}>{item.quantity}</Text>
                                            <Text style={[styles.textSmall, {flex: 1, textAlign:'center'}]}>{MoneyToText(item.product_price)}đ</Text>
                                            <Text style={[styles.textSmall,styles.textRed, {flex: 1, textAlign:'center'}]}>
                                                {MoneyToText(item.quantity*item.product_price)}đ
                                                </Text>
                                        </View>
                                    }
                                />
                                <View style={{flexDirection: 'row', padding: 10}}>
                                    <Text style={[{flex: 1},styles.text, styles.textSemibold]}>Tổng</Text>
                                    <Text style={[{flex: 2, textAlign:'right'}, styles.text, styles.textSemibold, styles.textRed]}>
                                        {this.totalMoney()} đ
                                    </Text>
                                </View>
                            </View>
                            : <Text style={[styles.text, {padding: 10}]}>Không có món nào</Text>}

                    </ScrollView>
                    <View style={{padding: 10, flexDirection: 'row'}}>
                        <TouchableOpacity
                            style={{flex: 2}}
                            onPress={()=>this.sendPayment()}>
                            <Text style={[styles.button]}>GỬI</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{flex: 1, marginLeft: 5}}
                            onPress={()=>this.setState({showPayment: false})}>
                            <Text style={[styles.button, {backgroundColor: '#666'}]}>HỦY</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {this.modalProduct()}
            </Modal>
        )
    }

    totalMoney(){
        let total = 0;
        this.state.payments.map((e)=>{
           total += e.product_price;
        });
        return MoneyToText(total);
    }

    sendPayment(){

    }
}

const mapStateToProps = (state) =>{
    return{
        user: state.user,
        api: state.api,
        token: state.token
    }
};

export default connect(mapStateToProps)(TableOrder);