import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Arme from "./components/Arme";
import {styles} from "./styles/styles";

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
          img : require("./images/pierre.png"),
        },
        {
          id : 2,
          nom : "Papier",
          bat : [1],
          lvl : 1,
          img : require("./images/papier.png"),
        },
        {
          id : 3,
          nom : "Ciseaux",
          bat : [2],
          lvl : 1,
          img : require("./images/ciseaux.png"),
        },
        {
          id : 4,
          nom : "Puit",
          bat : [1,2,3],
          lvl : 2,
          img : "",
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
        <ScrollView horizontal={true} style={styles.mesArmes}>
          {
           this.state.weapons.map(
               (arme) => {
                 if(arme.lvl <= this.state.playerInfos.lvl){
                   return (
                       <Arme weapon={arme} key={arme.id} onPressWeapon={this.checkVictory} />
                   )
                 }
               }
           )
          }
        </ScrollView>
      </View>
    );
  }
}
