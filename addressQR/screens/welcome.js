import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import apiService from '../apiService';

const Welcome = ({ navigation }) => {
    useEffect(() => {
        const whereTo = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (!token) throw new Error('no token');
                const user = await apiService.user(token);
                if (!user) throw new Error('non valid token');
                user.isBusiness? navigation.navigate('Dashboard'): navigation.navigate('ScanGo');
            } catch (error) {
                navigation.navigate('Login');
            }
        };
        setTimeout(()=> {
            whereTo()
        }, 1500);
    },[])
    return (
        <View>
            <Text style={styles.overlay1}>Welcome to AddressQR</Text>
            <Text style={styles.overlay2}>a Contact Tracing App</Text>
            <Image
            style={styles.container} 
            source={require('../components/23311.png')}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        resizeMode: 'stretch',
    },
    overlay1: {
        color: 'white',
        fontSize: 38,
        position: 'absolute',
        top: 15,
        bottom:  200, 
        right: 0, 
        left: 7, 
        zIndex: 1

    },
    overlay2: {
        color: 'white',
        fontSize: 38,
        position: 'absolute',
        top: 65,
        bottom:  200, 
        right: 0, 
        left: 7, 
        zIndex: 1

    }
});

export default Welcome;