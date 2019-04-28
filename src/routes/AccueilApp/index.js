import React, { Component } from "react";
import { ImageBackground, View, StatusBar,AsyncStorage, Image} from "react-native";
import { Container, Button, H3, Text } from "native-base";
import { Actions } from "react-native-router-flux";

import styles from "./styles";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo.png");

class Home extends Component {

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
        Actions.home();
    }
    // if(username !== null){
    //   this.props.navigation.navigate("RiderLogin");
    // }
}
render(){
  return(
       <Container>
      <View style={styles.logoContainer}>
    <Image source={launchscreenLogo} style={styles.logo}/>
  </View>
  {/* <ImageBackground source={launchscreenBg} style={styles.imageContainer}> */}
    <View style={{alignItems:"center",}}>
    <H3 style={styles.text}>Welcome to orangecabs</H3>
    </View>
    <View
      style={{
        alignItems: "center",
        marginBottom: 50,
        backgroundColor: "transparent"
      }}
    >

      <View style={{ marginTop: 0 }} />
      <H3 style={styles.text}>Taking pride in our rides...</H3>
      <View style={{ marginTop: 8 }} />

      </View>

      <View style={{ marginBottom: 40 ,textAlign:"center"}}>
        <Button
          style={{ backgroundColor: "#11A0DC", alignSelf: "center" ,width:"90%",textAlign:"center"}}
          onPress={() => Actions.logrider()}
        >
          <Text style={{textAlign:"center"}}>Sign In Rider</Text>
        </Button>
      </View>
      <View style={{ marginBottom: 80 }}>
        <Button
          style={{ backgroundColor: "#F89D29", alignSelf: "center",width:"90%" }}
          onPress={() => Actions.logdriver()}
        >
          <Text style={{textAlign:"center"}}>Sign In Driver</Text>
        </Button>
      </View>

       </Container>
  );
}
}

export default Home;
