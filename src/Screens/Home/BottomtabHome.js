import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';

import Categorylist from '../Category/Categorylist';
import My_Order from '../Profile_Screen/My_Order/My_Order';
import Cart from '../Cart_Screen/Cart';

// Import your images
const homeIcon = require('../../assets/images/Fishimage/home.png'); // Adjust paths based on your project
const categoryIcon = require('../../assets/images/Fishimage/Category.png');
const cartIcon = require('../../assets/images/Fishimage/Cart.png');
const profileIcon = require('../../assets/images/Fishimage/Profile.png');

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
            case 'Category':
              iconSource = categoryIcon;
              break;
            case 'Cart':
              iconSource = cartIcon;
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
        tabBarActiveTintColor: '#1E90FF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
      initialRouteName="Home">
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Category" component={Categorylist} />
      <Tab.Screen name="Cart" component={Cart} />
      <Tab.Screen name="Profile" component={HomeScreen} />
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
