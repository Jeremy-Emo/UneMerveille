import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ScrollView, Button, Animated, Modal, Image } from 'react-native';
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
      modalBatailleVisible: false,
      rotateValue: new Animated.Value(0),
      playerWeapon: {},
      enemyWeapon: {}
    };

  }

  getRandom = () => {
    let random = Math.floor(Math.random() * (this.state.weapons.length - 1) );
    return this.state.weapons[random];
  }

  checkVictory = (playerWeapon) => {
    let enemyWeapon = this.getRandom();

    this.setState({
      modalBatailleVisible: true,
      playerWeapon: playerWeapon,
      enemyWeapon: enemyWeapon,
    });
    this.state.rotateValue.setValue(0);
    Animated.timing(this.state.rotateValue, {toValue: 1, duration: 500}).start(
      () => {
        if( playerWeapon.bat.indexOf(enemyWeapon.id) != -1 ){
          console.log('gagné ! Vous : ' + playerWeapon.nom + ' ; Lui : ' + enemyWeapon.nom);
        } else if(enemyWeapon.bat.indexOf(playerWeapon.id) != -1){
          console.log('perdu ! Vous : ' + playerWeapon.nom + ' ; Lui : ' + enemyWeapon.nom);
        } else {
          console.log('egalité...  Vous : ' + playerWeapon.nom + ' ; Lui : ' + enemyWeapon.nom);
        }
        this.setState({modalBatailleVisible: false});
      }
    );
  }

  render() {
    const { rotateValue} = this.state;
    return (
      <View style={styles.container}>
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
        <Modal visible={this.state.modalBatailleVisible} transparent={false} onRequestClose={() => {}}>
          <View style={styles.batailleModal}>
            <Animated.View style={[{bottom: this.state.rotateValue.interpolate({inputRange: [0, 1],outputRange: ['100%', '55%']})}, styles.slide]}>
            <View style={styles.modalArmeBox}>
            <Image
              style={{maxWidth:"100%"}}
              source={this.state.enemyWeapon.img}
              resizeMode="contain"
            />
          <Text style={styles.weaponText}>
            {this.state.enemyWeapon.nom}
          </Text>
          </View>
            </Animated.View>
            <Animated.View style={[{top: this.state.rotateValue.interpolate({inputRange: [0, 1],outputRange: ['100%', '55%']})}, styles.slide]}>
            <View style={styles.modalArmeBox}>
            <Image
              style={{maxWidth:"100%"}}
              source={this.state.playerWeapon.img}
              resizeMode="contain"
            />
          <Text style={styles.weaponText}>
            {this.state.playerWeapon.nom}
          </Text>
          </View>
            </Animated.View>
          </View>
        </Modal>
      </View>
    );
  }
}
