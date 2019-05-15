import React, {Component} from 'react';
import {
  Modal, 
  Text, 
  TouchableHighlight, 
  View, Alert,FlatList,ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  Plateform
} from 'react-native';
import {Content, 
  Card, CardItem,Left,Right,Body,
  Button,ListItem,Header, Form,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesp from './ModalStyles';
import styles from '../../Home/components/styles';
import stylesv from '../../viewtrips/component/ViewTripStyles';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
// import Swipeout from 'react-native-swipeout';
// import LongPressForAndroidSwipeout from 'react-native-swipeout-longpressforandroid'


//Payment require it globaly in the project
// global.PaymentRequest = require('react-native-payments').PaymentRequest;

class ModalPayment extends Component {

    state = {
      modalVisible: false,
      data:{},
      activeRowKey:null
    };

    componentDidMount(){
      this.props.data;
      alert(this.props.data);
    }

    _onPress = () => {
      this.props.onPressItem(this.props.id);
    };

    handleSelectItem = () => {
      this.setState({activeRowKey:this.props.data.trip_id})
    }

  //payfast integration
  // click_f614bc6458f2c5ba0ef9d8317bbed0da( aform_reference ) {
  //       var aform = aform_reference;
  //       aform['amount'].value = Math.round( aform['amount'].value*Math.pow( 10,2 ) )/Math.pow( 10,2 );
  //       aform['custom_amount'].value = aform['custom_amount'].value.replace( /^\s+|\s+$/g,"" );
  //       if( !aform['custom_amount'].value || 0 === aform['custom_amount'].value.length || /^\s*$/.test( aform['custom_amount'].value ) ) {
  //           alert ( 'An amount is required' );
  //           return false;
  //       }
  //       aform['amount'].value = Math.round( aform['custom_amount'].value*Math.pow( 10,2 ) )/Math.pow( 10,2 );
  // }

//   _paynow = async () =>{
//     fetch('https://www.payfast.co.za/eng/process',{
//             method: "POST",
//             headers:{
//               'Accept': 'application/json',
//               'Content-type': 'application/json'
//             },
//             body:JSON.stringify({
//               "data":{
//                 "response":{
//                   "token":"a3b3ae55-ab8b-b388-df23-4e6882b86ce0",
//                   "amount":"1628",
//                   "cycles":"14",
//                   "cycles_complete":"9",
//                   "frequency":"3",
//                   "status":"1",
//                   "run_date":"2016-07-04"
//                 }
//               }
//               // cmd:"_paynow",
//               // receiver:"13334945",
//               // item_name:"Pay Now And Make Your Trip / Orange cabs",
//               // amount:"120",
//               // item_description:"",
//               // return_url:Actions.viewtrip(),
//               // cancel_url:Actions.modal()


//             })
//         })
//         .then((response) => response.json())
//         .then((res) =>{
//           if(res.return_url = true){
//             Actions.driver();
//           }
//           else{
//             Actions.viewtrip();
//           }

//         }).done();
// }
  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View >
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
            <View style={{marginTop: 0}}>
              <Header style={{backgroundColor:"#11A0DC"}} iosBarStyle="light-content">
                      <Left>
                          <Button transparent onPress={()=>this.setModalVisible(!this.state.modalVisible)}>
                              <Icon name="chevron-left" style={styles.icon}/>
                          </Button>
                      </Left>
                      <Body>
                          <Text style={styles.headerText}>Unpaid  trips</Text>
                          
                      </Body>
                      <Right>
                          <Button transparent onPress={this.logout}> 
                              <Icon name="power-off" style={styles.icon}/>
          
                          </Button>
                      </Right>

                  </Header>
                <ScrollView>
                  <KeyboardAvoidingView>
              {
                this.props.data &&
                <FlatList 
                    data={this.props.data}
                     // keyExtractor={item => item.trip_id}
                  // keyExtractor={(item, index) => index+"" }
                  ItemSeparatorComponent={this.renderSeparator}
                  keyExtractor={(item, index) => index.toString()}
                    renderItem={({item}) => 
                    <Content>
                    <Card>
                        <CardItem onPress={(event)=>this._selectedItem(item.text)}>
                        <Body>
                        <Text style={{fontWeight:'bold'}} key={item.trip_id}>From: {item.departure}</Text>
                          <Text style={{fontWeight:'bold',marginTop:10,marginLeft:0}}>To: {item.destination}</Text>
                          <Text style={{fontWeight:'bold'}}>Date: {moment(item.date).format('MMMM, Do YYYY HH:mm')}</Text>
                          <Text style={{fontWeight:'bold'}}>Price: ZAR {item.price}</Text>
                          
                        </Body>
                        <Right>
                          <TouchableHighlight
                                    onPress={() => {
                                      this.setModalVisible(!this.state.modalVisible);
                                    }}>
                                    <Text transparent value={item.trip_id}> 
                                      <Icon name="trash" color="red" style={{fontSize:25}}/>  
                                    </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                                  onPress={() => {s
                                    this.setModalVisible(!this.state.modalVisible);
                                  }}>
                                  <Text transparent value={item.trip_id}> 
                                  <Icon name="pencil-square-o" color="green" style={{fontSize:25}}/>  
                                </Text>
                            </TouchableHighlight>

                            <TouchableHighlight
                              underlayColor="transparent"
                              onPress={() => this._paynow()}
                            >
                                <Image 
                                    source={{uri:"https://www.payfast.co.za/images/buttons/light-small-paynow.png"}}
                                    style={{width:165,height:36}}
                                />
                            </TouchableHighlight>
                        </Right>

                        </CardItem>
                    </Card>
                  </Content>   
                      
                  }
                />

              }
                <View>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);}}
                    style={[stylesp.button,{marginLeft:40}]}
                    >
                    <Text>Previous</Text>
                  </TouchableHighlight>
                </View>
                </KeyboardAvoidingView>
              </ScrollView>
            </View>
        </Modal>

        <Content>
          <ListItem icon>
              <Left>
              <Button style={{ backgroundColor: "#FF9501" }}>
                  <Icon active name="car" color="#fff"/>
              </Button>
              </Left>
              <Body>
                  <TouchableHighlight style={[stylesv.buttonSignup,{alignItems:'flex-start'}]}
                      underlayColor={'transparent'}
                      onPress={() => {
                        this.setModalVisible(true);
                      }}
                  >
                      <Text style={{marginTop:-27}}>
                      Complete and Manage your booking request 
                      </Text>
                  </TouchableHighlight>
              </Body>
              <Right>
                  <TouchableHighlight style={stylesv.buttonSignup}
                      underlayColor={'transparent'}
                      onPress={() => {
                        this.setModalVisible(true);
                      }}
                  >
                      <Text style={{marginTop:-27}}>
                      View 
                      </Text>
                  </TouchableHighlight>
              </Right>
          </ListItem>
        </Content>
      </View>
    );
  }
}

export default ModalPayment;