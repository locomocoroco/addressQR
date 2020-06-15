import React, {useState} from 'react';
import {
  TouchableOpacity,
  Switch,
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';
import apiService from '../../apiService';
import AsyncStorage from '@react-native-community/async-storage';

const initialState = {
    email: '',
    password: '',
}

const Login = ({navigation}) => {
  const [isBusiness, setIsBusiness] = useState(false);
  const handleUpdate = () => {
    setIsBusiness(isbusi => !isbusi);
  };
  const [loginData, setLoginData] = useState(initialState);
  const handleChange = ({text, name}) => { 
    setLoginData((prevState) => ({
          ...prevState,
          [name]: text,
      }));
  }
  const handleSubmit = async () => {
    if (!loginData.email || !loginData.password) {
        Alert.alert('Password/Login empty')
        return
    }
    let res;
    try {
        res = await apiService.login(loginData);
    } catch (error) {
        Alert.alert('Please enter right email/password')
        setLoginData(() => initialState);
        console.log(error);
        return
    }
        
        let user;
        try {
            await AsyncStorage.setItem('token', res);
            user = await apiService.user(res);
        } catch (error) {
            console.warn(error);
            Alert.alert('Try again');
            return
        }
    
        user.isBusiness? navigation.navigate('Dashboard'): navigation.navigate('ScanGo');    
    }
  let userorbusi = '';
  let viewInfobusi = '';
  let registerUserBusi;
  let unicode = '0';
  if (isBusiness) {
    userorbusi = 'Login for Business Users';
    registerUserBusi = 'Sign your business up here';
    viewInfobusi = 'Go back to User Login';
  } else {
    userorbusi = 'Login for users';
    viewInfobusi = `For businesses go here `;
    unicode = '1F680';
    registerUserBusi = 'New here register now';
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>AddressQR</Text>
      </View>
      <View style={styles.container}>
        <Text style={styles.signUpLink}>{userorbusi}</Text>
        <TextInput style={styles.input} 
          placeholder="email"
          value={loginData.email}
          autoCapitalize="none"
          onChangeText={(text) => handleChange({text, name:'email'})} />
        <TextInput
          style={styles.input}
          placeholder="password"
          secureTextEntry={true}
          value={loginData.password}
          onChangeText={(text) => handleChange({text, name:'password'})}
        />
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.submit}>Submit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate({
              name: 'Register',
              params: {
                isBusiness,
              },
            })
          }>
          <Text style={[styles.signUpLink, styles.link]}>
            {registerUserBusi}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.toggle}>
        <Text style={styles.signUpLink}>
          {viewInfobusi} {String.fromCodePoint(parseInt(unicode, 16))}
        </Text>
        <Switch value={isBusiness} onValueChange={handleUpdate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    alignContent: 'space-between',
    justifyContent: 'center',
  },
  text: {
    fontSize: 36,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 5,
    marginBottom: 20,
    width: 180,
  },
  signUpLink: {
    marginVertical: 10,
  },
  toggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  link: {
    color: 'blue',
    fontSize: 22,
  },
  submit: {
    backgroundColor: 'green',
    fontSize: 28,
    color: 'white',
    padding: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00b34f',
  },
});

export default Login;
