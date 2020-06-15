import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native'; 

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const ScanGo = ({navigation}) => {
    const handleRead = (e) => {
        navigation.navigate({
            name: 'Permissions',
            params: {
              code: e.data,
            }});
    }
    
    return (
        <QRCodeScanner 
        cameraStyle={ styles.cameraContainer}
        topViewStyle={styles.zeroContainer}
        bottomViewStyle={styles.zeroContainer}
        onRead={handleRead}/>
        
    )
};

const styles = StyleSheet.create({
    zeroContainer: {
      height: 0,
      flex: 0,
    },
  
    cameraContainer: {
      height: Dimensions.get('window').height,
    },
  });

export default ScanGo;