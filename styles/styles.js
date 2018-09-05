import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
    },
    armeBox: {
      width : 150,
      height : 180,
      borderColor : "black",
      borderWidth : 1,
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginLeft : 10,
      marginRight: 10,
    },
    mesArmes: {
      flex: 1,
    },
    weaponText: {
      position: "absolute",
      bottom: 0,
    },
    batailleModal: {
      flex: 1,
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,.3)'
    },
    modalArmeBox: {
      width : '100%',
      height : '100%',
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    slide: {
      width: 250,
      height: 250,
      position: 'absolute',
      backgroundColor: 'white',
      borderTopColor: 'black',
      borderTopWidth: 2,
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      borderRightColor: 'black',
      borderRightWidth: 2,
      borderLeftColor: 'black',
      borderLeftWidth: 2,
      borderRadius: 5,
    },
});
