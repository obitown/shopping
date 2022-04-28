import React from "react";
import { View, Text, StyleSheet, FlatList, Button, Pressable } from "react-native";

const firebase = require('firebase');
require('firebase/firestore');
require('firebase/auth');

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      uid: 0,
      lists: []
    }

    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyAvew1oYkmw-MvJfNU7pLJMsxU0_1aOJHc",
        authDomain: "test-604cd.firebaseapp.com",
        projectId: "test-604cd",
        storageBucket: "test-604cd.appspot.com",
        messagingSenderId: "806267742453",
        appId: "1:806267742453:web:a062c00f2e3b629d513dbc"
      })
    }

    this.referenceShoppingList = firebase.firestore().collection('shoppingLists')

    this.referenceShoppingListUser = firebase.firestore().collection('shoppingLists').where('uid', '==', this.state.uid)
  }

  onCollectionUpdate = (querySnapshot) => {
    const lists = [];
    // go through each document
    querySnapshot.forEach((doc) => {
      // get the QueryDocumentSnapshot's data
      var data = doc.data();
      lists.push({
        name: data.name,
        items: data.items.toString(),
      })
    })
    this.setState({
      lists,
    })
  }

  addList = () => {
    //add a new list to the collection
    this.referenceShoppingList.add({
      name: 'Christmas List',
      items: ['Dog', 'Cat', 'Bird',],
      uid: this.state.uid,
    });
  }

  render() {
    return (
      <View >
        <View style={styles.container}>
          <FlatList

            data={this.state.lists}
            renderItem={({ item }) =>
              <View style={styles.container}>
                <Text style={styles.text}>
                  {item.name}:
                </Text>
                <Text style={styles.item}>
                  {item.items}
                </Text>

              </View>
            }
          />
          <Pressable
            style={styles.button}
            onPress={this.addList}>
            <Text>Add List</Text>
          </Pressable>
        </View>
        <Text>
          {this.state.loggedInText}
        </Text>
      </View>
    );
  }

  componentDidMount() {
    //creating a reference to 'shoppingLists' Collection
    this.referenceShoppingList = firebase.firestore().collection('shoppingLists')

    //listen to authentication events
    this.authUnsubscribe = firebase.auth().onAuthStateChanged
      (async (user) => {
        if (!user) {
          await firebase.auth().signInAnonymously();
        }

        //update user state with currently active user data
        this.setState({
          uid: user.uid,
          loggedInText: 'Hello there',
        });

        //create a reference to the active user's documents (shopping lists)
        this.referenceShoppingListUser = firebase.firestore().collection('shoppingLists').where('uid', '==', this.state.uid);

        //listen for collection changes for current user
        this.unsubscribeListUser = this.referenceShoppingListUser.onSnapshot(this.onCollectionUpdate);
      });
  }

  componentWillUnmount() {
    //stop listening to authentication
    this.authUnsubscribe();
    //stop listening for changes
    this.unsubscribe();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40
  },
  item: {
    fontSize: 20,
    color: 'blue',
  },
  text: {
    fontSize: 30,
  },
  button: {
    height: 48,
    width: '50%',
    backgroundColor: '#d2ffff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
  },
});
