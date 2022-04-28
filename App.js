import React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";

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
    this.referenceShoppingList = firebase.firestore().collection('shoppingLists')
  }

  componentDidMount() {
    this.referenceShoppingList = firebase.firestore().collection('shoppingLists');
    this.unsubscribe = this.referenceShoppingList.onSnapshot(this.onCollectionUpdate);
  }

  componentWillUnmount() {
    this.unsubscribe();
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
    this.referenceShoppingList.add({
      name: 'TestList2',
      items: ['test', 'test', 'test',],
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
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
          <Button
            onPress={this.addList}
          />
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 40
  },
  item: {
    fontSize: 20,
    color: 'blue',
  },
  text: {
    fontSize: 30,
  }
});
