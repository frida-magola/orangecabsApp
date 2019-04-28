import {connect} from 'react-redux';
import Home from '../components/Home';
import {
    getCurrentLocation, 
    getInputData,
    toggleSearchResultModal,
    GetAddressPredictions,
    getSelectedAddress,
    bookCar
} from '../modules/home';

const mapStateTopProps = (state) => ({
    region: state.home.region,
    inputData: state.home.inputData || {},
    resultType: state.home.resultType || {},
    predictions: state.home.predictions || [],
    selectedAddress: state.home.selectedAddress || {},
    fare: state.home.fare,
    booking: state.home.booking || {}
});

const mapActionCreators = {
    getCurrentLocation,
    getInputData,
    toggleSearchResultModal,
    GetAddressPredictions,
    getSelectedAddress,
    bookCar
};

export default connect(mapStateTopProps,mapActionCreators)(Home);