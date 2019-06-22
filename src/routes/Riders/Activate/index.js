import React,{Component} from 'react';
import {
  StyleSheet, 
    Text, 
    View,
    ScrollView,
    Alert,
    // TextInput,
    Dimensions,
    TouchableHighlight,
    Image,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import { TextInput} from 'react-native-paper';
import styles from '../Login/LoginStyles';
import { Actions } from 'react-native-router-flux';
import AsyncStorage from '@react-native-community/async-storage';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Activate extends Component {
  constructor(props) {
    super(props);
    this.state = {
        verifyOpt: Math.floor(Math.random() * 1000) * 90,
        userMobile: '',
        userName:'',
        opt:''
    };
  }

  componentDidMount(){
      this.loadInitialState()
      .done();

  }

  loadInitialState = async () => {
      let mobile = await AsyncStorage.getItem('mobile');
      let username = await AsyncStorage.getItem('username');
      this.setState({userName:username});
      this.setState({userMobile:mobile});
      if(mobile !== null){
          Actions.activatepass();
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
        this.setState({ verifyOpt: newText });
    };

     // first letter in word in uppercase
     Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

  render(){
    return(
        <View style={styles.container}>
        <ScrollView>
            <KeyboardAvoidingView>
            <View style={{height: deviceHeight, width: deviceWidth, alignItems: 'center', justifyContent: 'center'}}>

            <View style={styles.imageContainer}>
                <Image
                resizeMode="contain"
                source={require("../../../../assets/logo.png")}
                style={styles.image}
                />
            </View>

            <View>
                <Text style={[styles.buttonTextSignupw, {color: '#6D6E70'}]}>Hi {this.Capitalize(this.state.userName)}! Active your Account!</Text>
                <Text style={[styles.buttonTextSignupw, {color: '#d62515'}]}>Your OPT is {this.state.verifyOpt} digits!</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={[styles.textInputStyle, {marginTop: 10}]}
                    label="Enter your OPT"
                    underlineColor="#11A0DC"
                    mode="outlined"
                    returnKeyType= "go"
                    autoCapitalize= "none"
                    keyboardType='numeric'
                    maxLength={10} 
                    editable="true" 
                    onChangeText={(opt)=> this.setState({opt})}
                    editable="true"
                    value={this.state.opt}
                    theme={{ colors: { placeholder: '#777', text: '#333', primary: '#11A0DC',underlineColor:'#11A0DC',background : '#fff'}}}
                />
                
                <TouchableHighlight style={styles.button}
                    underlayColor="transparent"
                    onPress={() => this._verifyOpt()}
                >
                    <Text style={styles.buttonText}>Activate Account</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonSignup}
                    underlayColor={'transparent'}
                >
                  <Text style={[styles.buttonTextSignup, {color: '#6D6E70'}]}></Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonSignup}
                    underlayColor={'transparent'}
                    onPress={() => Actions.logrider()}
                >
                  <Text style={[styles.buttonTextSignup, {color: '#6D6E70'}]}>Have an account? Click here</Text>
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
            </KeyboardAvoidingView>

            {/* <Loading 
                ref="loading"
                // image={require('../path/imagename.png')}
                // backgroundColor='#ffffffF2'
                borderRadius={5}
                size={70}
                imageSize={40}
                indicatorColor='#11A0DC'
                easing={Loading.EasingType.ease}
            /> */}
        </ScrollView>
        </View>

    );
  };

  _verifyOpt = async () =>{
    const {opt,userMobile,userName,verifyOpt} = this.state;

    try {
      await fetch('http://10.0.0.44/orangecabs/app/verifyoptapp.php',{
        method:"POST",
        headers:{
          Accept:'application/json',
          'Content-Type':'application/json'
        },
        body:JSON.stringify({
          username: userName,
          mobile: userMobile,
          opt: opt,
          verifyOpt: verifyOpt

        })

      })
        .then((response) => response.json())
          .then((responseJson) =>{
            if(responseJson === 'ok'){
              // AsyncStorage.removeItem('mobile');
              // AsyncStorage.removeItem('username');
              Alert.alert('Success',"Your account has been activated!"),[{text: 'Okay'}];
              Actions.logrider();
            }else{
              Alert.alert('Failed',JSON.stringify(responseJson)),[{text: 'Okay'}];
            }

          })
            .catch((error)=>{
              console.log(error);
            })

    } catch (error) {
      console.log(error);
    }
  }

  }

  export default Activate;

