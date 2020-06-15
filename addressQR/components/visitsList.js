import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const VisistsList = ({item}) => {
    return (
        <View>
            <Text>{item.firstName}</Text>
            <Text>{item.lastName}</Text>
            <Text>{item.address}</Text>
        </View>
    )
};

export default VisistsList;