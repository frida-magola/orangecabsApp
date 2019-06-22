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
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { TextInput} from 'react-native-paper';
import styles from './styles';
import { Actions } from 'react-native-router-flux';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class ResetPassword extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        userConfirmPassword: '',
        userPassword:'',
        mobile:''

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
        this.setState({mobile:mobile});
        if(token !== null){
            this.props.navigation.navigate("Bookings");
        }
    }

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
                  <Text style={[styles.buttonTextSignupw, {color: '#6D6E70'}]}>Reset Password step 2</Text>
              </View>

              <View style={styles.formContainer}>

                <TextInput
                    style={[styles.textInputStyle, {marginTop: 10}]}
                    label="Choose new Password"
                    mode="outlined"
                    returnKeyType= "go"
                    autoCapitalize= "none"
                    secureTextEntry= {true}
                    editable="true"
                    autoCorrect={false}
                    onChangeText={(userPassword) => this.setState({userPassword})}
                    value={this.state.userPassword}
                    theme={{ colors: { placeholder: '#777', text: '#333', primary: '#11A0DC',underlineColor:'#11A0DC',background : '#fff'}}}
                    />

                <TextInput
                    style={[styles.textInputStyle, {marginTop: 10}]}
                    label="Confirm password"
                    mode="outlined"
                    returnKeyType= "go"
                    autoCapitalize= "none"
                    secureTextEntry= {true}
                    editable="true"
                    autoCorrect={false}
                    onChangeText={(userConfirmPassword) => this.setState({userConfirmPassword})}
                    value={this.state.userConfirmPassword}
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


    _submit() {

        const {userPassword,userConfirmPassword,mobile} = this.state;

        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");
        // let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/;

        if(userPassword == '') {
            Alert.alert('Failed', 'Password is required'),[
              {text: 'Okay'},
            ];
            return;
        }

        if(userConfirmPassword == '') {
            Alert.alert('Failed', 'Confirm your password'),[
            {text: 'Okay'},
            ];
            return;
        }

        // if(strongRegex.test(this.state.passwordInputTxt) === false)
        // {
        // // console.log("Email is Not Correct");
        // Alert.alert('Failed',"Your password should be at least 6 characters or longer and include one capital letter and one number"),[{text: 'Okay'}];
        // // this.setState({email})
        // return;
        // }

  
        // if(this.state.passwordInputTxt !== this.state.passwordInputTxt2) {
        //     Alert.alert('Failed', 'Passwords must match'),[
        //     {text: 'Okay'},
        //     ];
        //     return;
        // }

      fetch('http://10.0.0.44/orangecabs/app/resetpasswordapp.php',{
          method: "POST",
          headers:{
               Accept: 'application/json',
              'Content-type': 'application/json'
          },
          body:JSON.stringify({
              password:userPassword,
              confirmPassword: userConfirmPassword,
              mobile:mobile
          })

      })
      .then((response) => response.json())
      .then((responseJson) => {
          if(responseJson === 'ok'){
              // AsyncStorage.setItem('user', res.user);
              Alert.alert('Success',"Your password has been changed!"),[{text: 'Okay'}];
              this.props.navigation.navigate("RiderLogin");
          }
          else{
            Alert.alert('Failed',JSON.stringify(responseJson)),[{text: 'Okay'}];
          }
      })
      .catch((error)=>{
          console.log(error);
      })
  }
}

export default ResetPassword;


