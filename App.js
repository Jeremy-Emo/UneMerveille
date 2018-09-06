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
          bat : [3,5],
          lvl : 1,
          img : require("./images/pierre.png"),
        },
        {
          id : 2,
          nom : "Papier",
          bat : [1,4],
          lvl : 1,
          img : require("./images/papier.png"),
        },
        {
          id : 3,
          nom : "Ciseaux",
          bat : [2,6],
          lvl : 1,
          img : require("./images/ciseaux.png"),
        },
        {
          id : 4,
          nom : "Puit",
          bat : [1,3],
          lvl : 2,
          img : require("./images/puit.png"),
        },
        {
          id : 5,
          nom : "Bazooka",
          bat : [2,3,4],
          lvl : 3,
          img : require("./images/bazooka.png"),
        },
        {
          id : 6,
          nom : "Licorne",
          bat : [2,5],
          lvl : 4,
          img : require("./images/licorne.png"),
        },
        {
          id : 7,
          nom : "The ULTIMATE",
          bat : [1,2,3,4,5,6,7],
          lvl : 5,
          img : require("./images/ultimate.png"),
        },
      ],
      playerInfos : {
        xp : 0,
        money : 0,
      },
      modalBatailleVisible: false,
      positionValue: new Animated.Value(0),
      rotationValue: new Animated.Value(0),
      playerWeapon: {},
      enemyWeapon: {},
      gotData : false,
    };

    AsyncStorage.getItem('playerInfos').then(data => {
      if (data !== null) {
        this.setState({playerInfos : JSON.parse(data)});
      }
      this.setState({gotData : true});
    })

  }


  getRandom = () => {
    let random = Math.floor(Math.random() * (this.state.weapons.length) );
    return this.state.weapons[random];
  }

  checkVictory = (playerWeapon) => {
    let enemyWeapon = this.getRandom();

    this.setState({
      modalBatailleVisible: true,
      playerWeapon: playerWeapon,
      enemyWeapon: enemyWeapon,
    });
    this.state.positionValue.setValue(0);
    this.state.rotationValue.setValue(0);
    Animated.timing(this.state.positionValue, {toValue: 1, duration: 500}).start(
      () => {
        Animated.spring(this.state.rotationValue, {toValue: 180, friction: 8, tension: 10}).start(
          () => {
            if( playerWeapon.bat.indexOf(enemyWeapon.id) != -1 ){
              console.log('gagné ! Vous : ' + playerWeapon.nom + ' ; Lui : ' + enemyWeapon.nom);
              let exp = (this.state.playerInfos.xp + 1)
              this.setState({
                playerInfos : {
                  xp : exp,
                }
              });
              let test = AsyncStorage.setItem('playerInfos', JSON.stringify(this.state.playerInfos));
            } else if(enemyWeapon.bat.indexOf(playerWeapon.id) != -1){
              console.log('perdu ! Vous : ' + playerWeapon.nom + ' ; Lui : ' + enemyWeapon.nom);
            } else {
              console.log('egalité...  Vous : ' + playerWeapon.nom + ' ; Lui : ' + enemyWeapon.nom);
            }
            this.setState({modalBatailleVisible: false});
          }
        )
      }
    );
  }

  render() {

    const card1 = {
      frontStyle: {
        transform: [{rotateX: this.state.rotationValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '180deg'],
        })}],
        opacity: this.state.rotationValue.interpolate({
          inputRange: [89, 90],
          outputRange: [1, 0]
        })
      },
      backStyle: {
        transform: [{rotateX: this.state.rotationValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['180deg', '0deg'],
        })}],
        opacity: this.state.rotationValue.interpolate({
          inputRange: [89, 90],
          outputRange: [0, 1]
        })
      },
      positionStyle: {
        bottom: this.state.positionValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['100%', '55%']
        })
      }
    }

    const card2 = {
      frontStyle: {
        transform: [{rotateX: this.state.rotationValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['0deg', '-180deg'],
        })}],
        opacity: this.state.rotationValue.interpolate({
          inputRange: [89, 90],
          outputRange: [1, 0]
        })
      },
      backStyle: {
        transform: [{rotateX: this.state.rotationValue.interpolate({
          inputRange: [0, 180],
          outputRange: ['-180deg', '0deg'],
        })}],
        opacity: this.state.rotationValue.interpolate({
          inputRange: [89, 90],
          outputRange: [0, 1]
        })
      },
      positionStyle: {
        top: this.state.positionValue.interpolate({
          inputRange: [0, 1],
          outputRange: ['100%', '55%']
        })
      }
    }

    return (
      <View style={styles.container}>
        <View>
        <Text>Niveau du joueur : {Math.trunc(this.state.playerInfos.xp / 10 + 1)}</Text>
        </View>
        <ScrollView horizontal={true} style={styles.mesArmes}>
          {
           this.state.weapons.map(
               (arme) => {
                 if(arme.lvl <= (this.state.playerInfos.xp / 10 + 1)){
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
            <Animated.View style={[card1.positionStyle, styles.cardContainer]}>
              <Animated.View style={[card1.frontStyle, styles.card]}></Animated.View>
              <Animated.View style={[card1.backStyle, styles.card]}>
                <Image style={{maxWidth:"100%"}} source={this.state.enemyWeapon.img} resizeMode="contain"/>
                <Text style={styles.weaponText}>
                  {this.state.enemyWeapon.nom}
                </Text>
              </Animated.View>
            </Animated.View>
            <Animated.View style={[card2.positionStyle, styles.cardContainer]}>
              <Animated.View style={[card2.frontStyle, styles.card]}></Animated.View>
              <Animated.View style={[card2.backStyle, styles.card]}>
                <Image style={{maxWidth:"100%"}} source={this.state.playerWeapon.img} resizeMode="contain"/>
                <Text style={styles.weaponText}>
                  {this.state.playerWeapon.nom}
                </Text>
              </Animated.View>
            </Animated.View>
          </View>
        </Modal>
      </View>
    );
  }
}
