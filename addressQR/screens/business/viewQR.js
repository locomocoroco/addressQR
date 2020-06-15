import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

const ViewQR = ({greeting, bid}) => {
    
    const qrdata = bid + ';' + greeting;
    console.log(qrdata);
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Your QRCode</Text>
            <QRCode 
            value={ qrdata } 
            size={200}
            bgColor='black'
            fgColor='white'/>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 24,
        marginVertical: 15,
    }
});
export default ViewQR;