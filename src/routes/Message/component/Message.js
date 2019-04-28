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
    AsyncStorage
} from 'react-native';
import {Container,Header, Left, Body, Right, Button,Footer, FooterTab} from 'native-base';
import stylesm from './MessageStyles';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';


const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

// import { GiftedChat } from 'react-native-gifted-chat'

class MessageApp extends React.Component {
  state = {
    messages: [],
  }

  // componentWillMount() {
  //   this.setState({
  //     messages: [
  //       {
  //         _id: 1,
  //         text: 'Hello developer',
  //         createdAt: new Date(),
  //         user: {
  //           _id: 2,
  //           name: 'React Native',
  //           avatar: 'https://placeimg.com/140/140/any',
  //         },
  //       },
  //     ],
  //   })
  // }

  // onSend(messages = []) {
  //   this.setState(previousState => ({
  //     messages: GiftedChat.append(previousState.messages, messages),
  //   }))
  // }

  render() {
    return (
      // <GiftedChat
      //   messages={this.state.messages}
      //   onSend={messages => this.onSend(messages)}
      //   user={{
      //     _id: 1,
      //   }}
      // />
      <View><Text>Message</Text></View>
    )
  }
}
export default MessageApp;

