import React from 'react';
import {Container} from 'native-base';
import {
    Text, 
    View,
    ScrollView,
    Alert,
    Dimensions,
    TouchableHighlight,
    Image,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import styles from './LoginStyles';
// import Loading from 'react-native-whc-loading';
import { sha256 } from 'react-native-sha256';
import { TextInput,DefaultTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { Actions } from 'react-native-router-flux';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class LoginRider extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userMobile: '',
            userPassword: '',
            username:'',
            token:'',
            rider:'Rider',
        };
    }

    componentDidMount(){
        this.loadInitialState()
        .done();
        // generate token for current user connected the app
       
        if(this.state.userMobile !== null){
            sha256(this.state.userMobile).then( hash => {
                this.setState({token:hash});
                });
        }
    }

    loadInitialState = async () => {
        let mobile = await AsyncStorage.getItem('mobile');
        let token = await AsyncStorage.getItem('token');
        let username = await AsyncStorage.getItem('username');
        this.setState({username:username});
        if(token !== null){
            // this.props.navigation.navigate("Bookings");
            Actions.home();
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
                    source={require('../../../../assets/logo.png')}
                    style={styles.image}
                    />
                </View>
    
                <View>
                    <Text style={[styles.buttonTextSignupw, {color: '#6D6E70'}]}>Welcome back {this.state.username ? this.Capitalize(this.state.username):this.state.rider}!</Text>
                    <Text style={[styles.buttonTextSignupw, {color: '#6D6E70'}]}>Sign In to Orangecabs</Text>
                </View>
    
                <View style={styles.formContainer}>
                    <TextInput
                        style={[styles.textInputStyle, {marginTop: 10}]}
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
                    
                    <TextInput
                        style={[styles.textInputStyle, {marginTop: 10}]}
                        label="Password"
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
    
                    <TouchableHighlight style={styles.button}
                        underlayColor="transparent"
                        onPress={() => this._login()}
                    >
                        <Text style={styles.buttonText}>Log In</Text>
                    </TouchableHighlight>
    
                    <TouchableHighlight style={styles.buttonSignup}
                        underlayColor={'transparent'}
                        onPress={() => Actions.forgotpassword()}
                    >
                    <Text style={[styles.buttonTextSignup, {color: '#6D6E70'}]}>Forgot Password?</Text>
                    </TouchableHighlight>
    
                    <TouchableHighlight style={styles.buttonSignup}
                        underlayColor={'transparent'}
                        onPress={() => Actions.signup()}
                    >
                    <Text style={[styles.buttonTextSignup, {color: '#6D6E70'}]}>Don't have account? Click here</Text>
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

    _login = async () => {
       
        const {userMobile,userPassword,token} = this.state;
        // alert(token);
        if (this.state.userMobile == '') {
            // this.refs.loading.close();
          Alert.alert('Failed', 'mobile number is required'),[
            {text: 'Okay'},
          ];
          return;
        }
    
        if(userMobile.length !== 10){
            // this.refs.loading.close();
            alert("Mobile number must contain 10 numbers"),[
                {text: 'Okay'},
                ];
                return;
    
        }
        
        if (userPassword == '') {
            // this.refs.loading.close();
          Alert.alert('Failed', 'Password is required'),[
            {text: 'Okay'},
          ];
          return;
        }

        try {
            await fetch('http://10.0.0.44/orangecabs/app/loginapp.php', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    mobile: userMobile,
                    password: userPassword,
                    token: token,
                }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson === 'ok'){
                    // alert(JSON.stringify(responseJson));
                    // Alert.alert('Success','Welcome back'+username+'!'),[{text:'Okay'}];
                    AsyncStorage.setItem('token',token);
                    AsyncStorage.setItem('mobile',userMobile);
                    Actions.home();
                    // this.props.navigation.navigate("Bookings");

                }else{
                    Alert.alert('Failed',JSON.stringify(responseJson)),[{text: 'Okay'}];
                }  
            })
            .catch((error) => {
                alert("Try later or check your network!");
                console.error(error);
            });
        } catch (error) {
            console.log(error);
        }
    }
  
}

export default LoginRider;



