import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import apiService from '../../apiService';

import VisistsList from '../../components/visitsList';


const Livefeed = ({ visits }) => {
    return (
        <View>
            <Text>Feed</Text>
            
            <FlatList
            data={visits}
            styles={styles.list}
            renderItem={({ item }) => (
                <VisistsList item={item} />
            )} />
        </View>
        
    )
}

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: 10,
        marginVertical: 10,
    }
})

export default Livefeed;