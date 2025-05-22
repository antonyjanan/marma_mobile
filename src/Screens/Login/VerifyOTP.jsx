// screens/VerifyOTPScreen.js
import React, {useState, useEffect, useRef} from 'react';
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
  ToastAndroid,
} from 'react-native';

const VerifyOTPScreen = ({route, navigation}) => {
  const {email, fromForgotPassword = false} = route.params || {};
  console.log(email, 'phoneNumber');

  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // References for OTP inputs
  const inputRefs = useRef([]);

  useEffect(() => {
    // Setup timer for OTP resend
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleOtpChange = (value, index) => {
    if (value.length > 1) {
      value = value.charAt(value.length - 1);
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    console.log(newOtp, 'newOtp');

    setOtp(newOtp);

    if (value !== '' && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerifyOTP = () => {
    const otpValue = otp.join('');
    console.log('Verifying OTP:', otpValue);

    if (fromForgotPassword) {
      fetch('https://healthyfresh.lunarsenterprises.com/fishapp/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          otp: otpValue,
        }),
      })
        .then(response => response.json())
        .then(data => {
          if (data.result) {
            ToastAndroid.show(data.message, ToastAndroid.SHORT);
            navigation.navigate('ResetPassword', {email});
          } else {
            ToastAndroid.show(data.message, ToastAndroid.SHORT);
            console.log(data.message, 'error in category response');
          }
        })
        .catch(error => {
          console.log(error, 'error');
        });
    } else {
      // For normal login flow, you might navigate to home or main screen
      console.log('OTP verified for login flow');
    }
  };

  const handleResendOTP = () => {
    if (canResend) {
      // Reset timer and resend flag
      setTimer(30);
      setCanResend(false);

      // Resend OTP logic would go here
      console.log('Resending OTP to:', email);

      // Start timer again
      const interval = setInterval(() => {
        setTimer(prevTimer => {
          if (prevTimer <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);
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
          <Text style={styles.titleText}>Verify OTP</Text>
          <Text style={styles.subtitleText}>
            We've sent a verification code to{'\n'}
            {email}
          </Text>

          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={ref => (inputRefs.current[index] = ref)}
                style={styles.otpInput}
                value={digit}
                onChangeText={value => handleOtpChange(value, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                autoFocus={index === 0}
              />
            ))}
          </View>

          <TouchableOpacity
            style={[
              styles.verifyButton,
              otp.join('').length < 4 && styles.verifyButtonDisabled,
            ]}
            onPress={handleVerifyOTP}
            disabled={otp.join('').length < 4}>
            <Text style={styles.verifyButtonText}>Verify</Text>
          </TouchableOpacity>

          {/* <View style={styles.resendContainer}>
            <Text style={styles.resendText}>
              Didn't receive the code? {canResend ? '' : `Resend in ${timer}s`}
            </Text>
            {canResend && (
              <TouchableOpacity onPress={handleResendOTP}>
                <Text style={styles.resendButtonText}>Resend OTP</Text>
              </TouchableOpacity>
            )}
          </View> */}
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
    marginTop: 40,
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
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  otpInput: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '700',
  },
  verifyButton: {
    height: 50,
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
  verifyButtonDisabled: {
    backgroundColor: '#ffcccc',
  },
  verifyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  resendText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  resendButtonText: {
    color: '#FF0000',
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

export default VerifyOTPScreen;
