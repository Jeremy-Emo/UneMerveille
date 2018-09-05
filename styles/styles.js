import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
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
    }
});
