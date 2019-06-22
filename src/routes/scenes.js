import React from 'react';
import {Scene, Actions,Drawer} from 'react-native-router-flux';
import HomeContainer from './Home/containers/homeContainer';
import AccueilApp from './AccueilApp/container';
import Signup from './Riders/Signup/container';
import LoginRider from './Riders/Login/container';
import LoginDriver from './Drivers/Login/container';
import ForgotPassword from './Riders/ForgotPassword/container';
import Driver from './Drivers/container/DriverContainer';
import ResetPassword from './Riders/ResetPassword/container';
import ActivatePassword from './Riders/Activate/container';
import ViewTrip from './viewtrips/container/ViewTripContainer';
import Help from './Help/container';
import Message from './Message/container/MessageContainer';
import Profile from './Profile/container/ProfileContainer';
import Modal from './Modal/container/ModalContainer';
import Icon from 'react-native-vector-icons/MaterialIcons';

//drawer
import Sidebar from './sidebar/container';

const TabIcon = ({focused, iconName}) => {
    var color = focused ? '#F89D29' : '#7f8c8d';
    return (
        <Icon name={iconName} color={color} size={30} style={{height: 30, width:30}} />
    )
}

const MenuIcon = () => {
    return (
        <Icon name='menu' size={30} color="#fff" style={{marginTop:-40}}/>
    )
}
const scenes = Actions.create(
    <Drawer key="drawer" drawer contentComponent={Sidebar} drawerIcon={MenuIcon} drawerWidth={300}>
      <Scene key="root">
        <Scene key="home" component={HomeContainer} navTransparent/>
        <Scene key="accueil" component={AccueilApp} title="accueil"  drawer={false} initial={true} hideNavBar/>
        <Scene key="signup" component={Signup} title="signup" drawer={false} initial={false} hideNavBar/>
        <Scene key="logrider" component={LoginRider} title="Login Rider" drawer={false} initial={false} hideNavBar/>
        <Scene key="logdriver" component={LoginDriver} title="Login Driver" drawer={false} initial={false} hideNavBar/>
        <Scene key="forgotpassword" component={ForgotPassword} title="Forgot Password" drawer={false} initial={false} hideNavBar/>
        <Scene key="driver" component={Driver} title="Driver Home"/>
        <Scene key="resetpass" component={ResetPassword} title="Reset Password" drawer={false} initial={false} hideNavBar/>
        <Scene key="activatepass" component={ActivatePassword} title="Activate Password" drawer={false} initial={false} hideNavBar/>
        <Scene key="viewtrip" component={ViewTrip} navTransparent/>
        <Scene key="help" component={Help} navTransparent/>
        <Scene key="message" component={Message} navTransparent/>
        <Scene key="profile" component={Profile} navTransparent/>
        <Scene key="modal" component={Modal} navTransparent/>
        {/* <Scene key="Login" drawer={false} component={Login} initial={true} hideNavBar/>
        <Scene key="Anasayfa" component={Anasayfa} title="Anasayfa" initial={false} renderLeftButton={null} />
        <Scene key="Cari" component={Cari} title="Cari" />
        <Scene key="Siparis" component={Siparis} title="Siparis" />
        <Scene key="Fatura" component={Fatura} title="Fatura" /> */}
      </Scene>
    </Drawer>
 
    // <Scene key="root" hideNavBar>
    //     <Scene key="home" component={HomeContainer} title="Home" />
    //     <Scene key="accueil" component={AccueilApp} title="accueil"  initial/>
    //     <Scene key="signup" component={Signup} title="signup" />
    //     <Scene key="logrider" component={LoginRider} title="Login Rider"/>
    //     <Scene key="logdriver" component={LoginDriver} title="Login Driver"/>
    //     <Scene key="forgotpassword" component={ForgotPassword} title="Forgot Password"/>
    //     <Scene key="driver" component={Driver} title="Driver Home"/>
    //     <Scene key="resetpass" component={ResetPassword} title="Reset Password"/>
    //     <Scene key="activatepass" component={ActivatePassword} title="Activate Password"/>
    //     <Scene key="viewtrip" component={ViewTrip} title="View trips"/>
    //     <Scene key="help" component={Help} title="Help ?"/>
    //     <Scene key="message" component={Message} title="Message"/>
    //     <Scene key="modal" component={Modal} title="Complete your booking"/>

        /* <Scene 
        initial
            key="drawer"
            drawer
            contentComponent={Sidebar}
            // hideNavBar
            // drawerIcon={MenuIcon}
            // drawerWidth={300}
 
        >
           <Scene key="home" component={HomeContainer} title="Home" /> 
            <Scene key="help" component={Help} title="Help ?" />
            <Scene key="message" component={Message} title="Message"/>

        </Scene> */
    /* </Scene> */
);

export default scenes;