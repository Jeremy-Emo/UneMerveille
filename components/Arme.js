import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export default class Arme extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
        <TouchableOpacity>
          <Text>
            {this.props.weapon.nom}
          </Text>
        </TouchableOpacity>
    );
  }
}
