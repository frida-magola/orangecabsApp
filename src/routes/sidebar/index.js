import React, { Component } from "react";
import { Image, AsyncStorage,FlatList ,View} from "react-native";
import {
  Content,
  Text,
  List,
  ListItem,
  Icon,
  Container,
  Left,
  Right,
  Badge,
  CardItem,
  Thumbnail
} from "native-base";
import styles from "./style";
import { Actions } from "react-native-router-flux";

const drawerCover = require("../../../assets/drawer-cover.png");
const avatar = require("../../../assets/contacts/user.png");
const datas = [
  {
    name: "Book now",
    route: "HomeContainer",
    icon: "plus",
    bg: "#C5F442"
  },
  {
    name: "View Trips",
    // route: "Header",
    icon: "eye",
    bg: "#477EEA",
    types: "11"
  },
  {
    name: "My Trips",
    // route: "Footer",
    icon: "arrow-down",
    bg: "#DA4437",
    types: "4"
  },
  {
    name: "Payments",
    // route: "NHAccordion",
    icon: "repeat",
    bg: "#C5F442",
    types: "5"
  },
  {
    name: "Message",
    // route: "NHBadge",
    icon: "notifications",
    bg: "#4DCAE0"
  },
  {
    name: "Profile",
    // route: "NHButton",
    icon: "radio-button-off",
    bg: "#1EBC7C",
    // types: "9"
  },
  {
    name: "Help",
    // route: "NHCard",
    icon: "help-buoy",
    bg: "#B89EF5",
    // types: "8"
  },
  {
    name: "Logout",
    // route: "NHCheckbox",
    icon: "checkmark-circle",
    bg: "#EB6B23"
  },
  {
    name: "Share",
    // route: "NHDatePicker",
    icon: "calendar",
    bg: "#EB6B23"
  }
];

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shadowOffsetWidth: 1,
      shadowRadius: 4,
      username:"",
      email:"",
    };
  }

  componentDidMount(){
    this.loadInitialState()
    .done();
    this.user();

}

loadInitialState = async () => {
    let mobile = await AsyncStorage.getItem("mobile");
    // let userInfor = await AsyncStorage.getItem("userInfos");
    let token = await AsyncStorage.getItem("token");
    this.setState({token:token});
    // this.setState({userInfo:userInfor.userInfo});
    // alert(this.state.userInfo);

}

    // get user info
    user = async () =>{
      let token = await AsyncStorage.getItem("token");
      let mobile = await AsyncStorage.getItem("mobile");
      if(token != null){
        await fetch("http://127.0.0.1/orangecabs/app/user_details.php",{
            method:"POST",
            headers:{
              Accept:"application/json",
              "Content-Type":"application/json"
            },
            body:JSON.stringify({
              token:token
            })
          }).then((response)=>response.json())
              .then((responseJson)=>{
                // this.setState({userInfo:JSON.stringify(responseJson)});
                AsyncStorage.setItem("userInfos",JSON.stringify(responseJson));
                // alert(JSON.stringify(responseJson));
              }).catch((error)=>{console.log(error)})
      }
    }

