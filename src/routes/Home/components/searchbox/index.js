import React from 'react';
import { Text } from 'react-native';
import styles from './searboxStyles';
import {View,InputGroup, Input} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';

export const SearchBox = ({getInputData, toggleSearchResultModal, GetAddressPredictions, selectedAddress}) => {

    const {selectedPickUp,selectedDropOff} = selectedAddress || {};
    function handleInput(key, val){
        getInputData({
            key,
            value: val
        });
        GetAddressPredictions();
    }
        return(
            <View style={styles.searchBox}>
                <View style={styles.inputWrapper}>
                    <InputGroup>
                        <Icon name="ios-locate" size={20} color="#F89D29"/>
                        <Input 
                            onFocus={()=>toggleSearchResultModal("pickUp")}
                            style={styles.inputSearch}
                            placeholder="Pick up location"
                            onChangeText={handleInput.bind(this, "pickUp")}
                            value={selectedPickUp && selectedPickUp.name}
                        />
                    </InputGroup>
                </View>
                <View style={styles.secondInputWrapper}>
                    <InputGroup>
                        <Icon name="ios-search" size={20} color="#F89D29"/>
                        <Input
                            onFocus={()=>toggleSearchResultModal("dropOff")} 
                            style={styles.inputSearch}
                            placeholder="Drop off location"
                            onChangeText={handleInput.bind(this, "dropOff")}
                            value={selectedDropOff && selectedDropOff.name}
                        />
                    </InputGroup>
                </View>
            </View>
        );
}

export default SearchBox;