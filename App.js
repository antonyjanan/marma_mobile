import React from 'react';
import 'react-native-gesture-handler'; // Ensure this is at the top
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes/Routes'; // Make sure the path is correct

import { Text, View } from 'react-native';

const App = () => {
  return (


    <NavigationContainer>
      <Routes />

    </NavigationContainer>

  );
};

export default App;
