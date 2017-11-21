import React, { Component } from 'react';
import {Text, View, Dimensions, ActivityIndicator} from 'react-native';
import { connect } from 'react-redux';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

class Loading extends Component<{}>{
    render(){
        return(
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)', position:'absolute', width, height, justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size={50}/>
                <Text style={{color:'#fff', fontSize: 18}}>Đang tải...</Text>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        showLoading: state.showLoading
    }
}

export default connect(mapStateToProps)(Loading);