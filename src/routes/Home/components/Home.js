import React from 'react';
import {View, Text,AsyncStorage,Modal,Alert, Dimensions } from 'react-native';
import MapContainer from './MapContainer';
import {Container,Header, Left, Body, Right, Button,Footer, FooterTab} from 'native-base';
import Fare from './Fare';
import BooknowBtn from './FloatingActionBtn';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import styles from './styles';

class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userMobile: '',
            userPassword: '',
            token:'',
            userInfo:[],
            
        };
    }

    componentDidMount(){
        this.props.getCurrentLocation();
        this.loadInitialState()
        .done();
        this.user();
    
    }
    
    loadInitialState = async () => {
        let mobile = await AsyncStorage.getItem('mobile');
        let token = await AsyncStorage.getItem('token');
        this.setState({token:token});
       
        //Available trip
            let trips = await AsyncStorage.getItem('trips');
            if(trips !== null){
                Actions.modal();
            }
    
    }
    
        // get user info
        user = async () =>{
          let token = await AsyncStorage.getItem('token');
          if(token != null){
            await fetch('http://127.0.0.1/orangecabs/app/user_details.php',{
                method:"POST",
                headers:{
                  Accept:'application/json',
                  'Content-Type':'application/json'
                },
                body:JSON.stringify({
                  token:token
                })
              }).then((response)=>response.json())
                  .then((responseJson)=>{
                    // this.setState({userInfo:JSON.stringify(responseJson)});
                    AsyncStorage.setItem('userInfos',JSON.stringify(responseJson));
                    // alert(JSON.stringify(responseJson));
                  }).catch((error)=>{console.log(error)})
          }
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

    render(){
       
        const region = {
            latitude: -33.924870,
            longitude: 18.424055,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        }

        return(
             <Container>
                 <Header style={{backgroundColor:"#11A0DC"}} 
                 iosBarStyle="light-content"
                 androidStatusBarColor="#F89D29"
                 >
                    <Left></Left>
                    <Body>
                        <Text style={styles.headerText}>Book now</Text>
                        
                    </Body>
                    <Right> 
                        <Button transparent onPress={this.logout}> 
                            <Icon name="power-off" style={styles.icon}/>
                        </Button>
                    </Right>

                </Header>

                 {this.props.region.latitude &&
                    <MapContainer 
                        region={this.props.region} 
                        getInputData={this.props.getInputData}
                        toggleSearchResultModal={this.props.toggleSearchResultModal}
                        GetAddressPredictions={this.props.GetAddressPredictions}
                        resultType={this.props.resultType}
                        predictions={this.props.predictions}
                        getSelectedAddress={this.props.getSelectedAddress}
                        selectedAddress={this.props.selectedAddress}
                    />
                    
                 } 

                 {/* action button*/}
                 {
                     this.props.fare &&
                     <BooknowBtn onPressAction={()=>this.props.bookCar()}/> 
                 }
                 
                 {/* fare */}
                 {
                     this.props.fare && 
                     <Fare fare={this.props.fare}/>
                     
                 }

                 <Footer>
                    <FooterTab style={styles.footerContainer} >

                        {/* <Button vertical active onPress={() => Actions.home()}>
                            <Icon name="plus" size={20} color={"#F89D29"} />
                            <Text style={{fontSize:12, color:"grey"}}>Book now</Text>
                        </Button> */}

                        {/* <Button vertical onPress={() => Actions.viewtrip()}>
                            <Icon name="eye" size={20} color={"#F89D29"} />
                            <Text style={{fontSize:12, color:"grey"}}>View Trips</Text>
                        </Button> */}
                        <Button vertical onPress={() => Actions.help()}>
                            <Icon active name="question" size={20} color={"#F89D29"} />
                            <Text style={{fontSize:12, color:"grey"}}>Help</Text>
                        </Button>
                        <Button vertical onPress={() => Actions.message()}>
                            <Icon name="envelope-o" size={20} color={"#F89D29"} />
                            <Text style={{fontSize:12, color:"grey"}}>Message</Text>
                        </Button>

                    </FooterTab>
		        </Footer>
                
             </Container>
        );
    }

}

export default Home;