import React, { useContext, useEffect, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BottomtabHome from '../Screens/Home/BottomtabHome';
import { AuthContext } from '../Context/AuthContext';
import LoginScreen from '../Screens/Login/login/LoginScreen';
import VerificationCodeScreen from '../Screens/Login/login/VerificationCodeScreen';
import SignupScreen from '../Screens/Login/Registeration/SignupScreen';
import Registervarificationscreen from '../Screens/Login/Registeration/Registervarificationscreen';
import Roleselection from '../Screens/Roleselection/Roleselection';
import Home from '../Screens/Dashboard/Home';
import Detail_view_Screen from '../Screens/Dashboard/DetailsView_Screen/Detail_view_Screen';
import Splashscreen from '../Screens/Login/Splashscreen';
import TherapistSearchScreen from '../Screens/TherapistSearchScreen/TherapistSearchScreen';
import NotificationsScreen from '../Screens/Notification/Notification';
import EditProfileScreen from '../Screens/Profile/EditProfileScreen';
import ContactUsScreen from '../Screens/Profile/ContactUsScreen';
import PrivacyPolicyScreen from '../Screens/Profile/PrivacyPolicyScreen';
import Chatscreen from '../Screens/Chat/Chatscreen';
import HowToWorkScreen from '../Screens/Profile/HowToWorkScreen';


const Stack = createStackNavigator();
const AuthStack = createStackNavigator();

function AuthStackScreen() {
  console.log('Authstack');

  return (
    <AuthStack.Navigator initialRouteName="Roleselection">
      <AuthStack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{ headerShown: false }}
      />

      <AuthStack.Screen
        name="VerificationCodeScreen"
        component={VerificationCodeScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="SignupScreen"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Registervarificationscreen"
        component={Registervarificationscreen}
        options={{ headerShown: false }}
      />


      <AuthStack.Screen
        name="Roleselection"
        component={Roleselection}
        options={{ headerShown: false }}
      />


    </AuthStack.Navigator>
  );
}

function AppStackScreen() {
  return (
    <Stack.Navigator initialRouteName="BottomtabHome">
      <Stack.Screen
        name="BottomtabHome"
        component={BottomtabHome}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detail_view_Screen"
        component={Detail_view_Screen}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="Notification"
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="search"
        component={TherapistSearchScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ContactUsScreen"
        component={ContactUsScreen}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={{ headerShown: false }}
      />


      <Stack.Screen
        name="Chatscreen"
        component={Chatscreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="HowToWorkScreen"
        component={HowToWorkScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const Routes = () => {
  const { userToken, loading } = useContext(AuthContext);
  const [isSplashVisible, setIsSplashVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsSplashVisible(false);
    }, 6000);

    return () => clearTimeout(timer);
  }, []);

  if (isSplashVisible) {
    return <Splashscreen />;
  }
  console.log(userToken, 'userTokasdasden');

  return userToken == null ? <AuthStackScreen /> : <AppStackScreen />;
};

export default Routes;
