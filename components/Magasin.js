import React from 'react';
import {Text, TouchableOpacity, View, Image, Modal, ScrollView, Button} from 'react-native';
import {styles} from "../styles/styles";
import Arme from "./Arme";
import Header from "./Header";

export default class Magasin extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
        <Modal
        visible={this.props.state.modalMagasinVisible} transparent={false} onRequestClose={() => {}} animationType="slide">
        <Header title="MAGASIN"/>
        <View style={{position: 'absolute', top: 160, right: 0, left: 0, flex: 1, alignItems: 'center', justifyContent: 'center', alignContent: 'center'}}>
        <ScrollView horizontal={true} >
          {
           this.props.state.weapons.map(
               (arme) => {
                 if ((arme.price != null) && (arme.lvl <= (this.props.state.playerInfos.xp / 10 + 1)) && (this.props.state.playerInfos.skins.indexOf(arme.id) == -1) ){
                   return (
                    <TouchableOpacity style={styles.armeBox} onPress={() => {this.props.addSkin(arme)}} key={arme.id}>
                    <Image
                      style={{maxWidth:"100%", maxHeight: "100%"}}
                      source={arme.img}
                      resizeMode="contain"
                    />
                    <View style={[styles.weaponText, {alignItems: "center"}]}>
                    <Text >
                      {arme.nom}
                    </Text>
                    <Text>
                      {arme.price}
                    </Text>
                    </View>
                  </TouchableOpacity>
                   )
                 }
               }
           )
          }
        </ScrollView>

<Text style={{marginTop: 50, fontSize: 28, marginBottom: 20}}>Pognon: {this.props.state.playerInfos.money}</Text>
<Button onPress={this.props.closeMagasinModal} title="Retour"/>
        </View>
        </Modal>
    );
  }
}
