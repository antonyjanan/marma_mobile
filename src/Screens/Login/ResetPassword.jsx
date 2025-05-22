// screens/ResetPasswordScreen.js
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ToastAndroid,
} from 'react-native';

const ResetPasswordScreen = ({route, navigation}) => {
  const {email} = route.params || {};
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = () => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    setPasswordError('');
    return true;
  };

  const handleResetPassword = () => {
    if (validatePassword()) {
      fetch(
        'https://healthyfresh.lunarsenterprises.com/fishapp/reset-password',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      )
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            navigation.navigate('Login');
            ToastAndroid.show(data.message, ToastAndroid.SHORT);
          } else {
            ToastAndroid.show(data.message, ToastAndroid.SHORT);
            console.log(data.message, 'error in category response');
          }
        })
        .catch(error => {
          console.log(error, 'error');
        });
    }
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <View style={styles.backArrow} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Text style={styles.titleText}>Reset Password</Text>
          <Text style={styles.subtitleText}>
            Create a new password for your account
          </Text>

          <View style={styles.inputContainer}>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter new password"
                placeholderTextColor="#888"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}>
                <Text style={styles.eyeIcon}>{showPassword ? '👁️' : '👁️‍🗨️'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Confirm new password"
                placeholderTextColor="#888"
                secureTextEntry={!showConfirmPassword}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                <Text style={styles.eyeIcon}>
                  {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
                </Text>
              </TouchableOpacity>
            </View>

            {passwordError ? (
              <Text style={styles.errorText}>{passwordError}</Text>
            ) : null}

            <Text style={styles.passwordHintText}>
              Password must be at least 8 characters
            </Text>
          </View>

          <TouchableOpacity
            style={styles.resetButton}
            onPress={handleResetPassword}>
            <Text style={styles.resetButtonText}>Reset Password</Text>
          </TouchableOpacity>
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
    marginTop: 40,
    justifyContent: 'center',
  },
  backButton: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    width: 15,
    height: 15,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderColor: '#000',
    transform: [{rotate: '-45deg'}],
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    color: '#222',
    marginBottom: 12,
  },
  subtitleText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingLeft: 20,
    backgroundColor: '#fff',
    marginBottom: 16,
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
  },
  eyeButton: {
    padding: 10,
  },
  eyeIcon: {
    fontSize: 20,
    color: '#888',
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginBottom: 8,
  },
  passwordHintText: {
    fontSize: 12,
    color: '#888',
    marginBottom: 20,
  },
  resetButton: {
    height: 50,
    // backgroundColor: '#FF0000',
    backgroundColor: '#213E60',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    paddingBottom: 20,
    alignItems: 'center',
  },
  indicator: {
    width: 120,
    height: 4,
    backgroundColor: '#000',
    borderRadius: 2,
  },
});

export default ResetPasswordScreen;
