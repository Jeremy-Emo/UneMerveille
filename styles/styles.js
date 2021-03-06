import { StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    container: {
      flex: 1,
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
      padding : 10,
      backgroundColor: '#fff',
    },
    infosBox: {
      marginTop: 20,
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,.3)',
      width : '100%',
    },
    textInfos: {
      fontSize: 18,
      fontWeight: 'bold',
      color : 'white',
    },
    mesArmes: {
      flex: 1,
      position: "absolute",
      bottom : 10,
    },
    weaponText: {
      position: "absolute",
      bottom: 0,
    },
    batailleModal: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,.3)'
    },
    batailleModalText: {
      fontSize: 50,
      fontWeight: 'bold',
    },
    cardContainer: {
      position: 'absolute',
      width: 250,
      height: 250,

    },
    card: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: '#000000',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 5,
      shadowOpacity: 1.0,
      borderRadius: 10,
      padding: 25,
      backfaceVisibility: 'hidden',
    },
    header: {
      paddingTop: 40,
      paddingBottom: 40,
      paddingLeft: 25,
      paddingRight: 25,
      position : "absolute",
      top : 0,
      width: "100%",
      alignItems: "center",
      justifyContent : "center",
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      flexWrap: "wrap",
    },
    headerText: {
      fontSize : 25,
      color : "white",
      textAlign : "center",
    },
});
