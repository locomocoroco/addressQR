import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl } from 'react-native';
import apiService from '../../apiService';
import { ListItem } from 'react-native-elements'

import VisistsList from '../../components/visitsList';
import moment from 'moment';
import AsyncStorage from '@react-native-community/async-storage';


const Livefeed = ({ visits }) => {
    const [isRefreshing, setIsRefreshing] = useState(false);
    const handleRefresh = useCallback(async () => {
        setIsRefreshing(true);
        const token = await AsyncStorage.getItem('token')
        visits = await apiService.visited(token)
        setIsRefreshing(false);
      });
    
    const keyExtractor = (item, index) => index.toString();
    const renderItem = ({item}) => (
        <ListItem
        title={item.user.firstName+' '+item.user.lastName}
        subtitle={item.user.address}
        rightSubtitle={moment(item.createdAt).fromNow()}
        bottomDivider
        // chevron
        />
    )
   
    
    return isRefreshing? <View>Loading...</View>:(
        <View style={styles.container}>
            
            
            <FlatList
            keyExtractor={keyExtractor}
            data={visits}
            renderItem={renderItem}
            refreshControl={
                <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />
            } />
        </View>
        
    )
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 10,
        marginVertical: 10,
        justifyContent: "center",
    },
    container:{
        flex:1
    }
})

export default Livefeed;