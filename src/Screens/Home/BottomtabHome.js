import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Dashboard/Home';
import Detail_view_Screen from '../Dashboard/DetailsView_Screen/Detail_view_Screen';
import SearchComponent from '../../Component/SearchComponent/SearchComponent';
import Booking from '../Bookings/Booking';
import TherapistSearchScreen from '../TherapistSearchScreen/TherapistSearchScreen';
import ProfileScreen from '../Profile/ProfileScreen';


// Import your images
const homeIcon = require('../../assets/images/marmasset/home.png'); // Adjust paths based on your project
const calendar = require('../../assets/images/marmasset/calendar.png');
const search = require('../../assets/images/marmasset/search.png');
const profileIcon = require('../../assets/images/marmasset/user.png');

const Tab = createBottomTabNavigator();

const BottomtabHome = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({color, size}) => {
          let iconSource;
          switch (route.name) {
            case 'Home':
              iconSource = homeIcon;
              break;
            case 'Bookings':
              iconSource = calendar;
              break;
            case 'Search':
              iconSource = search;
              break;
            case 'Profile':
              iconSource = profileIcon;
              break;
            default:
              iconSource = homeIcon;
          }

          return (
            <Image
              source={iconSource}
              style={{width: size, height: size, tintColor: color}}
            />
          );
        },
        tabBarActiveTintColor: '#FE0000',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Bookings" component={Booking} />
      <Tab.Screen name="Search" component={TherapistSearchScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default BottomtabHome;
