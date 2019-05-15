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
    KeyboardAvoidingView,
    Keyboard
} from 'react-native';
import {Container,Header, Left, Body, Right, Button,Footer, FooterTab,InputGroup, Input, CardItem} from 'native-base';
import stylesm from './ModalStyles';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from '../../Home/components/styles';
import { Actions } from 'react-native-router-flux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import RequestTripLocation from './requesttripLocation';
import Loading from 'react-native-whc-loading';
import moment from 'moment';

class Booknow extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        amountofrider: '',
        nameofonerider:'',
        datetimepicklocation:'',
        pickup:'',
        dropoff:'',
        price:'',
        isVisible: false,
        mobile:'',
        token:'',
        pickupLatitude:'',
        pickupLongitude:'',
        dropoffLatitude:'',
        dropoffLongitude:'',
        status:'',
        data:{},
        bookprice:'',
        bookdate:'',
        bookstatus:'',
        bookmobile:'',

      };
  }

    componentDidMount(){
        this.loadtrip()
        .done();
        this.getPrice().done();
    }

    loadtrip = async () => {

        let trips = await AsyncStorage.getItem('trips');
        let parsed = JSON.parse(trips);
        this.setState({pickup:parsed.data});
        this.setState({dropoff:parsed.data});
        this.setState({price:parsed.data});

        this.setState({mobile:parsed.data});
        this.setState({token:parsed.data});

    }

    getPrice = async () => {
        let price = await AsyncStorage.getItem('price');
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

    onChanged(text){
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < text.length; i++) {
            
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                alert("please enter number only");
            }
        }
        this.setState({ amountofrider: newText });
    };

    showDatePicker = () => {
        this.setState({isVisible:true});
   }

   handleDatePicker = (datetime) => {
    this.setState({
        isVisible:false,
        datetimepicklocation: moment(datetime).format('YYYY-MM-DD HH:mm')
        // MMMM, Do YYYY HH:mm
    });
    this.hideDatePicker();
   }

    hideDatePicker = () => {
        this.setState({
            isVisible:false,
            
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
                        <Text style={styles.headerText}>Complete booking</Text>
                        
                    </Body>
                    <Right> 
                        <Button transparent onPress={this.logout}> 
                            <Icon name="power-off" style={styles.icon}/>
                        </Button>
                    </Right>

                </Header>
                    <View style={stylesm.container}>
                    <ScrollView>
                    <KeyboardAvoidingView>
                        <Header>
                            <Body >
                            <Text style={[stylesm.buttonTextSignup, {color: '#6D6E70', marginTop:-28}]}>Complete Your  Booking Request Step 2/3</Text>   
                            </Body>
                        </Header>
                       <RequestTripLocation 
                            pickup={this.state.pickup}
                            dropoff={this.state.dropoff}
                            Price={this.state.price}
                            mobile={this.state.mobile}
                            email={this.state.email}
                            username={this.state.username}
                            pickupLatitude={this.state.pickupLatitude}
                            pickupLongitude={this.state.pickupLongitude}
                            dropoffLatitude={this.state.dropoffLatitude}
                            dropofflongitude={this.state.dropoffLongitude}
                            status={this.state.status}
                        />

                        <View style={stylesm.formContainer}>
                            <InputGroup>
                                <Input
                                    style={stylesm.textInputStyle}
                                    placeholder="Select date and time pick up"
                                    returnKeyType= {'next'}
                                    autoCapitalize= "none"
                                    autoCorrect= {false}
                                    onChangeText={(datepicklocation) => this.setState({datepicklocation})}
                                    value={this.state.datetimepicklocation}
                                    onFocus={this.showDatePicker}
                                
                                />
                                <Icon name="calendar" size={25} color="#FF5E3A"/>
                                <DateTimePicker
                                isVisible={this.state.isVisible}
                                onConfirm={this.handleDatePicker}
                                onCancel={this.hideDatePicker}
                                datePickerModeAndroid={'spinner'}
                                mode={'datetime'}
                                is24Hour={true}
                            />
                            </InputGroup>
                        
                            <View style={stylesm.textInputBottomLine} />

                           <InputGroup>
                                <Input
                                    style={stylesm.textInputStyle}
                                    placeholder="Amount of riders"
                                    keyboardType='numeric'
                                    returnKeyType= {'next'}
                                    autoCapitalize= "none"
                                    maxLength={1} 
                                    autoCorrect= {false}
                                    onChangeText={(text) => this.onChanged(text)}
                                    value={this.state.amountofrider}
                                />
                           </InputGroup>

                            <View style={stylesm.textInputBottomLine} />

                            <InputGroup>
                                <Input
                                    style={[stylesm.textInputStyle, {marginTop: 10}]}
                                    placeholder="Name of one rider"
                                    returnKeyType= "next"
                                    autoCapitalize= "none" 
                                    onChangeText={(nameofonerider)=> this.setState({nameofonerider})}
                                    value={this.state.nameofonerider}
                                />
                            </InputGroup>

                            <View style={stylesm.textInputBottomLine} />

                            <TouchableHighlight style={stylesm.button}
                                underlayColor="transparent"
                                onPress={() => this._book()}
                            >
                            <Text style={stylesm.buttonText}>Book and go</Text>
                            </TouchableHighlight>

                            <TouchableHighlight style={stylesm.buttonSignup}
                                underlayColor={'transparent'}
                                onPress={() => this._cancelBook()}
                            >
                                <Text style={[stylesm.buttonTextSignup, {color: '#fed136'}]}>Cancel</Text>
                            </TouchableHighlight>

                        </View>

                </KeyboardAvoidingView>
                <Loading 
                    ref="loading"
                    // image={require('../path/imagename.png')}
                    // backgroundColor='#ffffffF2'
                    borderRadius={5}
                    size={70}
                    imageSize={40}
                    indicatorColor='#11A0DC'
                    easing={Loading.EasingType.ease}
                />
                </ScrollView>
            </View>
            <Footer style={{marginTop:10}}>
                    <FooterTab style={stylesm.footerContainer} >

                       <Button vertical active onPress={() => Actions.home()}>
                            <Icon name="plus-circle" size={20} color={"#FF5E3A"} />
                            <Text style={{fontSize:12, color:"grey"}}>Book now</Text>
                        </Button>

                        <Button vertical onPress={() => Actions.viewtrip()}>
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

    _cancelBook = async () =>{
         this.refs.loading.show();
        setTimeout(() => {
            this.refs.loading.close();
            AsyncStorage.removeItem('trips');
            Actions.home();
          },2000);
    }

    _book = async () =>{

        this.refs.loading.show();

        let trips = await AsyncStorage.getItem('trips');
        let parsed = JSON.parse(trips);

        if(this.state.datetimepicklocation == '') {
            this.refs.loading.close();
            Alert.alert('Info', 'Select data and time of pickup location'),[
              {text: 'Okay'},
            ];
            return;
        }

        if(this.state.amountofrider == '') {
            this.refs.loading.close();
            Alert.alert('Info', 'Amount of rider is required'),[
            {text: 'Okay'},
            ];
            return;
        }

        if(this.state.nameofonerider == '') {
            this.refs.loading.close();
            Alert.alert('Info', 'Name is required'),[
            {text: 'Okay'},
            ];
            return;
        }
// 10.0.8.2,192.168.0.102
      fetch('http://10.0.0.44:3000/api/completeBook',{
          method: "POST",
          headers:{
              'Accept': 'application/json',
              'Content-type': 'application/json'
          },
          body:JSON.stringify({
                pickup:parsed.data.pickUp,
                dropoff: parsed.data.dropOff,
                price:parsed.data.price,
                token:parsed.data.token,
                mobile:parsed.data.mobile,
                nameofrider: this.state.nameofonerider,
                amountofrider:this.state.amountofrider,
                datePicker: this.state.datetimepicklocation,
                pickuplatitude:parsed.data.pickUpLatitude,
                pickuplongitude:parsed.data.pickUpLongitude,
                dropofflatitude:parsed.data.dropOffLatitude,
                dropofflongitude:parsed.data.dropOffLongitude,
                status:parsed.data.status
          })

      })
      .then((response) => response.json())
      .then((res) => {
          if(res.success = true){
            setTimeout(() => {
                this.refs.loading.close();
                AsyncStorage.removeItem('trips');
                AsyncStorage.setItem('bookings',JSON.stringify(res.results));
                Actions.viewtrip();
              },2000);
              
          }
          else{
            this.refs.loading.close();
              alert(res.message),[
                  {text: 'Okay'},
              ];
          }
      })
      .done();
      Keyboard.dismiss();
      this.refs.loading.close();

  }
}

export default Booknow;


