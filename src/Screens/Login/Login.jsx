import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appstrings} from '../../Contants/Appstrings';
import {AuthContext} from '../../Context/AuthContext';

const GoogleIcon = require('../../assets/images/Fishimage/Google.png');
const AppleIcon = require('../../assets/images/Fishimage/Apple.png');
const FacebookIcon = require('../../assets/images/Fishimage/Facebook.png');
const tickImage = require('../../assets/images/Fishimage/Tick.png');
const untickImage = require('../../assets/images/Fishimage/Untick.png');

// Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must include uppercase, lowercase, number, and special character',
    ),
});

const Login = () => {
  const {login} = useContext(AuthContext);
  const navigation = useNavigation();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSocialLogin = platform => {
    console.log(`Logging in with ${platform}`);
  };

  const handleLogin = async values => {
    setLoader(true);
    fetch('https://healthyfresh.lunarsenterprises.com/fishapp/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
        role: 'user',
      }),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data, 'data inisde te login');

        if (data.result) {
          AsyncStorage.setItem(Appstrings.USER_ID, JSON.stringify(data.u_id));
          AsyncStorage.setItem(Appstrings.USER_TOCKEN, data.user_token);
          login(data.user_token);
          setLoader(false);
        } else {
          setLoader(false);
          Toast.show(data.message);
        }
      })
      .catch(error => {
        setLoader(false);
        console.log(error, 'error');
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        {/* App Title */}
        {/* <Text style={styles.logoText}>
          <Text style={styles.healthyText}>Healthy</Text>
          <Text style={styles.freshText}>Fresh</Text>
        </Text> */}
        <Image
          source={require('../../assets/images/Fishimage/HealthyFresh.png')}
          style={styles.logoname}
          resizeMode="contain"
        />

        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={LoginSchema}
          onSubmit={values => handleLogin(values)} // Pass navigation to handleLogin
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View style={styles.formContainer}>
              {/* Email Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputnamemain}>
                  <Text Style={styles.inputnames}>Email</Text>
                </View>
                <TextInput
                  style={[
                    styles.input,
                    touched.email && errors.email && styles.inputError,
                  ]}
                  placeholder="Email"
                  placeholderTextColor="#888"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              {/* Password Input */}
              <View style={styles.inputContainer}>
                <View style={styles.inputnamemain}>
                  <Text Style={styles.inputnames}>Password</Text>
                </View>
                <View style={styles.passwordInputContainer}>
                  <TextInput
                    style={[
                      styles.input,
                      styles.passwordInput,
                      touched.password && errors.password && styles.inputError,
                    ]}
                    placeholder="Password"
                    placeholderTextColor="#888"
                    secureTextEntry={!isPasswordVisible}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  <TouchableOpacity
                    onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                    style={styles.eyeIcon}>
                    <Text>{isPasswordVisible ? '👁️' : '👁️‍🗨️'}</Text>
                  </TouchableOpacity>
                </View>
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              {/* Remember Me & Forgot Password */}
              <View style={styles.rememberedContainer}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => setRememberMe(!rememberMe)}>
                  <Image
                    source={rememberMe ? tickImage : untickImage}
                    style={styles.checkbox}
                    resizeMode="contain"
                  />
                  <Text style={styles.rememberedText}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate('ForgotPassword')}>
                  <Text style={styles.forgotPasswordText}>
                    Forgot Password ?
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Login Button */}
              <TouchableOpacity
                style={styles.loginButton}
                onPress={handleSubmit}
                disabled={loader ? true : false}>
                <Text style={styles.loginButtonText}>
                  {loader ? 'Loading...' : 'Log In'}
                </Text>
              </TouchableOpacity>

              {/* Divider */}
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              {/* Social Login */}
              <View style={styles.socialLoginContainer}>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Google')}>
                  <Image source={GoogleIcon} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Apple')}>
                  <Image source={AppleIcon} style={styles.socialIcon} />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.socialButton}
                  onPress={() => handleSocialLogin('Facebook')}>
                  <Image source={FacebookIcon} style={styles.socialIcon} />
                </TouchableOpacity>
              </View>

              {/* Signup Link */}
              <View style={styles.signupContainer}>
                <Text style={styles.signupText}>
                  If you don't have an account yet?
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('Registeration')}>
                  <Text style={styles.signupLinkText}>SignUp</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },

  logoname: {
    width: '100%',
    height: 50,
    marginBottom: 30,
  },
  logoText: {
    textAlign: 'center',
    fontSize: 32,
    marginBottom: 30,
  },
  healthyText: {
    color: '#8A2BE2', // Purple
    fontWeight: 'bold',
  },
  freshText: {
    color: '#1E90FF', // Blue
    fontWeight: 'bold',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    marginBottom: 15,
  },

  inputnamemain: {
    marginBottom: 10,
  },
  inputnames: {
    color: '#1F1F1F',
    fontSize: 14,
    fontWeight: 500,
  },

  input: {
    height: 46,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 15,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    color: 'back',
    flex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  rememberedContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,

    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: '#292D32',
  },
  rememberedText: {
    color: '#1F1F1F',
  },
  forgotPasswordText: {
    color: '#1F1F1F',
  },
  loginButton: {
    backgroundColor: '#0C8CE9',
    height: 48,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 10,
    color: '#888',
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    marginHorizontal: 1,
    padding: 10,
  },
  socialIcon: {
    width: 42,
    height: 42,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#1F1F1F',
    fontSize: 14,
    fontWeight: 400,
  },
  signupLinkText: {
    color: '#1F1F1F',
    marginLeft: 5,
    fontWeight: 'bold',

    textDecorationLine: 'underline',
  },
});

export default Login;
