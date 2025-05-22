import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGetOTP = () => {
    navigation.navigate('VerificationCodeScreen', {
      phoneNumber: phoneNumber,
    });
    console.log('Getting OTP for:', phoneNumber);
  };

  const handleCreateAccount = () => {
    navigation.navigate('SignupScreen');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="red" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            {/* Back arrow icon */}
            <View style={styles.backArrow} />

            <Image
              source={require('../../../assets/images/marmasset/Back.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.welcomeText}>Welcome Back..!</Text>
          <Text style={styles.subtitleText}>
            Continue your journey to heal, help, or learn{'\n'}with just one
            tap.
          </Text>

          <View style={styles.illustrationContainer}>
            <Image
              source={require('../../../assets/images/marmasset/Loging.png')}
              style={styles.illustrationmain}
              resizeMode="contain"
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              placeholderTextColor="#888"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
            />
          </View>

          <TouchableOpacity style={styles.otpButton} onPress={handleGetOTP}>
            <Text style={styles.otpButtonText}>Get OTP</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <View style={styles.accountRow}>
            <Text style={styles.accountText}>Don't have an account ? </Text>
            <TouchableOpacity onPress={handleCreateAccount}>
              <Text style={styles.createAccountText}>Create an account</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    height: 50,
    justifyContent: 'center',
    marginTop: 20,
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#222',
    marginBottom: 8,
  },
  subtitleText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  illustrationContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  illustration: {
    width: 35,
    height: 35,
  },

  illustrationmain: {
    width: 175,
    height: 175,
  },

  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 20,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  otpButton: {
    height: 50,
    backgroundColor: '#FF0000',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  otpButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  accountRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  accountText: {
    fontSize: 14,
    color: '#666',
  },
  createAccountText: {
    fontSize: 14,
    color: '#FF0000',
    fontWeight: '600',
  },
  indicator: {
    width: 120,
    height: 4,
    backgroundColor: '#000',
    borderRadius: 2,
  },
});

export default LoginScreen;
