import React, { Component } from 'react';
import {Container,Header, Left, Body, Right, Text, Button,Footer, FooterTab,Content, Card, CardItem} from 'native-base';
export default class requestTripLocation extends React.Component{


   render(){
    return (
        <Content>
            <Card>
                <CardItem>
  
                    <Text>From: </Text><Text style={{paddingLeft:20,paddingRight:20}}>{this.props.pickup.pickUp}</Text>

                </CardItem>
                <CardItem>
                    <Text>To:</Text><Text style={{paddingLeft:40,paddingRight:20}}>{this.props.dropoff.dropOff}</Text>
         
                </CardItem>
                <CardItem>
                    <Text>Price: </Text><Text style={{paddingLeft:20,fontWeight:'bold'}}>ZAR </Text><Text style={{fontWeight:'bold'}}>{this.props.Price.price}</Text>
                    
                </CardItem>
            </Card>
        </Content>

    );
   }

}
