import React, { useEffect, useState } from 'react';
import { View, Text, Alert, StyleSheet,TouchableOpacity } from 'react-native';
import ScanGo from './scanGo';
import apiService from '../../apiService';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, Input } from 'react-native-elements';

const Scanned = ({ navigation, route}) => {
    const [isLoading, setIsLoading] = useState(true);
    
    const code = route.params ? route.params.code : '';
    const [bid, greeting] = code.split(';');
    const [busi, setBusi] = useState('');
    const [token, setToken] = useState('');
    useEffect(() => {
    const verify = async () => {
        console.log(code)
        try {
            if (!bid) throw new Error('Not a trusted QRCode!');
            const tokendb = await AsyncStorage.getItem('token');
            if (!tokendb) throw new Error('problem with credentials')
            const busidb = await apiService.verify(bid, tokendb);
            setBusi(() => busidb);
            console.log(busidb);
            setToken(() => tokendb);
        } catch (error) {
            console.log(error);
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
        console.log('hello');
        try {
            await apiService.visit(bid, token);
        } catch (error) {
            Alert.alert('try again');
        }
        Alert.alert('Success', 'Your visit has been recorded', 
                [{
                    text: 'OK',
                    onPress: () => navigation.navigate('ScanGo'),
                }]
            );
        
    }
    return (
        // isLoading? <View>
        //     <Text>Loading...</Text>
        // </View>
        <View styles={styles.container}>
            {/* <Text>{greeting}</Text> */}
            <Text style={styles.infoText}>
                We will send your Address Data to {busi.firstName} at {busi.address}
            </Text>
            
            <TouchableOpacity>
            <Button
                title="Send"
                type="solid"
                raised={true}
                onPress={handleSubmit} 
                buttonStyle={styles.submit}
            />
            </TouchableOpacity>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
      },
    infoText:{
        marginTop: 40,
        fontSize: 30,
    },  
    submit: {
    
        fontSize: 35,
        color: 'white',
        paddingVertical: 10,
        paddingHorizontal: 35,
        borderRadius: 12,
        borderWidth: 2,
        marginTop: 35,
      },
})

export default Scanned;