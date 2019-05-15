import React from 'react';
import {View, Dimensions } from 'native-base';
import MapView,{PROVIDER_GOOGLE} from 'react-native-maps';
import styles from './MapContainerStyles.js';
import SearchBox from '../searchbox'
import SearchResult from '../searchResult'
// import MapViewDirections from 'react-native-maps-directions';

export const MapContainer = ({
    region, 
    getInputData, 
    toggleSearchResultModal, 
    GetAddressPredictions,
    resultType,
    predictions,
    getSelectedAddress,
    selectedAddress
}) => {

    return(
        <View style={styles.container}>
            <MapView
                provider = {PROVIDER_GOOGLE}
                style={styles.map}
                region={region}
            >
                {/* <MapViewDirections
                    origin={origin}
                    destination={destination}
                    apikey={GOOGLE_MAPS_APIKEY}
                /> */}
               <MapView.Marker coordinate={region} pinColor="orange"/> 
            </MapView>

            <SearchBox 
                    getInputData={getInputData} 
                    toggleSearchResultModal={toggleSearchResultModal} 
                    GetAddressPredictions={GetAddressPredictions}
                    selectedAddress={selectedAddress}
            />
            {(resultType.pickUp || resultType.dropOff) &&
                <SearchResult predictions={predictions} getSelectedAddress={getSelectedAddress}/>
            }
        </View>
    );
}
export default MapContainer;