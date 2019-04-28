import { Platform } from 'react-native';
const styles = {
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
    },
    imageContainer: {
      alignItems: 'center',
    },
    image: {
      // width: 300,
      // height: 120,
      marginTop: 30,
    },
    formContainer: {
      marginTop: 30,
      paddingHorizontal: 30,
    },
    textInputStyle: {
      height: 50,
      fontSize: 16,
      paddingLeft:5,
      color: 'black',
    },
    textInputBottomLine: {
      height: 1,
      backgroundColor: (Platform.OS == 'ios') ? '#E6E7E9': '#11A0DC',
    },
    button: {
      height: 40,
      width: 300,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
      borderRadius: 5,
      borderWidth: 2,
      borderColor: '#11A0DC',
    },
    buttonText: {
      fontSize: 17,
      color: '#11A0DC',
      fontWeight: 'bold',
    },
    buttonSignup: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 30,
    },
    buttonTextSignup: {
      fontSize: 12,
    },
    buttonTextSignupw: {
      fontSize: 18,
      marginTop:20,
      alignItems:'center'
    },
    viewTextRights: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 75,
    },
    textRights: {
      fontSize: 10,
      color: '#11A0DC',
    },
  };
  export default styles;