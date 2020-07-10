import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import apiService from '../../apiService';

import ViewQR from './viewQR';
import AsyncStorage from '@react-native-community/async-storage';
import Livefeed from './livefeed';


const Tab = createBottomTabNavigator();

const Dashboard = ({navigation}) => {
    const [isLoading, setIsLoading]= useState(true);
    const [bid, setBid] = useState('');
    const [visits, setVisits ] = useState([]);
    const [greeting, setGreeting ] = useState('');
    useEffect(() => {
        const getBid = async () => {
        try {
            const tokendb = await AsyncStorage.getItem('token');
            const {_id, lastName} = await apiService.user(tokendb);
            const visitsdb = await apiService.visited(tokendb);
            setBid(() => _id);
            setVisits(() => visitsdb);
            setGreeting(() => lastName);
            console.log(bid)
        } catch (error) {
            console.log(error);
        }
    };
        getBid()
        setTimeout(() => setIsLoading(false), 2000);
        //setIsLoading(false);
    },[])

    return ( 
      <Tab.Navigator tabBarOptions={{labelStyle: styles.label}}>
         <Tab.Screen name="LiveFeed" options={{title: 'LiveFeed'}} >
         {(props) =>  <Livefeed {...props} visits={visits} />}
         </Tab.Screen>
         <Tab.Screen name="ViewQR" options={{title: 'ViewQR'}}>
             {(props) =>  <ViewQR {...props} bid={bid} greeting={greeting} />}
         </Tab.Screen>

      </Tab.Navigator>
     
    )
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize:21,
    }
});

export default Dashboard;