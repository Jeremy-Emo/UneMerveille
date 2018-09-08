import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {styles} from "../styles/styles";

export default class InfosPlayer extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
      <View style={styles.infosBox}>
        <Text style={styles.textInfos}>Niveau du joueur : {Math.trunc(this.props.infos.xp / 10 + 1)}</Text>
        <Text style={styles.textInfos}>Expérience avant niveau suivant : { 10 - (this.props.infos.xp % 10) }</Text>
        <Text style={styles.textInfos}>Pognon : { this.props.infos.money }</Text>
        <Text style={styles.textInfos}>Victoires : { this.props.infos.victoires } / Défaites : { this.props.infos.defaites }</Text>
      </View>
    );
  }
}
