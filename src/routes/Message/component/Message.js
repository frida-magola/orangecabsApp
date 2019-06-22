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
    AsyncStorage
} from 'react-native';
import {Container,Header, Left, Body, Right, Button,Footer, FooterTab} from 'native-base';
import styles from '../../Home/components/styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class MessageApp extends React.Component {
  state = {
    messages: [],
  }

  _logout = async () => {
    
    let mobile = await AsyncStorage.getItem('mobile');
    let token = await AsyncStorage.getItem('token');

    await fetch('http://10.0.0.44/orangecabs/app/logoutapp.php',{
            method: "POST",
            headers:{
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body:JSON.stringify({
                mobile:mobile,
                token:token
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson === 'ok'){
                AsyncStorage.removeItem('mobile');
                AsyncStorage.removeItem('userInfos');
                AsyncStorage.removeItem('token');
                Actions.accueil();
            }else{
              Alert.alert('Failed',JSON.stringify(responseJson)),[{text: 'Okay'}];
            }
        }).catch((error) => {
          alert("Try later or check your network!");
          console.error(error);
      });
  }

  render() {
    return (
      <Container>
        <Header style={{backgroundColor:"#11A0DC"}} 
          iosBarStyle="light-content"
          androidStatusBarColor="#F89D29">
            <Left></Left>
            <Body>
                <Text style={styles.headerText}>Message</Text>                        
            </Body>
            <Right> 
                <Button transparent onPress={this.logout}> 
                    <Icon name="power-off" style={styles.icon}/>
                </Button>
            </Right>
        </Header>

        <View style={styles.Container}>
          <Text>Message</Text>
        </View>
      </Container>
    );
  }
}
export default MessageApp;

