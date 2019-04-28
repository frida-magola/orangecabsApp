import React from 'react';
import {View, Text, Image,Button,StyleSheet} from 'react-native';
import {Container} from 'native-base';

class Driver extends React.Component {

    render(){
        return(
             <Container>
                
                <View style={styles.container}>
                
                    <View style={styles.InputDriverContainer}>
                        <Text>Home Driver</Text>
                    </View>

                </View>


             </Container>
        );
    }
}

export default Driver;

const styles = StyleSheet.create({
    container:{
        alignItems:"center"
    },
    InputDriverContainer:{
        color:"orange"
    }
});