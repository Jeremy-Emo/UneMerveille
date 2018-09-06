import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ScrollView, Button, Animated, Modal, Image } from 'react-native';
import Arme from "./components/Arme";
import InfosPlayer from "./components/InfosPlayer";
import Header from "./components/Header";
import {styles} from "./styles/styles";
import {confWeapons} from "./config/weapons";

export default class App extends React.Component {

  constructor(){
    super();
    this.state = {
      weapons : confWeapons,
      playerInfos : {
        xp : 0,
        money : 0,
        skins : [1,2,3,4,5,6,7,8,9,10,11,12,13,14],
        victoires : 0,
        defaites : 0,
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
        let jsonData = JSON.parse(data);
        if(jsonData.skins && jsonData.victoires && jsonData.defaites ){
          this.setState({playerInfos : jsonData});
        } else {
          let pskins = this.state.playerInfos.skins;
          let wins = this.state.playerInfos.victoires;
          let loses = this.state.playerInfos.defaites;
          this.setState({
            playerInfos : {
              xp : jsonData.xp,
              money : jsonData.money,
              skins : pskins,
              victoires : wins,
              defaites : loses,
            }
          })
        }
      }
      this.setState({gotData : true});
    })

  }

  addSkin = (idSkin, price) => {
    let pskins = this.state.playerInfos.skins;
    if(price <= this.state.playerInfos.money){
      let pognon = (this.state.playerInfos.money - price);
      let exp = this.state.playerInfos.xp;
      let wins = this.state.playerInfos.victoires;
      let loses = this.state.playerInfos.defaites;
      newSkins = pskins.push(idSkin);
      this.setState({
        playerInfos : {
          xp : exp,
          money : pognon,
          pskins : newSkins,
          victoires : wins,
          defaites : loses,
        }
      })
      let test = AsyncStorage.setItem('playerInfos', JSON.stringify(this.state.playerInfos));
    }
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
                let exp = (this.state.playerInfos.xp + 1);
                let pognon = (this.state.playerInfos.money + 5);
                let wins = this.state.playerInfos.victoires + 1;
                let loses = this.state.playerInfos.defaites;
                let pskins = this.state.playerInfos.skins;
                this.setState({
                  playerInfos : {
                    xp : exp,
                    money : pognon,
                    skins : pskins,
                    victoires : wins,
                    defaites : loses,
                  },
                  message: "Victoire !",
                });
                let test = AsyncStorage.setItem('playerInfos', JSON.stringify(this.state.playerInfos));
              } else if(enemyWeapon.bat.indexOf(playerWeapon.id) != -1){
                let exp = this.state.playerInfos.xp;
                let pognon = this.state.playerInfos.money;
                let wins = this.state.playerInfos.victoires;
                let loses = this.state.playerInfos.defaites + 1;
                let pskins = this.state.playerInfos.skins;
                this.setState({
                  playerInfos : {
                    xp : exp,
                    money : pognon,
                    skins : pskins,
                    victoires : wins,
                    defaites : loses,
                  },
                  message: "Défaite !",
                })
              } else {
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
                 if( (arme.lvl <= (this.state.playerInfos.xp / 10 + 1)) && (this.state.playerInfos.skins.indexOf(arme.id) != -1) ){
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
