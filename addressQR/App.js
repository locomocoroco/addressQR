import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity, Switch, SafeAreaView, View, Text, StyleSheet, TextInput } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

import Login from './screens/user/login';
import Register from './screens/user/register';
import ScanGo from './screens/user/scanGo';

const Stack = createStackNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='ScanGo' component={ScanGo} />
    </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;