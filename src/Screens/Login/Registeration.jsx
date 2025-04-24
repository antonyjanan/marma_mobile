import React, {useState} from 'react';
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
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appstrings} from '../../Contants/Appstrings';

// Social Login Icons (you'll need to import these)
const GoogleIcon = require('../../assets/images/Fishimage/Google.png');
const AppleIcon = require('../../assets/images/Fishimage/Apple.png');
const FacebookIcon = require('../../assets/images/Fishimage/Facebook.png');
const tickImage = require('../../assets/images/Fishimage/Tick.png');
const untickImage = require('../../assets/images/Fishimage/Untick.png');

// Validation Schema
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be at most 50 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Must be at least 8 characters')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must include uppercase, lowercase, number, and special character',
    ),
});

const Registeration = ({navigation}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loader, setLoader] = useState(false);

  const handleSignup = values => {
    setLoader(true);
    fetch('https://healthyfresh.lunarsenterprises.com/fishapp/user/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    })
      .then(response => response.json())

      .then(data => {
        console.log(data, 'data');

        if (data.result) {
          console.log(data, 'data in login');
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
          AsyncStorage.setItem(Appstrings.USER_TOCKEN, data?.user_token);
          setLoader(false);
          navigation.navigate('Login');
        } else {
          // Toast.show(data.message);
          setLoader(false);
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  const handleSocialSignup = platform => {
    // Implement social signup logic
    console.log(`Signing up with ${platform}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled">
          {/* Title and Subtitle */}
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>Create an account</Text>
            <Text style={styles.subtitleText}>
              Welcome! Please enter your details.
            </Text>
          </View>

          <Formik
            initialValues={{name: '', email: '', password: ''}}
            validationSchema={SignupSchema}
            onSubmit={handleSignup}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={styles.formContainer}>
                {/* Name Input */}
                <View style={styles.inputContainer}>
                  <View style={styles.iconInputContainer}>
                    <TextInput
                      style={[
                        styles.input,
                        touched.name && errors.name && styles.inputError,
                      ]}
                      placeholder="Enter your name"
                      placeholderTextColor="#888"
                      onChangeText={handleChange('name')}
                      onBlur={handleBlur('name')}
                      value={values.name}
                    />
                  </View>
                  {touched.name && errors.name && (
                    <Text style={styles.errorText}>{errors.name}</Text>
                  )}
                </View>

                {/* Email Input */}
                <View style={styles.inputContainer}>
                  <View style={styles.iconInputContainer}>
                    <TextInput
                      style={[
                        styles.input,
                        touched.email && errors.email && styles.inputError,
                      ]}
                      placeholder="Enter your email"
                      placeholderTextColor="#888"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      value={values.email}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <View style={styles.iconInputContainer}>
                    <TextInput
                      style={[
                        styles.input,
                        touched.password &&
                          errors.password &&
                          styles.inputError,
                      ]}
                      placeholder="Enter your password"
                      placeholderTextColor="#888"
                      secureTextEntry={!isPasswordVisible}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <TouchableOpacity
                      onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                      style={styles.eyeIcon}>
                      <Image
                        source={
                          isPasswordVisible
                            ? require('../../assets/images/Fishimage/Eye_open.png')
                            : require('../../assets/images/Fishimage/Hide.png')
                        }
                        style={styles.eyeIconImage}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                {/* Signup Button */}
                <TouchableOpacity
                  style={styles.signupButton}
                  onPress={handleSubmit}>
                  <Text style={styles.signupButtonText}>
                    {loader ? 'Loading..' : 'Sign Up'}
                  </Text>
                </TouchableOpacity>

                {/* Divider */}
                {/* <View style={styles.dividerContainer}>
                  <View style={styles.dividerLine} />
                  <Text style={styles.dividerText}>Or sign up with</Text>
                  <View style={styles.dividerLine} />
                </View> */}

                {/* Social Signup */}
                {/* <View style={styles.socialContainer}>
                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => handleSocialSignup('Apple')}>
                    <Image source={AppleIcon} style={styles.socialIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => handleSocialSignup('Google')}>
                    <Image source={GoogleIcon} style={styles.socialIcon} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.socialButton}
                    onPress={() => handleSocialSignup('Facebook')}>
                    <Image source={FacebookIcon} style={styles.socialIcon} />
                  </TouchableOpacity>
                </View> */}

                {/* Login Link */}
                <View style={styles.loginContainer}>
                  <Text style={styles.loginText}>Already have an account?</Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.loginLinkText}>Log in</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 20,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  headerContainer: {
    marginBottom: 30,
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    color: '#666',
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    marginBottom: 15,
  },
  iconInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 15,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: 'black',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  eyeIcon: {
    padding: 10,
  },
  eyeIconImage: {
    width: 20,
    height: 20,
  },
  requirementContainer: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 10,
  },
  requirementText: {
    color: '#666',
  },
  signupButton: {
    backgroundColor: '#1E90FF',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  signupButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  socialButton: {
    marginHorizontal: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#333',
  },
  loginLinkText: {
    color: '#1E90FF',
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default Registeration;
