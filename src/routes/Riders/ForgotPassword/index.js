import React from 'react';
import {
    Text, 
    View,
    ScrollView,
    Alert,
    // TextInput,
    Dimensions,
    TouchableHighlight,
    Image,
    AsyncStorage
} from 'react-native';
import { TextInput} from 'react-native-paper';
import styles from './styles';
import { Actions } from 'react-native-router-flux';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class ForgotPassword extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        userMobile: '',
      };
  }

  componentDidMount(){
    this.loadInitialState()
    .done();
}

loadInitialState = async () => {
    let mobile = await AsyncStorage.getItem('mobile');
    let username = await AsyncStorage.getItem('username');
    let token = await AsyncStorage.getItem('id_token');
    this.setState({username:username});
    if(token !== null){
        this.props.navigation.navigate("Bookings");
    }
}

  onChanged(text){
      let newText = '';
      let numbers = '0123456789';

      for (var i=0; i < text.length; i++) {
          
          if(numbers.indexOf(text[i]) > -1 ) {
              newText = newText + text[i];
          }
          else {
              alert("please enter numbers only");
          }
      }
      this.setState({ userMobile: newText });
  };

    render(){
        return(

                <View style={styles.container}>
                <ScrollView>

            <View style={{height: deviceHeight, width: deviceWidth, alignItems: 'center', justifyContent: 'center'}}>

              <View style={styles.imageContainer}>
                <Image
                  resizeMode="contain"
                  source={require('../../../../assets/logo.png')}
                  style={styles.image}
                />
              </View>

              <View>
                  <Text style={[styles.buttonTextSignupw, {color: '#6D6E70'}]}>Reset Password step 1</Text>
              </View>

              <View style={styles.formContainer}>
                <TextInput
                    style={[styles.textInputStyle]}
                    label="mobile number"
                    underlineColor="#11A0DC"
                    mode="outlined"
                    returnKeyType= "go"
                    autoCapitalize= "none"
                    keyboardType='numeric'
                    maxLength={10} 
                    editable="true" 
                    onChangeText={(text)=> this.onChanged(text)}
                    editable="true"
                    value={this.state.userMobile}
                    theme={{ colors: { placeholder: '#777', text: '#333', primary: '#11A0DC',underlineColor:'#11A0DC',background : '#fff'}}}
                />

                <TouchableHighlight style={styles.button}
                  underlayColor="transparent"
                  onPress={() => this._submit()}
                >
                  <Text style={styles.buttonText}>Submit</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonSignup}
                    underlayColor={'transparent'}
                    onPress={() => Actions.logrider()}
                >
                  <Text style={[styles.buttonTextSignup, {color: '#6D6E70'}]}>Have account already? Click here</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonSignup}
                    underlayColor={'transparent'}
                    onPress={() => Actions.accueil()}
                >
                  <Text style={[styles.buttonTextSignup, {color: '#6D6E70'}]}>Go Back</Text>
                </TouchableHighlight>
                <View style={styles.viewTextRights}>
                  <Text style={styles.textRights}>© 2018 All Rights Reserved | Orangecabs</Text>
                </View>
              </View>
            </View>
          </ScrollView>
      </View>

        );
    }


    _submit = async () => {

        const {userMobile} = this.state;

      if (userMobile == '') {
        Alert.alert('Failed', 'mobile number is required'),[
          {text: 'Okay'},
        ];
        return;
      }

      if(userMobile.length !== 10){
          Alert.alert('Failed',"Mobile number must contain 10 numbers"),[
              {text: 'Okay'},
              ];
          return;
      }

      try {
        await fetch('http://10.0.0.44/orangecabs/app/verifynumberapp.php',{
            method: "POST",
            headers:{
                Accept: 'application/json',
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
                mobile: userMobile,
            })
  
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson === 'ok'){
                // AsyncStorage.setItem('mobileS', res.mobileS);
                Alert.alert('Succes',"Your number is verified"),[{text: 'Okay'}];
              AsyncStorage.setItem('mobile',userMobile);
              this.props.navigation.navigate("ResetPass");
            }
            else{
              Alert.alert('Failed',JSON.stringify(responseJson)),[{text: 'Okay'}];
            }
        })
        .catch((error)=>{
            console.log(error);
        });
      } catch (error) {
          console.log(error);
      }
  }
}

export default ForgotPassword;


