import React, { useEffect, useState } from 'react';
import { View, Text, Alert } from 'react-native';
import ScanGo from './scanGo';
import apiService from '../../apiService';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const Scanned = ({ navigation, route}) => {
    const [isLoading, setIsLoading] = useState(true);
    
    const code = route.params ? route.params.code : undefined;
    const [bid, greeting] = code.split(';');
    if (!greeting) greeting= 'Hello';
    let busi;
    let token;
    useEffect(() => {
    const verify = async () => {
        console.warn(code)
        try {
            if (!bid) throw new Error('Not a trusted QRCode!');
            token = await AsyncStorage.getItem('token');
            if (!token) throw new Error('problem with credentials')
            busi = await apiService.verify(bid)
        } catch (error) {
            Alert.alert('QRC error', 'Not a trusted QRCode!', 
                [{
                    text: 'Cancel',
                    onPress: () => navigation.navigate('ScanGo'),
                }]
            );
            
        }
    };
        verify();
        setIsLoading(false);
    },[]);
    const handleSubmit = async () => {
        try {
            await apiService.visit(bid, token);
        } catch (error) {
            Alert.alert('try again');
        }
        navigation.navigate('ScanGo');
    }
    return (
        isLoading? <View>
            <Text>Loading...</Text>
        </View>
        :<View>
            <Text>{greeting}</Text>
            <Text>We will send your Address Data to {busi.firstName}</Text>
            <Text>at {busi.address}</Text>
            <TouchableOpacity onPress={handleSubmit}>
                <Text>Send</Text>
            </TouchableOpacity>
        </View>
    )
};

export default Scanned;