_logout = async () => {

    let mobile = await AsyncStorage.getItem("mobile");
    let token = await AsyncStorage.getItem("token");

    await fetch("http://10.0.0.44/orangecabs/app/logoutapp.php",{
            method: "POST",
            headers:{
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            body:JSON.stringify({
                mobile:mobile,
                token:token
            })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            if(responseJson === "ok"){
                AsyncStorage.removeItem("mobile");
                AsyncStorage.removeItem("userInfos");
                AsyncStorage.removeItem("token");
                Actions.accueil();
            }else{
              Alert.alert("Failed",JSON.stringify(responseJson)),[{text: "Okay"}];
            }
        }).catch((error) => {
          alert("Try later or check your network!");
          console.error(error);
      });
  }

  render() {
    return (
      <Container>
        <Content
          bounces={false}
          style={{ flex: 1, backgroundColor: "#fff", top: -1 }}
        >
          {/* <Image source={drawerCover} style={styles.drawerCover} /> */}
          {/* <Image square style={styles.drawerImage} source={drawerImage} /> */}

          <View style={{ flex: 1, backgroundColor: "#3498db", justifyContent:"center", alignItems:"center",paddingBottom:15, paddingTop:15}}>
              <Thumbnail source={avatar} large  style={{marginTop:35}}/>
              <Text style={{color:"#fff", fontSize:15,paddingBottom:3}}>Nyira Vigne</Text>
              <Text style={{color:"#fff", fontSize:15, }}>Mwalila@gmail.com</Text>

              {/* {
                this.props.userInfo &&
                <FlatList 
                    data={this.props.userInfo}
                    renderItem={({item}) => 
                      
                          <Content>
                            <Card>
                                <CardItem>         
                                    <Text style={{fontWeight:"bold"}}>Username: </Text><Text style={{paddingLeft:10,paddingRight:20}}>{item.username}</Text>
                                </CardItem>
                                <CardItem>         
                                    <Text style={{fontWeight:"bold"}}>Email Address: </Text><Text style={{paddingLeft:10,paddingRight:20}}>{item.email}</Text>
                                </CardItem>

                            </Card>
                          </Content>                       
                  }
                />

              } */}
          </View>
          

          <List>

            <ListItem 
              button
              noBorder
              onPress={() => Actions.home()}
            >
                <Left>
                  <Icon
                    active
                    name="add"
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    Book now
                  </Text>
                </Left>
                  {/* <Right style={{ flex: 1 }}>
                    <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: "#C5F442"
                      }}
                    >
                    </Badge>
                  </Right> */}
              </ListItem>

              <ListItem
                button
                noBorder
                onPress={() => Actions.viewtrip()}
              >
                <Left>
                  <Icon
                    active
                    name="eye"
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    Your Trips
                  </Text>
                </Left>

                  <Right style={{ flex: 1 }}>
                    {/* <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: "yellow"
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >1</Text>
                    </Badge> */}
                  </Right>
              </ListItem>

              <ListItem
                button
                noBorder
                onPress={() => Actions.help()}
              >
                <Left>
                  <Icon
                    active
                    name="question"
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    Help
                  </Text>
                </Left>
                
                  <Right style={{ flex: 1 }}>
                    {/* <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: "#14353d"
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >23</Text>
                    </Badge> */}
                  </Right>
              </ListItem>

              <ListItem
                button
                noBorder
                onPress={() => Actions.viewtrip()}
              >
                <Left>
                  <Icon
                    active
                    name="bookmarks"
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    Payment
                  </Text>
                </Left>
                  <Right style={{ flex: 1 }}>
                    {/* <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: "#f1c40f"
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >23</Text>
                    </Badge> */}
                  </Right>
              </ListItem>

              <ListItem
                button
                noBorder
                onPress={() => Actions.message()}
              >
                <Left>
                  <Icon
                    active
                    name="notifications"
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    Message
                  </Text>
                </Left>

                  <Right style={{ flex: 1 }}>
                    {/* <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: "#e74c3c"
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >12</Text>
                    </Badge> */}
                  </Right>
              </ListItem>

              <ListItem
                button
                noBorder
                onPress={() => Actions.profile()}
              >
                <Left>
                  <Icon
                    active
                    name="person"
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>
                    Profile
                  </Text>
                </Left>
                  <Right style={{ flex: 1 }}>
                    {/* <Badge
                      style={{
                        borderRadius: 3,
                        height: 25,
                        width: 72,
                        backgroundColor: "blue"
                      }}
                    >
                      <Text
                        style={styles.badgeText}
                      >user</Text>
                    </Badge> */}
                  </Right>
              </ListItem> 

              <ListItem
                button
                noBorder
                onPress={() => this._logout()}
              >
                <Left>
                  <Icon
                    active
                    name="refresh"
                    style={{ color: "#777", fontSize: 26, width: 30 }}
                  />
                  <Text style={styles.text}>Logout</Text>
                </Left>
              </ListItem> 

          </List>

        </Content>
      </Container>
    );
  }
}

export default SideBar;
