import {combineReducers} from 'redux';
import {HomeReducer as home} from '../routes/Home/modules/home';
import {AccueilReducer as accueil} from '../routes/AccueilApp/accueilReducer';
import {LoginRiderReducer as logrider} from '../routes/Riders/Login/Reducer';
import {SignupRiderReducer as signup} from '../routes/Riders/Signup/Reducer';
import {LoginDriverReducer as logdriver} from '../routes/Drivers/Login/Reducer';
import {DriverReducer as driver} from '../routes/Drivers/module/driver';
import {ForgotPassReducer as forgotpassword} from '../routes/Riders/ForgotPassword/Reducer';
import {ResetPasswordReducer as resetpass} from '../routes/Riders/ResetPassword/Reducer';
import {ActivatePasswordReducer as activatepass} from '../routes/Riders/Activate/Reducer';
import {ViewTripReducer as viewtrip} from '../routes/viewtrips/module/ViewTrip';
import {HelpReducer as help} from '../routes/Help/Reducer';
import {MessageReducer as message} from '../routes/Message/module/Message';
import {ModalReducer as modal} from '../routes/Modal/module/modal';
import {SidebarReducer as drawer} from '../routes/sidebar/Reducer';


export const MakeRootReducer = () => {
    return combineReducers({
        home,
        accueil,
        signup,
        logrider,
        logdriver,
        driver,
        forgotpassword,
        resetpass,
        activatepass,
        viewtrip,
        help,
        message,
        modal,
        drawer
    });
}

export default MakeRootReducer;