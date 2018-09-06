import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ScrollView, Button, Animated, Modal, Image } from 'react-native';
import Arme from "./components/Arme";
import InfosPlayer from "./components/InfosPlayer";
import Header from "./components/Header";
import {styles} from "./styles/styles";

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      weapons : [
        {
          id : 1,
          nom : "Pierre",
          bat : [3,5,10],
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
          bat : [2,6,9],
          lvl : 1,
          img : require("./images/ciseaux.png"),
        },
        {
          id : 4,
          nom : "Puit",
          bat : [1,3,8,10],
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
          bat : [2,5,8],
          lvl : 4,
          img : require("./images/licorne.png"),
        },
        {
          id : 7,
          nom : "The ULTIMATE",
          bat : [1,2,3,4,5,7,9],
          lvl : 20,
          img : require("./images/ultimate.png"),
        },
        {
          id : 8,
          nom : "Spartiate",
          bat : [1,2,3,5],
          lvl : 6,
          img : require("./images/spartiate.png"),
        },
        {
          id : 9,
          nom : "Corde",
          bat : [1,4,6],
          lvl : 3,
          img : require("./images/corde.png"),
        },
        {
          id : 10,
          nom : "Bière",
          bat : [7,8,11],
          lvl : 6,
          img : require("./images/biere.png"),
        },
        {
          id : 11,
          nom : "Arc-en-ciel",
          bat : [6,7],
          lvl : 7,
          img : require("./images/rainbow.png"),
        },
      ],
      playerInfos : {
        xp : 0,
        money : 0,
      },
      modalBatailleVisible: false,
      positionValue: new Animated.Value(0),
      rotationValue: new Animated.Value(0),
      opacityValue: new Animated.Value(0),
      playerWeapon: {},
      enemyWeapon: {},
      gotData : false,
      message: null,
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

    if(!this.state.modalBatailleVisible){
      let enemyWeapon = this.getRandom();

      this.setState({
        modalBatailleVisible: true,
        playerWeapon: playerWeapon,
        enemyWeapon: enemyWeapon,
      });
      this.state.positionValue.setValue(0);
      this.state.rotationValue.setValue(0);
      this.state.opacityValue.setValue(0);
      Animated.timing(this.state.positionValue, {toValue: 1, duration: 800}).start(
        () => {
          Animated.timing(this.state.rotationValue, {toValue: 180, duration: 800}).start(
            () => {
              if( playerWeapon.bat.indexOf(enemyWeapon.id) != -1 ){
                console.log('gagné ! Vous : ' + playerWeapon.nom + ' ; Lui : ' + enemyWeapon.nom);
                let exp = (this.state.playerInfos.xp + 1)
                let pognon = (this.state.playerInfos.money + 5)
                this.setState({
                  playerInfos : {
                    xp : exp,
                    money : pognon,
                  },
                  message: "Victoire !",
                });
                let test = AsyncStorage.setItem('playerInfos', JSON.stringify(this.state.playerInfos));
              } else if(enemyWeapon.bat.indexOf(playerWeapon.id) != -1){
                console.log('perdu ! Vous : ' + playerWeapon.nom + ' ; Lui : ' + enemyWeapon.nom);
                this.setState({
                  message: "Défaite !",
                })
              } else {
                console.log('egalité...  Vous : ' + playerWeapon.nom + ' ; Lui : ' + enemyWeapon.nom);
                this.setState({
                  message: "Egalité...",
                })
              }
              Animated.timing(this.state.opacityValue, {toValue: 1, duration: 1000}).start(
                () => {
                  this.setState({modalBatailleVisible: false});
                }
              )

            }
          )
        }
      );
    }
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
        <Header/>
        <InfosPlayer infos={this.state.playerInfos} />
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
            <Animated.Text style={[{opacity: this.state.opacityValue}, styles.batailleModalText]}>{this.state.message}</Animated.Text>
            <Animated.View style={[card1.positionStyle, styles.cardContainer]}>
              <Animated.Image style={[card1.frontStyle, styles.card]} resizeMode="cover" source={require("./images/cardBackground.png")}/>
              <Animated.View style={[card1.backStyle, styles.card, {backgroundColor: 'white'}]}>
                <Image style={{maxWidth:"100%", maxHeight: "100%"}} source={this.state.enemyWeapon.img} resizeMode="contain"/>
                <Text style={styles.weaponText}>
                  {this.state.enemyWeapon.nom}
                </Text>
              </Animated.View>
            </Animated.View>
            <Animated.View style={[card2.positionStyle, styles.cardContainer]}>
            <Animated.Image style={[card2.frontStyle, styles.card]} resizeMode="cover" source={require("./images/cardBackground.png")}/>
              <Animated.View style={[card2.backStyle, styles.card, {backgroundColor: 'white'}]}>
                <Image style={{maxWidth:"100%", maxHeight: "100%"}} source={this.state.playerWeapon.img} resizeMode="contain"/>
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
