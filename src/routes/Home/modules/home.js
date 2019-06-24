import update from 'react-addons-update';
import constants from './actionConstants';
import {Dimensions,AsyncStorage, Alert} from 'react-native';
import RNGooglePlaces from 'react-native-google-places';
import request from "../../../util/request";
import calculateFare from "../../../util/fareCalculator";
import { Actions } from 'react-native-router-flux';

//----------------------------
//Constants
//-----------------------------
const {
    GET_CURRENT_LOCATION, 
    GET_INPUT, 
    TOGGLE_SEARCH_RESULT,
    GET_ADDRESS_PREDICTIONS,
    GET_SELECTED_ADDRESS,
    GET_DISTANCE_MATRIX,
    GET_FARE,
    BOOK_CAR
} = constants;

const {width,height} = Dimensions.get("window");

const ASPECT_RATIO = width / height;

const LATITUDE_DELTA = 0.0922;

const LONGITUDE_DELTA = ASPECT_RATIO * LATITUDE_DELTA;

//----------------------------
//Actions
//-----------------------------

export function getCurrentLocation(){
    return (dispatch)=> {
        navigator.geolocation.getCurrentPosition(
            (position)=> {
                dispatch({
                    type:GET_CURRENT_LOCATION,
                    payload:position
                });
            },
            (error) => console.log(error.message),
            {enableHighAccuracy:true, timeout:20000, maximumAge:1000}
        );
    }
}

//GET USER INPUT
export function getInputData(payload){
    return{
        type:GET_INPUT,
        payload
    }
}

//toggle search result modal
export function toggleSearchResultModal(payload){
    return{
        type:TOGGLE_SEARCH_RESULT,
        payload
    }
}

//GET ADDRESS FROM GOOGLE PLACE
export function GetAddressPredictions(){
    return (dispatch, store)=>{
        let userInput = store().home.resultType.pickUp ? store().home.inputData.pickUp : store().home.inputData.dropOff;
        RNGooglePlaces.getAutocompletePredictions(userInput, {
            // type: 'cities',
            country: 'ZA'
        })
        .then((results) => {
        //   console.log(results);
            dispatch({
                type:GET_ADDRESS_PREDICTIONS,
                payload:results
            })
          })
           .catch(error => console.log(error.message));
    };
}

//Get selected address
export function getSelectedAddress(payload){
      const dummyNumbers = {
        baseFare:5.00, 
        timeRate:0.75, 
        distanceRate:7.50,
        surge:1
    }
    return (dispatch, store) => {
        RNGooglePlaces.lookUpPlaceByID(payload)
            .then(results=>{
                dispatch({
                    type:GET_SELECTED_ADDRESS,
                    payload:results
                })
            })
            .then(() => {
                //get the distance and time
                if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
                    request.get("https://maps.googleapis.com/maps/api/distancematrix/json")
                    .query({
                        origins: store().home.selectedAddress.selectedPickUp.location.latitude +","+ store().home.selectedAddress.selectedPickUp.location.longitude,
                        destinations: store().home.selectedAddress.selectedDropOff.location.latitude +","+ store().home.selectedAddress.selectedDropOff.location.longitude,
                        travelMode: 'DRIVING',
                        key:"AIzaSyB-1SZLcvFN_cxb2HXrmtf7EhfA2O94SUs"
                    })
                    .finish((error, res) =>{
                        dispatch({
                            type:GET_DISTANCE_MATRIX,
						    payload:res.body
                        })
                    })
                }
                setTimeout(()=>{
                    if(store().home.selectedAddress.selectedPickUp && store().home.selectedAddress.selectedDropOff){
                        const fare = calculateFare(
                            dummyNumbers.baseFare,
                            dummyNumbers.timeRate,
                            store().home.distanceMatrix.rows[0].elements[0].duration.value,
                            dummyNumbers.distanceRate,
                            store().home.distanceMatrix.rows[0].elements[0].distance.value,
                            dummyNumbers.surge

                        );
                        dispatch({
                            type:GET_FARE,
                            payload:fare
                        })

                    }
                },1000)
            })
            .catch(error=>console.log(error.message))
    }
}

