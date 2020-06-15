import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import apiService from '../../apiService';
import AsyncStorage from '@react-native-community/async-storage';


const initialState = {
  email: '',
  password: '',
  repeatpw: '',
  firstName: '',
  lastName: '',
  address: '',
  zipCode: '',
  isBusiness: '',
};

const Register = ({navigation, route}) => {
  const initState = route.params ? route.params.isBusiness : false;
  const [isBusiness, setIsBusiness] = useState(initState);
  const handleUpdate = () => {
    setIsBusiness(isbusi => !isbusi);
  };
  const [registerData, setRegisterData] = useState(initialState);
  const handleChange = ({text, name}) => {
    setRegisterData(prevState => ({
      ...prevState,
      [name]: text,
    }));
  };
  const handleSubmit = async () => {
    setRegisterData(prevState => ({
      ...prevState,
      isBusiness,
    }));
    console.log(registerData);
    if (!Object.keys(registerData).filter(key => registerData[key] === '')) {
      Alert.alert('not all requiered fields filled');
      return;
    }
    //left here
    let authToken;
    try {
      authToken = await apiService.create(registerData);
    } catch (error) {
      Alert.alert('Please enter right email/password');
      setRegisterData(() => initialState);
      console.log(error);
      return;
    }
    try {
      await AsyncStorage.setItem('token', authToken);
    } catch (error) {
      console.log(error);
      Alert.alert('Try again');
      return;
    }
    isBusiness
      ? navigation.navigate('Dashboard')
      : navigation.navigate('Scan&Go');
  };
  let registerUserBusi;
  let businessName1;
  let shortDescLastName;
  let viewInfobusi;
  let unicode = '';
  if (isBusiness) {
    viewInfobusi = 'Are you not a business';
    unicode = '1f973';
    registerUserBusi = 'Register your business now';
    businessName1 = 'Name of your business';
    shortDescLastName = 'Short description';
  } else {
    viewInfobusi = 'Register as a business';
    unicode = '1F680';
    registerUserBusi = 'Get in on the action now';
    businessName1 = 'First Name';
    shortDescLastName = 'Last Name';
  }
  return (
    <View style={styles.container}>
      <Text>{registerUserBusi}</Text>
      <TextInput
        style={styles.input}
        placeholder="email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={registerData.email}
        onChangeText={text => handleChange({text, name: 'email'})}
      />
      <TextInput
        style={styles.input}
        placeholder="password"
        secureTextEntry={true}
        value={registerData.password}
        onChangeText={text => handleChange({text, name: 'password'})}
      />
      <TextInput
        style={styles.input}
        placeholder="repeat password"
        secureTextEntry={true}
        value={registerData.repeatpw}
        onChangeText={text => handleChange({text, name: 'repeatpw'})}
      />
      <TextInput
        style={styles.input}
        placeholder={businessName1}
        value={registerData.firstName}
        onChangeText={text => handleChange({text, name: 'firstName'})}
      />
      <TextInput
        style={styles.input}
        placeholder={shortDescLastName}
        value={registerData.lastName}
        onChangeText={text => handleChange({text, name: 'lastName'})}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={registerData.address}
        onChangeText={text => handleChange({text, name: 'address'})}
      />
      <TextInput
        style={styles.input}
        placeholder="ZipCode"
        value={registerData.zipCode}
        keyboardType="number-pad"
        onChangeText={text => handleChange({text, name: 'zipCode'})}
      />
      <TouchableOpacity onPress={handleSubmit}>
        <Text style={styles.submit}>Submit</Text>
      </TouchableOpacity>
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
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 5,
    marginBottom: 20,
    width: 195,
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
  toggle: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Register;
