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
    AsyncStorage,
    Platform,
    TouchableOpacity,

} from 'react-native';
import {Container,Header, Left, Body, Right, Button,Footer, FooterTab,Content,List,ListItem,Switch} from 'native-base';
import { Actions } from 'react-native-router-flux';
import stylesv from './ViewTripStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../Home/components/styles';
import Modal from "../../Modal/component/paymentModal";
import HistoryModal from "../../Modal/component/historytripModal";
import TripPaid from "../../Modal/component/trippaid";
import HistoryPaymentModal from '../../Modal/component/historyPayment';


class ViewTrip extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isModalVisible: false,
            data:[],
            historydata:[],
            trippaid:[],
            paymenthistory:[]
          };
    }

    componentDidMount(){
        this.requestBooking()
        .done();
        this._alltrips();
        this._historyTrips();
        this._trippaid();
        this._paymenthistory();
    }

    requestBooking = async () => {

    let mobile = await AsyncStorage.getItem('mobile');
    let username = await AsyncStorage.getItem('name');
    let user_id1 = await AsyncStorage.getItem('user_id');
    // let id = user_id.toString();
    let email = await AsyncStorage.getItem('email');
    // alert(mobile);

    let booking = await AsyncStorage.getItem('booking');
    if(booking !== null){
        Alert.alert('Info','Hi '+username+ '!,Complete the last step for your booking request and move with us. Thank you!'),[{text:'Okay'}];
    // alert(booking);
    }
       
    };

    _alltrips = async () => {

        let mobile = await AsyncStorage.getItem('mobile');
// 10.0.11.13
        fetch('http://10.0.0.44:3000/api/alltrip',{
            method: "POST",
            headers:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body:JSON.stringify({mobile:mobile})
        })
        .then((response) => response.json())
        .then((res) =>{
            this.setState({
                data: res,
                // data: res
              });

            //   alert(this.state.data[2].departure);

        }).done();
    }

    _historyTrips = async () => {
        let mobile = await AsyncStorage.getItem('mobile');
// 10.0.11.13
        fetch('http://10.0.0.44:3000/api/historytrip',{
            method: "POST",
            headers:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body:JSON.stringify({mobile:mobile})
        })
        .then((response) => response.json())
        .then((res) =>{
            this.setState({
                historydata: res,
                // data: res
              });

            //   alert(this.state.data[2].departure);

        }).done(); 
    }

    _trippaid = async () => {
        let mobile = await AsyncStorage.getItem('mobile');
// 10.0.11.13
        fetch('http://10.0.0.44:3000/api/trippaid',{
            method: "POST",
            headers:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body:JSON.stringify({mobile:mobile})
        })
        .then((response) => response.json())
        .then((res) =>{
            this.setState({
                trippaid: res,
                // data: res
              });

            //   alert(this.state.data[2].departure);

        }).done(); 
    }

    _paymenthistory = async () =>{
        let mobile = await AsyncStorage.getItem('mobile');
// 10.0.11.13
        fetch('http://10.0.0.44:3000/api/paymentHistory',{
            method: "POST",
            headers:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
            },
            body:JSON.stringify({mobile:mobile})
        })
        .then((response) => response.json())
        .then((res) =>{
            this.setState({
                paymenthistory: res,
                // data: res
              });

            //   alert(this.state.data[2].departure);

        }).done(); 
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
       
        return(

            <Container>
                <Header style={{backgroundColor:"#11A0DC"}} 
                 iosBarStyle="light-content"
                 androidStatusBarColor="#F89D29"
                 >
                    <Left></Left>
                    <Body>
                        <Text style={styles.headerText}>Manage Trips</Text>
                        
                    </Body>
                    <Right> 
                        <Button transparent onPress={this.logout}> 
                            <Icon name="power-off" style={styles.icon}/>
                        </Button>
                    </Right>

                </Header>
                <View style={stylesv.container}>
                    <ScrollView>
                        <Modal data = {this.state.data}/>
                        <TripPaid trippaid = {this.state.trippaid}/>
                        <HistoryModal history = {this.state.historydata}/> 
                        <HistoryPaymentModal paymenthistory = {this.state.paymenthistory}/>                         
                        <Content>
                            <ListItem icon>
                                <Left>
                                <Button style={{ backgroundColor: "red" }}>
                                    <Icon active name="bell-o" color="#fff"/>
                                </Button>
                                </Left>
                                <Body>
                                    <TouchableHighlight style={[stylesv.buttonSignup,{alignItems:'flex-start'}]}
                                        underlayColor={'transparent'}
                                        onPress={this._toggleModal}
                                    >
                                        <Text style={{marginTop:-27}}>
                                       Notification 
                                        </Text>
                                    </TouchableHighlight>
                                </Body>
                                <Right>
                                    <TouchableHighlight style={stylesv.buttonSignup}
                                        underlayColor={'transparent'}
                                        onPress={this._toggleModal}
                                    >
                                        <Text style={{marginTop:-27,backgroundColor:"#11A0DC",borderRadius:100,borderColor:"#fed136",borderWidth:1,padding:3,color:"#fff"}}>
                                            0
                                        </Text>
                                    </TouchableHighlight>
                                </Right>
                            </ListItem>
                        </Content>
                    </ScrollView>
                </View>

                <Footer>
                    <FooterTab style={styles.footerContainer} >
                        <Button vertical onPress={() => Actions.home()} >
                            <Icon name="plus-circle" size={20} color={"#FF5E3A"} />
                            <Text style={{fontSize:12, color:"grey"}}>Book now</Text>
                        </Button>
                        <Button vertical active
                            onPress={() => Actions.viewtrip()}>
                            <Icon name="eye" size={20} color={"#FF5E3A"} />
                            <Text style={{fontSize:12, color:"grey"}}>View Trips</Text>
                        </Button>
                        <Button vertical onPress={() => Actions.help()}>
                            <Icon active name="question" size={20} color={"#FF5E3A"} />
                            <Text style={{fontSize:12, color:"grey"}}>Help</Text>
                        </Button>
                        <Button vertical onPress={() => Actions.message()}>
                            <Icon name="envelope-o" size={20} color={"#FF5E3A"} />
                            <Text style={{fontSize:12, color:"grey"}}>Message</Text>
                        </Button>

                    </FooterTab>
		        </Footer>
            </Container>

        );
    }
}

export default ViewTrip;


