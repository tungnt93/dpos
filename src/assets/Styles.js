
import {StyleSheet} from 'react-native';

const borderColor = '#ddd';

export const styles = {
    headerTitleStyle:{
        alignSelf: 'center', color: '#fff', fontFamily: "OpenSans-Bold", fontWeight: '400', paddingTop: 25,
        fontSize: 20
    },
    headerStyle:{
        backgroundColor: '#C62828',
        height: 70,
        elevation: 0,       //remove shadow on Android
        shadowOpacity: 0,  //remove shadow ios
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#F5FCFF',
    },
    row:{
        // flex: 1,
        flexDirection:'row',
    },
    center:{
        flex: 1,
        alignItems:'center',
        justifyContent:'center'
    },
    text:{
        fontSize: 16,
        fontFamily: "OpenSans-Light",
        color: '#333'
    },
    textSemibold:{
        fontFamily: "OpenSans-Semibold",
    },
    textRed:{
        color: '#C62828',
    },
    textSmall:{
        fontSize: 14,
        fontFamily: "OpenSans-Light",
        color: '#333'
    },
    button:{
        padding: 10,
        backgroundColor: '#C62828',
        textAlign:'center',
        color: '#fff',
        fontSize: 16,
        fontFamily: "OpenSans-Semibold",
        borderRadius: 5
    },
    border:{
        borderColor: borderColor,
        borderWidth: StyleSheet.hairlineWidth
    },
    borderTop:{
        borderTopColor: borderColor,
        borderTopWidth: StyleSheet.hairlineWidth
    },
    borderBottom:{
        borderBottomColor: borderColor,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    borderLeft:{
        borderLeftColor: borderColor,
        borderLeftWidth: StyleSheet.hairlineWidth
    },
    borderRight:{
        borderRightColor: borderColor,
        borderRightWidth: StyleSheet.hairlineWidth
    },
    icon:{
        fontSize: 45,
        color: '#666'
    },
    imgMenu:{
        width: 120, height: 80, resizeMode:'stretch'
    },
    input:{
        flexDirection:'row', padding: 10, alignItems:'center', backgroundColor:'#fff', marginTop: 10, borderRadius: 5
    }
};