import React, {Component} from 'react';
import {
  Modal, 
  Text, 
  TouchableHighlight, 
  View, Alert,FlatList,ScrollView,
  KeyboardAvoidingView,
  // Plateform
} from 'react-native';
import {Content, Card, CardItem,Left,Right,Body,Button,ListItem,Header} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesp from './ModalStyles';
import styles from '../../Home/components/styles';
import stylesv from '../../viewtrips/component/ViewTripStyles';

import moment from 'moment';
import { Actions } from 'react-native-router-flux';

class HistoryPaymentModal extends Component {
    state = {
      modalVisible: false,
      // selected: (new Map(): Map<string, boolean>)
    };
  
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
                          <Text style={styles.headerText}>History Payments</Text>
                          
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
                this.props.paymenthistory &&
                <FlatList 
                    data={this.props.paymenthistory}
                    renderItem={({item}) => 
                      
                          <Content>
                            <Card>
                                <CardItem>         
                                    <Text style={{fontWeight:'bold'}}>From: </Text><Text style={{paddingLeft:10,paddingRight:20}}>{item.trip_id}{item.departure}</Text>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                    <Text style={{fontWeight:'bold'}}>To:</Text>
                                    </Left>
                                    <Body>
                                    <Text style={{alignItems:'flex-start',marginTop:15,marginLeft:-70}}>{item.destination}</Text>
                                    </Body>
                                    <Right>
                                      <TouchableHighlight
                                          onPress={() => {
                                            this.setModalVisible(!this.state.modalVisible);
                                          }}>
                                          <Button transparent onPress={this.logout}> 
                                            <Icon name="trash" color="red" style={{fontSize:20}}/>  
                                          </Button>
                                        </TouchableHighlight>
                                    </Right>
                                </CardItem>
                                
                                <CardItem>
                                    <Left>
                                      <Text style={{fontWeight:'bold'}}>Date: </Text>
                                    </Left>
                                    <Body>
                                      <Text style={{alignItems:'flex-start',marginTop:15,marginLeft:-70}}>{moment(item.date).format('MMMM, Do YYYY HH:mm')}</Text>
                                    </Body>
                                    <Right>
                                      <TouchableHighlight
                                        onPress={() => {
                                          this.setModalVisible(!this.state.modalVisible);
                                        }}>
                                        <Button transparent onPress={this.logout}> 
                                          <Icon name="pencil-square-o" color="green" style={{fontSize:20}}/>  
                                        </Button>
                                      </TouchableHighlight>
                                    </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                      <Text style={{fontWeight:'bold'}}>Price: </Text>
                                    </Left>
                                   <Body>
                                      <Text style={{alignItems:'flex-start',fontWeight:'bold',marginTop:15,marginLeft:-70}}>ZAR {item.price}</Text>
                                   </Body>
                                   <Right>
                                   <TouchableHighlight
                                      onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                      }}>
                                      <Button transparent onPress={this.logout}> 
                                        <Icon name="credit-card" color="blue" style={{fontSize:20}}/>  
                                      </Button>
                                    </TouchableHighlight>
                                   </Right>
                                </CardItem>
                                <CardItem>
                                    <Left>
                                      <Text style={{fontWeight:'bold'}}>Status: </Text>
                                    </Left>
                                   <Body>
                                      <Text style={{alignItems:'flex-start',marginTop:15,marginLeft:-70}}>{item.status_pay}</Text>
                                   </Body>
                                   <Right>
                                   <TouchableHighlight
                                      onPress={() => {
                                        this.setModalVisible(!this.state.modalVisible);
                                      }}>
                                      <Button transparent onPress={this.logout}> 
                                        <Icon name="trash" color="red" style={{fontSize:20}}/>  
                                      </Button>
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
              <Button style={{ backgroundColor: "green" }}>
                  <Icon active name="history" color="#fff"/>
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
                      History Payments
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
                      GO 
                      </Text>
                  </TouchableHighlight>
              </Right>
          </ListItem>
        </Content>
      </View>
    );
  }
}

export default HistoryPaymentModal;