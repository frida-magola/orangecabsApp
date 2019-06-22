import React, {Component} from 'react';
import {
  Modal, 
  Text, 
  TouchableHighlight, 
  View, Alert,FlatList,ScrollView,
  KeyboardAvoidingView,
  // Plateform
} from 'react-native';
import {Content, Card, CardItem,Left,Right,Body,Button,Header} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesp from './ModalStyles';
import styles from '../../Home/components/styles';
import stylesv from '../../viewtrips/component/ViewTripStyles';
import { ListItem } from 'react-native-elements'

import moment from 'moment';
import { Actions } from 'react-native-router-flux';

class HistoryTripModal extends Component {
  state = {
    modalVisible: false,
    message:'You have not taken a trip yet.'
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    const list = [
      {
        title: ' History Trip',
        icon: 'history'
      },
    ]
    const message = [
      {
        title: ' You have not taken a trip yet.',
        icon: 'av-timer'
      },
    ]
    return (
      <View style={{marginTop:0}}>
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
                          <Text style={styles.headerText}>History Trip</Text>
                         
                      </Body>
                      <Right>
                          <Button transparent onPress={this.logout}> 
                              <Icon name="power-off" style={styles.icon}/>
    
                          </Button>
                      </Right>

                  </Header>
                
              <View>
                <ScrollView>
                  <KeyboardAvoidingView>
                    {
                      this.props.historydata ?
                      <FlatList 
                          data={this.props.historydata}
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
                                            <Icon name="trash" color="red" style={{fontSize:22}}/>  
                                          </Button>
                                       </TouchableHighlight>
                                   </Right>
                                </CardItem>
                            </Card>
                          </Content>                       
                  }
                />
                  :message.map((item, i) => (
                    <ListItem
                      key={i}
                      title={item.title}
                      leftIcon={{ name: item.icon }}
                    />
                  ))
              }

                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);}}
                    style={[stylesp.button,{marginLeft:40}]}
                    >
                    <Text>Previous</Text>
                  </TouchableHighlight>
                </KeyboardAvoidingView>
                </ScrollView>
              </View>
                
            </View>
        </Modal>

        <View>
        {
          list.map((item, i) => (
            <ListItem
              key={i}
              title={item.title}
              leftIcon={{ name: item.icon }}
              onPress={() => {this.setModalVisible(true);}}
            />
          ))
        }
        </View>
      </View>
    );
  }
}

export default HistoryTripModal;