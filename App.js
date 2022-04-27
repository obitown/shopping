import React from "react";
import { View, Text, StyleSheet } from "react-native";

const firebase = require('firebase')
require('firebase/firestore')

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      lists: []
    }

    const firebaseConfig = {
      apiKey: "AIzaSyAvew1oYkmw-MvJfNU7pLJMsxU0_1aOJHc",
      authDomain: "test-604cd.firebaseapp.com",
      projectId: "test-604cd",
      storageBucket: "test-604cd.appspot.com",
      messagingSenderId: "806267742453",
      appId: "1:806267742453:web:a062c00f2e3b629d513dbc"
    }

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig)
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={{ fontWeight: '900' }}>Open up App.js to start working on your app!</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#93D8FF',
    alignItems: 'center',
    justifyContent: 'center',

  },
});
