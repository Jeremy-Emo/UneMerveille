import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, ScrollView, Button, Animated, Modal, Image } from 'react-native';
import Arme from "./components/Arme";
import InfosPlayer from "./components/InfosPlayer";
import Header from "./components/Header";
import Bataille from "./components/Bataille";
import Magasin from "./components/Magasin";
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
        skins : [],
        victoires : 0,
        defaites : 0,
      },
      modalBatailleVisible: false,
      modalMagasinVisible: false,
      playerWeapon: {},
      enemyWeapon: {},
      positionValue: new Animated.Value(0),
      rotationValue: new Animated.Value(0),
      opacityValue: new Animated.Value(0),
      message: null,
    };

    this.retrieveData();


  }

  retrieveData = async () => {
    try {
       let data = await AsyncStorage.getItem('playerInfos').then(data => {
        if (data !== null) {
          let jsonData = JSON.parse(data);
          let pskins = jsonData.skins ? jsonData.skins : this.state.playerInfos.skins;
          let wins = jsonData.victoires ? jsonData.victoires : this.state.playerInfos.victoires;
          let loses = jsonData.defaites ? jsonData.defaites : this.state.playerInfos.defaites;
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
      })
    } catch (error) {
      console.error(error);
    }
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('playerInfos', JSON.stringify(this.state.playerInfos));
    } catch (error) {
      console.error(error);
    }
  }

  addSkin = (skin) => {
    let pskins = this.state.playerInfos.skins;
    if(skin.price <= this.state.playerInfos.money){
      let pognon = (this.state.playerInfos.money - skin.price);
      let exp = this.state.playerInfos.xp;
      let wins = this.state.playerInfos.victoires;
      let loses = this.state.playerInfos.defaites;
      pskins.push(skin.id);
      this.setState({
        playerInfos : {
          xp : exp,
          money : pognon,
          skins : pskins,
          victoires : wins,
          defaites : loses,
        }
      })
      this.storeData();
    }
  }

  getRandom = () => {
    let random = Math.floor(Math.random() * (this.state.weapons.length) );
    return this.state.weapons[random];
  }

  openMagasinModal = () => {
    this.setState({
      modalMagasinVisible: true,
    })
  }

  closeBatailleModal = () => {
    this.setState({modalBatailleVisible: false});
  }

  closeMagasinModal = () => {
    this.setState({modalMagasinVisible: false});
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
                this.storeData();

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
                this.storeData();
              } else {
                this.setState({
                  message: "Egalité...",
                })
              }
              Animated.timing(this.state.opacityValue, {toValue: 1, duration: 1000}).start(
                () => {
                  this.setState({
                    modalBatailleVisible: false,
                  });
                }
              )

            }
          )
        }
      );

    }
  }

  render() {

    return (
      <View style={styles.container}>
        <Header title="ULTIMATE WONDERFUL JANKEN OF DEATH"/>
        <Button onPress={() => this.openMagasinModal()} title="Magasin"/>
        <InfosPlayer infos={this.state.playerInfos} />
        <ScrollView horizontal={true} style={styles.mesArmes}>
          {
           this.state.weapons.map(
               (arme) => {
                 if( (arme.lvl <= (this.state.playerInfos.xp / 10 + 1)) && (this.state.playerInfos.skins.indexOf(arme.id) != -1 || arme.price == null) ){
                   return (
                       <Arme weapon={arme} key={arme.id} onPressWeapon={this.checkVictory} />
                   )
                 }
               }
           )
          }
        </ScrollView>

          <Magasin state={this.state} closeMagasinModal={() => this.closeMagasinModal()} addSkin={this.addSkin}/>
        <Bataille state={this.state} closeBatailleModal={() => this.closeBatailleModal()}/>


      </View>
    );
  }
}
