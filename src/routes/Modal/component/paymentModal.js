import React, {Component} from 'react';
import {
  Modal, 
  Text, 
  TouchableHighlight, 
  View, Alert,FlatList,ScrollView,
  KeyboardAvoidingView,
  Image,
  TouchableWithoutFeedback,
  Dimensions,
  Platform
} from 'react-native';
import {
  Content, 
  Card, 
  CardItem,
  Left,
  Right,
  Body,
  Button,
  // ListItem,
  Header, 
  Form,
} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
import stylesp from './ModalStyles';
import styles from '../../Home/components/styles';
import stylesv from '../../viewtrips/component/ViewTripStyles';
import moment from 'moment';
import { Actions } from 'react-native-router-flux';
import { ListItem } from 'react-native-elements'
import { Divider } from 'react-native-elements';

class ModalPayment extends Component {
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
        title: 'Pay And God last step',
        icon: 'av-timer',
        // icon: 'flight-takeoff'
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
                        <Button transparent 
                          onPress={() => {this.setModalVisible(!this.state.modalVisible);}}
                        >
                            <Icon name="chevron-left" style={styles.icon}/>
                        </Button>
                    </Left>
                    <Body>
                        <Text style={styles.headerText}>Pay Your Trip!</Text>
                        
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
                  this.props.data ?
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
                                        // onPress={() => {
                                        //   this.setModalVisible(!this.state.modalVisible);
                                        // }}
                                        >
                                        <Text transparent value={item.trip_id}> 
                                          <Icon name="trash" color="red" style={{fontSize:25}}/>  
                                        </Text>
                                </TouchableHighlight>

                                <TouchableHighlight
                                      // onPress={() => {s
                                      //   this.setModalVisible(!this.state.modalVisible);
                                      // }}
                                >
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
                      :this.state.message
                  }

                  <TouchableHighlight
                    onPress={() => {this.setModalVisible(!this.state.modalVisible);}}
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
        {/* <Divider style={{ backgroundColor: '#11A0DC' }} /> */}
        </View>
      </View>
    );
  }  

}

export default ModalPayment;