
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from '../auth/AuthNavigator';
import { RootStackParamList} from '../types';
import SplashScreen from '../../screens/splash';
import ChooseProfileType from '../../screens/chooseprofiletype';
import ChooseLanguage from '../../screens/chooselanguage';
import PersonalProfile from '../../screens/personalprofile';
import BusinessProfile from '../../screens/businessprofile';
import EditProfile from '../../screens/editprofile';
import Profile from '../../screens/profile';
import BottomTabs from '../app/bottom/BottomTabs';
import SubscriptionModal from '../../component/Subscriptionmodal';


const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen">
         <Stack.Screen name="SplashScreen" component={SplashScreen}/>
         <Stack.Screen name="Auth" component={AuthNavigator} />
           <Stack.Screen name="ChooseLanguage" component={ChooseLanguage} />
        <Stack.Screen name="ChooseProfileType" component={ChooseProfileType} />
        <Stack.Screen name="PersonalProfile" component={PersonalProfile} />
        <Stack.Screen name="BusinessProfile" component={BusinessProfile} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="EditProfile" component={EditProfile}/>
         <Stack.Screen name="MainTabs" component={BottomTabs} />
<Stack.Screen name="SubscriptionModal" component={SubscriptionModal} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
