import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Icon,
  List,
  ListItem,
  Text
} from "native-base";
import { AsyncStorage } from "react-native";
import {Actions } from 'react-native-router-flux';
import Icons from 'react-native-vector-icons/FontAwesome';
import styles from '../Home/components/styles';

const datas = [
  {
    route: "AccordionDefault",
    text: "Default Accordion"
  },
  {
    route: "AccordionIcon",
    text: "Icon and Expanded Icon"
  },
  {
    route: "AccordionIconStyle",
    text: "Icon and Expanded Icon style"
  },
  {
    route: "AccordionHeaderContentStyle",
    text: "Header and Content style"
  },
  {
    route: "AccordionCustomHeaderContent",
    text: "Custom Header and Content"
  }
];

class NHAccordion extends Component {
  // navigate(){
  //   Actions.drawer();
  // }

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
                <Text style={styles.headerText}>Help</Text>                        
            </Body>
            <Right> 
                <Button transparent onPress={this.logout}> 
                    <Icons name="power-off" style={styles.icon}/>
                </Button>
            </Right>
        </Header>

        <Content style={{ backgroundColor: "white" }}>
          <List
            dataArray={datas}
            renderRow={data =>
              <ListItem
                button
                onPress={() => this.props.navigation.navigate(data.route)}
              >
                <Left>
                  <Text>
                    {data.text}
                  </Text>
                </Left>
                <Right>
                  <Icon name="arrow-forward" style={{ color: "#999" }} />
                </Right>
              </ListItem>}
          />
        </Content>
      </Container>
    );
  }
}

export default NHAccordion;
