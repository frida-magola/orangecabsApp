import React from 'react';
import {
    Text, 
    View,
    ScrollView,
    Alert,
    TextInput,
    Dimensions,
    TouchableHighlight,
    Image,
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import styles from './LoginStyles';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export const Inputs = ({
    getInputData
}) => {
    function handleInput(key, val){
        getInputData({
            key,
            value: val
        });
    }
    return(

        <View style={styles.container}>
        <ScrollView>

            <View style={{height: deviceHeight, width: deviceWidth, alignItems: 'center', justifyContent: 'center'}}>

            <View style={styles.imageContainer}>
                <Image
                resizeMode="contain"
                source={require('../../../../assets/img/logo.png')}
                style={styles.image}
                />
            </View>

            <View>
                <Text style={[styles.buttonTextSignup, {color: '#6D6E70'}]}>Welcome Back Rider!</Text>
            </View>

            <View style={styles.formContainer}>
                <TextInput
                    style={styles.textInputStyle}
                    placeholder="Mobile number"
                    returnKeyType= {'next'}
                    autoCapitalize= "none"
                    autoCorrect= {false}
                    keyboardType='numeric'
                    onChangeText={handleInput.bind(this, "mobile")}
                    // value={this.state.myNumber}
                    maxLength={10}  
                    //setting limit of input
                    //   onSubmitEditing={(event) => {
                    //     this.refs.passwordTextInputRef.focus();
                    //   }}
                    //   onChangeText={(usernameInputTxt) => this.setState({usernameInputTxt})}
                    //   value={this.state.usernameInputTxt}
                />

                <View style={styles.textInputBottomLine} />

                <TextInput
                    // ref="passwordTextInputRef"
                    style={[styles.textInputStyle, {marginTop: 10}]}
                    placeholder="Password"
                    returnKeyType= "go"
                    autoCapitalize= "none"
                    secureTextEntry= {true}
                    autoCorrect={false}
                    onChangeText={handleInput.bind(this, "password")}
                    //   onChangeText={(passwordInputTxt) => this.setState({passwordInputTxt})}
                    //   value={this.state.passwordInputTxt}
                    //   onSubmitEditing={(event) => {
                    //     this._submit();
                    //   }}
                />

                <View style={styles.textInputBottomLine} />

                <TouchableHighlight style={styles.button}
                underlayColor="transparent"
                //   onPress={() => this._submit()}
                >
                <Text style={styles.buttonText}>Log In</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonSignup}
                underlayColor={'transparent'}
                onPress={() => Actions.forgotpassword()
                    // {Alert.alert('Info', 'Forgot password clicked'),[
                    //   {text: 'Okay'},
                    // ];}
                    }
                >
                <Text style={[styles.buttonTextSignup, {color: '#6D6E70'}]}>Forgot Password?</Text>
                </TouchableHighlight>

                <TouchableHighlight style={styles.buttonSignup}
                    underlayColor={'transparent'}
                    onPress={() => Actions.signup()
                    // {Alert.alert('Info', 'Don\'t have account clicked'),[
                    //   {text: 'Okay'},
                    // ];}
                    }
                >
                <Text style={[styles.buttonTextSignup, {color: '#6D6E70'}]}>Don't have account? Click here</Text>
                </TouchableHighlight>
                <TouchableHighlight style={styles.buttonSignup}
                underlayColor={'transparent'}
                onPress={() => Actions.accueil()
                    // {Alert.alert('Info', 'Don\'t have account clicked'),[
                    //   {text: 'Okay'},
                    // ];}
                    }
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
};
export default Inputs;