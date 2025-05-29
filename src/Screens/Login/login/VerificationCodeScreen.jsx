import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import {useState, useEffect, useRef, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  Keyboard,
  Image,
  StatusBar,
  Modal,
  ActivityIndicator,
} from 'react-native';

import {AuthContext} from '../../../Context/AuthContext';
import {verify_otp} from '../../../Component/api/apiService';
import SuccessModal from '../../../Component/toastConfig/SuccessModal';

const VerificationCodeScreen = ({route}) => {
  const navigation = useNavigation();
  const {setUserToken, setUser_id} = useContext(AuthContext);

  const {UserToken} = useContext(AuthContext);

  const {phoneNumber} = route.params;
  const [code, setCode] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const inputRefs = useRef([]);
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    console.log('UserToken from AuthContext:', UserToken);
  }, [UserToken]);

  // Keyboard visibility listener
  useEffect(() => {
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );
    return () => {
      keyboardDidShow.remove();
      keyboardDidHide.remove();
    };
  }, []);

  const handleCodeChange = (text, index) => {
    if (text.length > 1) {
      text = text.slice(-1);
    }

    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto focus next
    if (text !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleBackspace = index => {
    if (index > 0 && code[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    const verificationCode = code.join('').trim();

    if (verificationCode.length !== 4) {
      setErrorMessage('Please enter the full 4-digit OTP.');
      setShowSuccess(true);
      return;
    }

    setLoading(true);
    setErrorMessage('');
    setShowSuccess(false);

    const payload = {
      email: phoneNumber,
      otp: verificationCode,
    };

    try {
      const res = await verify_otp(payload);

      if (res?.result) {
        setUserToken(res.token);
        setUser_id(res.u_id);

        setShowSuccess(true);

        // navigation.navigate('BottomtabHome');
      } else {
        const errorMsg = res?.message || 'Invalid OTP. Please try again.';
        setErrorMessage(errorMsg);
        setShowSuccess(true);
        console.warn('OTP Verification Failed:', errorMsg);
      }
    } catch (err) {
      console.error('OTP Verification Error:', err);
      setErrorMessage('Invalid OTP. Please try again.');
      setShowSuccess(true);
    } finally {
      setLoading(false);
    }
  };

  const goToCreateAccount = () => {
    navigation.navigate('SignupScreen');
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  useEffect(() => {
    if (showSuccess && errorMessage) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
        setErrorMessage('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess, errorMessage]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="red" />
      <TouchableOpacity style={styles.backButton} onPress={goBack}>
        <View style={styles.backButtonCircle}>
          <Image
            source={require('../../../assets/images/marmasset/Back.png')}
            style={styles.illustrationbackarrow}
            resizeMode="contain"
          />
        </View>
        <Text>Phone Number: {phoneNumber}</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Just One Step Away..!</Text>
        <Text style={styles.subtitle}>
          We've sent a code to your phone. Enter it to proceed.
        </Text>

        <View style={styles.illustrationContainer}>
          <KeyIllustration />
        </View>

        <View style={styles.codeInputContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={ref => (inputRefs.current[index] = ref)}
              style={styles.codeInput}
              value={digit}
              onChangeText={text => handleCodeChange(text, index)}
              keyboardType="number-pad"
              maxLength={1}
              onKeyPress={({nativeEvent}) => {
                if (nativeEvent.key === 'Backspace') {
                  handleBackspace(index);
                }
              }}
            />
          ))}
        </View>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Go Ahead</Text>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account? </Text>
        <TouchableOpacity onPress={goToCreateAccount}>
          <Text style={styles.createAccountText}>Create an account</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showSuccess} transparent animationType="fade">
        <SuccessModal
          onClose={handleCloseSuccess}
          title={errorMessage || 'Request Sent Successfully!'}
          emoji="❗"
          buttonText="Close"
        />
      </Modal>
    </SafeAreaView>
  );
};

const KeyIllustration = () => (
  <View style={styles.illustrationContainer}>
    <Image
      source={require('../../../assets/images/marmasset/otp.png')}
      style={styles.illustrationmain}
      resizeMode="contain"
    />
  </View>
);

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  backButton: {
    marginHorizontal: 20,
    marginTop: 40,
  },

  backButtonText: {
    fontSize: 20,
    fontWeight: '500',
    color: '#333',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#222',
    marginTop: 60,
    textAlign: 'center',
  },
  subtitle: {
    fontStyle: 'italic',
    fontSize: 16,
    color: '#777',
    marginTop: 8,
    marginBottom: 40,
    textAlign: 'center',
  },
  illustrationmain: {
    width: 175,
    height: 175,
  },
  illustrationContainer: {
    height: 150,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  illustrationbackarrow: {
    width: 35,
    height: 35,
  },
  personContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  person1: {
    width: 50,
    height: 80,
    position: 'relative',
  },
  person2: {
    width: 50,
    height: 80,
    position: 'relative',
  },
  personBody: {
    width: 30,
    height: 50,
    backgroundColor: '#555',
    position: 'absolute',
    bottom: 0,
    left: 10,
    borderRadius: 8,
  },
  personHead: {
    width: 20,
    height: 20,
    backgroundColor: '#555',
    position: 'absolute',
    bottom: 45,
    left: 15,
    borderRadius: 10,
  },
  keyRed: {
    flexDirection: 'row',
    alignItems: 'center',
    transform: [{rotate: '45deg'}],
  },
  keyCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'red',
  },
  keyRect: {
    width: 40,
    height: 15,
    backgroundColor: 'red',
    marginLeft: -5,
  },
  codeInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 40,
  },
  codeInput: {
    width: width * 0.2,
    height: width * 0.16,
    borderRadius: width * 0.066,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    fontSize: 22,
    textAlign: 'center',
    backgroundColor: '#FCFCFC',
  },
  submitButton: {
    width: '100%',
    height: 46,
    backgroundColor: 'red',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  footerText: {
    fontSize: 16,
    color: '#777',
  },
  createAccountText: {
    fontSize: 16,
    color: 'red',
    fontWeight: '600',
  },
});

export default VerificationCodeScreen;
