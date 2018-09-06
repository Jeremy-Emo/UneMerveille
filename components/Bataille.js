import React from 'react';
import {Text, TouchableOpacity, View, Image, Modal, Animated} from 'react-native';
import {styles} from "../styles/styles";

export default class Bataille extends React.Component {
  constructor() {
    super();
  }

  render() {

    const card1 = {
        frontStyle: {
          transform: [{rotateX: this.props.state.rotationValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '180deg'],
          })}],
          opacity: this.props.state.rotationValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
          })
        },
        backStyle: {
          transform: [{rotateX: this.props.state.rotationValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '0deg'],
          })}],
          opacity: this.props.state.rotationValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
          })
        },
        positionStyle: {
          bottom: this.props.state.positionValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['100%', '55%']
          })
        }
      }
  
      const card2 = {
        frontStyle: {
          transform: [{rotateX: this.props.state.rotationValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['0deg', '-180deg'],
          })}],
          opacity: this.props.state.rotationValue.interpolate({
            inputRange: [89, 90],
            outputRange: [1, 0]
          })
        },
        backStyle: {
          transform: [{rotateX: this.props.state.rotationValue.interpolate({
            inputRange: [0, 180],
            outputRange: ['-180deg', '0deg'],
          })}],
          opacity: this.props.state.rotationValue.interpolate({
            inputRange: [89, 90],
            outputRange: [0, 1]
          })
        },
        positionStyle: {
          top: this.props.state.positionValue.interpolate({
            inputRange: [0, 1],
            outputRange: ['100%', '55%']
          })
        }
      }

    return (
        <Modal visible={this.props.state.modalBatailleVisible} transparent={false} onRequestClose={() => {}} ref={this.batailleModale}>
          <View style={styles.batailleModal}>
            <Animated.Text style={[{opacity: this.props.state.opacityValue}, styles.batailleModalText]}>{this.props.state.message}</Animated.Text>
            <Animated.View style={[card1.positionStyle, styles.cardContainer]}>
              <Animated.Image style={[card1.frontStyle, styles.card]} resizeMode="cover" source={require("../images/cardBackground.png")}/>
              <Animated.View style={[card1.backStyle, styles.card, {backgroundColor: 'white'}]}>
                <Image style={{maxWidth:"100%", maxHeight: "100%"}} source={this.props.state.enemyWeapon.img} resizeMode="contain"/>
                <Text style={styles.weaponText}>
                  {this.props.state.enemyWeapon.nom}
                </Text>
              </Animated.View>
            </Animated.View>
            <Animated.View style={[card2.positionStyle, styles.cardContainer]}>
            <Animated.Image style={[card2.frontStyle, styles.card]} resizeMode="cover" source={require("../images/cardBackground.png")}/>
              <Animated.View style={[card2.backStyle, styles.card, {backgroundColor: 'white'}]}>
                <Image style={{maxWidth:"100%", maxHeight: "100%"}} source={this.props.state.playerWeapon.img} resizeMode="contain"/>
                <Text style={styles.weaponText}>
                  {this.props.state.playerWeapon.nom}
                </Text>
              </Animated.View>
            </Animated.View>
          </View>
        </Modal>
    );
  }
}
