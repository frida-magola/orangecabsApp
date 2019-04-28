import React from 'react';
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
    AsyncStorage,
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import { TextInput} from 'react-native-paper';
import styles from './SignupStyles';
// import Loading from 'react-native-whc-loading';
import { sha256 } from 'react-native-sha256';
import { Actions } from 'react-native-router-flux';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Signup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        // formData:{
            userName:'',
            userMobile:'',
            userEmail:'',
            userPassword:'',
            userConfirmPassword:'',
            // OPT:'',
        // },
            jwt:'',
        };
    }

    componentDidMount(){
        this._loadInitialState().done();
        if(this.state.userMobile){
            sha256(this.state.userMobile).then( hash => {
                // console.log(hash);
                // alert(hash);
                this.setState({
                    jwt:hash
                });
            })
        }

    }

    _loadInitialState = async () => {
        // var value = await AsyncStorage.getItem('user');
        var token = await AsyncStorage.getItem('id_token');
        if(token !== null){
            this.props.navigation.navigate("RiderLogin");
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
                        <Text style={[styles.buttonTextSignupw, {color: '#6D6E70'}]}>Sign Up Rider to Orangecabs!</Text>
                    </View>

                    <View style={styles.formContainer}>
                        <TextInput
                            style={[styles.textInputStyle,{marginTop: 10}]}
                            label="Full name"
                            mode="outlined"
                            returnKeyType= {'next'}
                            autoCapitalize= "none"
                            editable= 'true'
                            autoCorrect= {false}
                            onChangeText={(userName) => this.setState({userName})}
                            value={this.state.userName}
                            theme={{ colors: { placeholder: '#777', text: '#333', primary: '#11A0DC',underlineColor:'#11A0DC',background : '#fff'}}}
                        />

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
                            label="e.g: abc@example.com"
                            mode="outlined"
                            returnKeyType= {'next'}
                            autoCapitalize= "none"
                            autoCorrect= {false}
                            editable="true"
                            onChangeText={(userEmail) => this.setState({userEmail})}
                            editable="true"
                            value={this.state.userEmail}
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
                            onPress={() => this._signup()}
                        >
                        <Text style={styles.buttonText}>Sign Up</Text>
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
                </KeyboardAvoidingView>

            </ScrollView>
        </View>

        );
    }

    _signup = async () =>{
        
        const {userName, userMobile, userEmail, userPassword, userConfirmPassword} = this.state;
 
        // alert(RandomNumber);

        if(userName == ''){
            // this.refs.loading.close();
            Alert.alert("Failed","Username is required"),[
                {text: 'Okay'},];
                return;
        }
        if (userMobile == '') {
            // this.refs.loading.close();
          Alert.alert('Failed', 'mobile number is required'),[
            {text: 'Okay'},
          ];
          return;
        }

        if(userMobile.length !== 10){
            // this.refs.loading.close();
            Alert.alert('Failed',"Mobile number must contain 10 numbers"),[
                {text: 'Okay'},
                ];
                return;
        }

        if(userEmail == ''){
            // this.refs.loading.close();
            Alert.alert('Failed',"Email address is required"),[
                {text: 'Okay'},
                ];
                return;
        }
        //validate email
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;

        //validate password regExp
        let strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{6,})");

        if(reg.test(userEmail) === false)
        {
            // this.refs.loading.close();
        // console.log("Email is Not Correct");
        Alert.alert('Failed',"Email is Not Correct"),[{text: 'Okay'}];
        // this.setState({email})
        return;
        }
        
        if(userPassword == '') {
            // this.refs.loading.close();
          Alert.alert('Failed', 'Password is required'),[
            {text: 'Okay'},
          ];
          return;
        }

        try {
            await fetch('http://10.0.0.44/orangecabs/app/signupapp.php', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: userName,
                mobile: userMobile,
                email: userEmail,
                password: userPassword,
                password2: userConfirmPassword,

            }),
            })
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson === 'ok'){
                    // alert(JSON.stringify(responseJson));
                    Alert.alert('Success','Account created successfully!'),[{text: 'Okay'}];
                    AsyncStorage.setItem('mobile',userMobile);
                    AsyncStorage.setItem('username',userName);
                    Actions.activatepass();

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

export default Signup;