//book car 
export function bookCar() {
    return async (dispatch,store)  => {

        let mobile = await AsyncStorage.getItem('mobile');
        let token = await AsyncStorage.getItem('token');

        const payload = { 
                data:{
                    mobile:mobile,
                    token: token,
                    pickUp: store().home.selectedAddress.selectedPickUp.address,
                    pickUpLatitude: store().home.selectedAddress.selectedPickUp.location.latitude,
                    pickUpLongitude: store().home.selectedAddress.selectedPickUp.location.longitude,
                    price:store().home.fare,
                    dropOff: store().home.selectedAddress.selectedDropOff.address,
                    dropOffLatitude: store().home.selectedAddress.selectedDropOff.location.latitude,
                    dropOffLongitude: store().home.selectedAddress.selectedDropOff.location.longitude,
                    status:"unpaid"
                }
        };

        request.post("http://10.0.0.44:3000/api/bookings")
        // request.post("http://10.0.11.13:3000/api/bookings")
        .send(payload)
        .finish((error,res) => {
            dispatch({
                type:BOOK_CAR,
                payload:res.body    
            });

            AsyncStorage.setItem('trips',JSON.stringify(payload));
            Actions.modal();
            
        });

    }
}

// ----------------------------
// Actions handlers
// -----------------------------
function handleGetCurrentLocation(state,action) {
    return update(state,{
        region: {
            latitude: {
                $set:action.payload.coords.latitude
            },
            longitude: {
                $set:action.payload.coords.longitude
            },
            latitudeDelta:{
                $set:LATITUDE_DELTA
            },
            longitudeDelta: {
                $set:LONGITUDE_DELTA
            }
        }
    });
}

function handleGetInputData(state,action) {
    const {key, value} = action.payload
    return update(state,{
        inputData: {
            [key]: {
                $set:value
            }
        }
    });
}

function handleToggleSearchResultModal(state,action) {
    if(action.payload === "pickUp"){
        return update(state,{
            resultType: {
                pickUp: {
                    $set: true
                },
                dropOff: {
                    $set: false
                }
            },
            predictions:{
                $set:{}
            }
           
        });
    }
    if(action.payload === "dropOff"){
        return update(state,{
            resultType: {
                pickUp: {
                    $set: false
                },
                dropOff: {
                    $set: true
                }
            },
            predictions:{
                $set:{}
            }
        });
    }
}

function handleGetAddressPredictions(state,action){
    return update(state,{
        predictions: {
           $set:action.payload 
        }
    })
}

function handleGetSelectedAddress(state,action) {
    let selectTitle = state.resultType.pickUp ? "selectedPickUp" : "selectedDropOff";
    return update(state,{
        selectedAddress: {
            [selectTitle]:{
                $set:action.payload
            }
        },
        resultType:{
            pickUp: {
                $set:false
            },
            dropOff: {
                $set:false
            }
        }
    });
}

function handleGetDistanceMatrix(state,action){
    return update(state,{
        distanceMatrix: {
            $set:action.payload
        }
    });
}

//handler fare
function handleGetFare(state,action){
    return update(state,{
        fare:{
            $set:action.payload
        }
    });
}

//handler book car
function handlerBookCar(state,action){
    return update(state,{
        booking:{
            $set:action.payload
        }
    })
}

//----------------------------
//const handlers
//-----------------------------
const ACTION_HANDLERS = {
    GET_CURRENT_LOCATION: handleGetCurrentLocation,
    GET_INPUT: handleGetInputData,
    TOGGLE_SEARCH_RESULT: handleToggleSearchResultModal,
    GET_ADDRESS_PREDICTIONS:handleGetAddressPredictions,
    GET_SELECTED_ADDRESS:handleGetSelectedAddress,
    GET_DISTANCE_MATRIX:handleGetDistanceMatrix,
    GET_FARE:handleGetFare,
    BOOK_CAR:handlerBookCar
};

const initialState = {
    region:{},
    inputData:{},
    resultType:{},
    selectedAddress:{}
};

export function HomeReducer(state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type];
    return handler ? handler(state, action) : initialState;
}