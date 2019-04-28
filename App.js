// import {createStackNavigator, createAppContainer} from 'react-navigation';
import React from 'react';
import Root from './src/main';
import { View, StyleSheet } from 'react-native';

export default class App extends React.Component{

  render(){
    return(
      <View style={styles.container}>
        <Root {...this.props} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }

});