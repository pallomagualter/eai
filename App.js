import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, TextInput, View, YellowBox, Button } from 'react-native';
import * as firebase from 'firebase';
import 'firebase/firestore';

  const firebaseConfig = {
    apiKey: "AIzaSyAwY71IY8Wx3UpS4UhYcpnsDX7WPKpOB6k",
    authDomain: "react-native-chat-a4a33.firebaseapp.com",
    databaseURL: "https://react-native-chat-a4a33.firebaseio.com",
    projectId: "react-native-chat-a4a33",
    storageBucket: "react-native-chat-a4a33.appspot.com",
    messagingSenderId: "23748440764",
    appId: "1:23748440764:web:468dc16cfda26f0d8416b9"
  }

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  
  YellowBox.ignoreWarnings(['Setting a timer for a long period of time'])

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    readUser()
  }, []);

  async function readUser() {
    const user = await AsyncStorage.getItem('user')
      if (user) {
        setUser(JSON.parse(user))
      }
    }
    if(!user) {
      return <View style={styles.container}>
        <TextInput 
          style={styles.input} 
          placeholder="Enter your name"
        />
      </View>
    }
    return (
      <View style={styles.container}>
        <Text>We have an user</Text>
        <StatusBar style="auto" />
      </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  input: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    padding: 15,
    borderColor: 'gray',

  }
});
