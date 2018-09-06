import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {styles} from "../styles/styles";

export default class InfosPlayer extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
      <View>
        <Text>Niveau du joueur : {Math.trunc(this.props.infos.xp / 10 + 1)}</Text>
        <Text>Expérience avant niveau suivant : { 10 - (this.props.infos.xp % 10) }</Text>
      </View>
    );
  }
}
