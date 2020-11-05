import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
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
  
  YellowBox.ignoreWarnings(['Setting a timer for a long period of time']);

  const db = firebase.firestore();
  const chatsRef = db.collection('chats');

export default function App() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    readUser()
    const unsubscribe = chatsRef.onSnapshot(querySnapshot => {
      const messagesFirestore = querySnapshot
          .docChanges()
          .filter(({ type }) => type === 'added' ) //filtrando a mensagem pelo tipo
          .map(({doc}) => {
            const message = doc.data()
            return { ... message, createdAt: message.createdAt.toDate() } 
          })//utilizer o sort para ordenar as mensagem após ter anexado o date a elas 
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      setMessages(messagesFirestore) 
                                    
    })
  }, []);

  async function readUser() {
    const user = await AsyncStorage.getItem('user')
      if (user) {
        setUser(JSON.parse(user))
      }
    }

    async function handlePress() {
      const _id = Math.random().toString(36).substring(7);
      const user = {_id, name}
      await AsyncStorage.setItem('user', JSON.stringify(user))
      setUser(user)
    }


    if(!user) {
      return(
        <View style={styles.container}>
          <TextInput 
            style={styles.input} 
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          <Button 
            onPress={handlePress}
            title="Enter the chat"
          />
        </View>
      )
    }

    return <GiftedChat messages={messages} user={user} onSend={} />
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
    marginBottom: 20,
    borderColor: 'gray',

  },
  button: {

  },
});
