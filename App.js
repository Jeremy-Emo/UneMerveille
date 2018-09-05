import React from 'react';
import { AsyncStorage, StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      weapons : [
        {
          id : 1,
          nom : "Pierre",
          bat : [3],
          lvl : 1,
        },
        {
          id : 2,
          nom : "Papier",
          bat : [1],
          lvl : 1,
        },
        {
          id : 3,
          nom : "Ciseaux",
          bat : [2],
          lvl : 1,
        },
      ],
      playerInfos : {
        lvl : 1,
        money : 0,
      },
    };

  }

  getRandom = () => {
    let random = Math.floor(Math.random() * (this.state.weapons.length - 1) );
    return this.state.weapons[random];
  }

  checkVictory = () => {

  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
