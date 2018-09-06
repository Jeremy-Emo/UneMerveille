import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {styles} from "../styles/styles";

export default class InfosPlayer extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
      <View style={{marginTop: 20, alignItems: 'center'}}>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Niveau du joueur : {Math.trunc(this.props.infos.xp / 10 + 1)}</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Expérience avant niveau suivant : { 10 - (this.props.infos.xp % 10) }</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Pognon : { this.props.infos.money }</Text>
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>Victoires : { this.props.infos.victoires } / Défaites : { this.props.infos.defaites }</Text>
      </View>
    );
  }
}
