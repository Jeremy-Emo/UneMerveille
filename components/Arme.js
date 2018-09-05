import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {styles} from "../styles/styles";

export default class Arme extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
        <TouchableOpacity style={styles.armeBox}>
          <Image
            style={{maxWidth:"100%"}}
            source={this.props.weapon.img}
            resizeMode="contain"
          />
          <Text style={styles.weaponText}>
            {this.props.weapon.nom}
          </Text>
        </TouchableOpacity>
    );
  }
}
