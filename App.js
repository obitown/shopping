import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
// import * as firebase from './firebase';
// import 'firebase/firestore'

const firebase = require('firebase')
require('firebase/firestore')

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={{ fontWeight: '900' }}>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#93D8FF',
    alignItems: 'center',
    justifyContent: 'center',

  },
});
