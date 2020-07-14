import React, {useState} from 'react';
import {
  Text,
  ScrollView,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import apiService from '../../apiService';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, Input } from 'react-native-elements';


const initialState = {
  email: '',
  password: '',
  repeatpw: '',
  firstName: '',
  lastName: '',
  address: '',
  zipCode: '',
  isBusiness: false,
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
      isBusiness,
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
      : navigation.navigate('ScanGo');
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
    <ScrollView style={styles.container}>
      <Text style={styles.headerText}>{registerUserBusi}</Text>
      <Input
        containerStyle={styles.input}
        placeholder="email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={registerData.email}
        onChangeText={text => handleChange({text, name: 'email'})}
      />
      <Input
        containerStyle={styles.input}
        placeholder="password"
        secureTextEntry={true}
        value={registerData.password}
        onChangeText={text => handleChange({text, name: 'password'})}
      />
      <Input
        containerStyle={styles.input}
        placeholder="repeat password"
        secureTextEntry={true}
        value={registerData.repeatpw}
        onChangeText={text => handleChange({text, name: 'repeatpw'})}
      />
      <Input
        containerStyle={styles.input}
        placeholder={businessName1}
        value={registerData.firstName}
        onChangeText={text => handleChange({text, name: 'firstName'})}
      />
      <Input
        containerStyle={styles.input}
        placeholder={shortDescLastName}
        value={registerData.lastName}
        onChangeText={text => handleChange({text, name: 'lastName'})}
      />
      <Input
        containerStyle={styles.input}
        placeholder="Address"
        value={registerData.address}
        onChangeText={text => handleChange({text, name: 'address'})}
      />
      <Input
        containerStyle={styles.input}
        placeholder="ZipCode"
        value={registerData.zipCode}
        keyboardType="number-pad"
        onChangeText={text => handleChange({text, name: 'zipCode'})}
      />
      <TouchableOpacity >
      <Button
          title="Submit"
          type="solid"
          raised={true}
          onPress={handleSubmit}
          buttonStyle={styles.submit}
        />
      </TouchableOpacity>
      <View style={styles.toggle}>
        <Text style={styles.signUpLink}>
          {viewInfobusi} {String.fromCodePoint(parseInt(unicode, 16))}
        </Text>
        <Switch value={isBusiness} onValueChange={handleUpdate} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    //alignItems: 'center',
    flex:1,
  },
  input: {
    padding: 5,
    marginTop: 7,
    marginBottom: 5,
    width: 350,
  },
  headerText:{
    marginVertical:15,
  },
  submit: {
    fontSize: 35,
    color: 'white',
    paddingVertical: 10,
    paddingHorizontal: 50,
    marginVertical:7,
    borderRadius: 12,
    borderWidth: 2,
  },
  toggle: {
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Register;
