import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ScrollView } from 'react-native';
import Arme from "./components/Arme";

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
          img : "",
        },
        {
          id : 2,
          nom : "Papier",
          bat : [1],
          lvl : 1,
          img : "",
        },
        {
          id : 3,
          nom : "Ciseaux",
          bat : [2],
          lvl : 1,
          img : "",
        },
      ],
      playerInfos : {
        lvl : 1,
        money : 0,
      },
    };

    this.checkVictory(this.getRandom());

  }

  getRandom = () => {
    let random = Math.floor(Math.random() * (this.state.weapons.length - 1) );
    return this.state.weapons[random];
  }

  checkVictory = (playerWeapon) => {
    let ennemyWeapon = this.getRandom();
    if( playerWeapon.bat.indexOf(ennemyWeapon.id) != -1 ){
      console.log('gagné ! Vous : ' + playerWeapon.nom + ' ; Lui : ' + ennemyWeapon.nom);
    } else if(ennemyWeapon.bat.indexOf(playerWeapon.id) != -1){
      console.log('perdu ! Vous : ' + playerWeapon.nom + ' ; Lui : ' + ennemyWeapon.nom);
    } else {
      console.log('egalité...  Vous : ' + playerWeapon.nom + ' ; Lui : ' + ennemyWeapon.nom);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <ScrollView horizontal={true}>
          {
           this.state.weapons.map(
               (arme) => {
                 return (
                     <Arme weapon={arme} key={arme.id}/>
                 )
               }
           )
          }
        </ScrollView>
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
