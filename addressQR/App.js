import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { TouchableOpacity, Switch, SafeAreaView, View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import Login from './screens/user/login';
import Register from './screens/user/register';
import ScanGo from './screens/user/scanGo';
import Scanned from './screens/user/scanned';
import Dashboard from './screens/business/dashboard';
import ViewQR from './screens/business/viewQR';
import Welcome from './screens/welcome';

const Stack = createStackNavigator();

const navigationRef = React.createRef();

function navigate(name, params) {
  navigationRef.current && navigationRef.current.navigate(name, params);
}

const App = () => {

  return (
    <NavigationContainer ref={navigationRef}>
    <Stack.Navigator>
      <Stack.Screen name='Welcome'component={Welcome}/>
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='ScanGo' component={ScanGo} options=        
      {{headerTransparent: true,
          headerTintColor: 'blue',
          headerLeft: (props) => (
            <HeaderBackButton 
            label={'Logout'}
            onPress={() => Alert.alert(
              'Logout',
              'Do you really want to Logout?',
                [{
                  text: 'Logout',
                  onPress: () => navigate('Login',{})
                },
                {
                  text: 'Cancel',
                }
                ],
              { cancelable: false }
            ) }/>
          )
      }}/>
      <Stack.Screen 
      name='Permissions' 
      component={Scanned}
       />
      <Stack.Screen name='Dashboard' component={Dashboard} options=
       {{
        headerTintColor: 'blue',
        headerLeft: (props) => (
          <HeaderBackButton 
          label={'Logout'}
          onPress={() => Alert.alert(
            'Logout',
            'Do you really want to Logout?',
              [{
                text: 'Logout',
                onPress: () => navigate('Login',{})
              },
              {
                text: 'Cancel',
              }
              ],
            { cancelable: false }
          ) }/>
        )
    }}/> 
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;