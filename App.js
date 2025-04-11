import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {StatusBar} from 'react-native';
import Routes from './src/routes/Routes';
import {AuthProvider} from './src/Context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        {/* <StatusBar barStyle="dark-content" backgroundColor="#fff" /> */}
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
