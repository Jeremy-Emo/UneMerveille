import React from 'react';
import {Text, TouchableOpacity, View, Image} from 'react-native';
import {styles} from "../styles/styles";

export default class Header extends React.Component {
  constructor() {
    super();
  }

  render() {

    return (
      <View style={styles.header}>
        <Text style={styles.headerText}>{this.props.title}</Text>
      </View>
    );
  }
}
