import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
} from 'react-native';

import {Formik} from 'formik';
import * as Yup from 'yup';

const TherapyIllustration = () => (
  <Image
    source={require('../../../assets/images/marmasset/register.png')}
    style={styles.illustration}
    resizeMode="contain"
  />
);

// Form validation schema
const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Name is too short')
    .max(50, 'Name is too long')
    .required('Name is required'),
  phoneNumber: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be 10 digits')
    .required('Phone number is required'),
  alternativeNumber: Yup.string()
    .matches(/^\d{10}$/, 'Alternative number must be 10 digits')
    .notRequired(),
  addressLine1: Yup.string().required('Address is required'),
  addressLine2: Yup.string(),
  addressLine3: Yup.string(),
  location: Yup.string().required('Location is required'),
});

const SignupScreen = ({navigation}) => {
  const [countryCode, setCountryCode] = useState('+91');
  const [altCountryCode, setAltCountryCode] = useState('+91');

  const handleSubmit = values => {
    console.log('Form submitted:', values);
    navigation.navigate('Registervarificationscreen');
    Alert.alert('Success', 'Your account has been created successfully!', [
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]);
  };

  const handleLogin = () => {
    navigation.navigate('LoginScreen');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="red" />

      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Image
            source={require('../../../assets/images/marmasset/Back.png')}
            style={styles.illustrationBack}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Let's Get Started..!</Text>
          <Text style={styles.headerSubtitle}>
            Sign up to book Therapy and connect with certified therapists near
            you.
          </Text>
        </View>

        <TherapyIllustration />

        <Formik
          initialValues={{
            name: '',
            phoneNumber: '',
            alternativeNumber: '',
            addressLine1: '',
            addressLine2: '',
            addressLine3: '',
            location: '',
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSubmit}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isValid,
            dirty,
          }) => (
            <View style={styles.formContainer}>
              <TextInput
                style={[
                  styles.input,
                  touched.name && errors.name && styles.inputError,
                ]}
                placeholder="Enter your name"
                value={values.name}
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
              />
              {touched.name && errors.name && (
                <Text style={styles.errorText}>{errors.name}</Text>
              )}

              {/* Phone Number Input */}
              <View style={styles.phoneContainer}>
                <TouchableOpacity style={styles.countryCodeContainer}>
                  <Text style={styles.countryCodeText}>{countryCode}</Text>
                  <Image
                    source={require('../../../assets/images/marmasset/downarrow.png')}
                    style={styles.downarrow}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TextInput
                  style={[
                    styles.phoneInput,
                    touched.phoneNumber &&
                      errors.phoneNumber &&
                      styles.inputError,
                  ]}
                  placeholder="Phone number"
                  keyboardType="phone-pad"
                  value={values.phoneNumber}
                  onChangeText={handleChange('phoneNumber')}
                  onBlur={handleBlur('phoneNumber')}
                />
              </View>
              {touched.phoneNumber && errors.phoneNumber && (
                <Text style={styles.errorText}>{errors.phoneNumber}</Text>
              )}

              {/* Alternative Number Input */}
              <View style={styles.phoneContainer}>
                <TouchableOpacity style={styles.countryCodeContainer}>
                  <Text style={styles.countryCodeText}>{altCountryCode}</Text>
                  <Image
                    source={require('../../../assets/images/marmasset/downarrow.png')}
                    style={styles.downarrow}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                <TextInput
                  style={[
                    styles.phoneInput,
                    touched.alternativeNumber &&
                      errors.alternativeNumber &&
                      styles.inputError,
                  ]}
                  placeholder="Alternative number"
                  keyboardType="phone-pad"
                  value={values.alternativeNumber}
                  onChangeText={handleChange('alternativeNumber')}
                  onBlur={handleBlur('alternativeNumber')}
                />
              </View>
              {touched.alternativeNumber && errors.alternativeNumber && (
                <Text style={styles.errorText}>{errors.alternativeNumber}</Text>
              )}

              {/* Address Inputs */}
              <TextInput
                style={[
                  styles.input,
                  touched.addressLine1 &&
                    errors.addressLine1 &&
                    styles.inputError,
                ]}
                placeholder="Address Line 1"
                value={values.addressLine1}
                onChangeText={handleChange('addressLine1')}
                onBlur={handleBlur('addressLine1')}
              />
              {touched.addressLine1 && errors.addressLine1 && (
                <Text style={styles.errorText}>{errors.addressLine1}</Text>
              )}

              <TextInput
                style={styles.input}
                placeholder="Address Line 2"
                value={values.addressLine2}
                onChangeText={handleChange('addressLine2')}
                onBlur={handleBlur('addressLine2')}
              />

              <TextInput
                style={styles.input}
                placeholder="Address Line 3"
                value={values.addressLine3}
                onChangeText={handleChange('addressLine3')}
                onBlur={handleBlur('addressLine3')}
              />

              {/* Location Input */}
              <View style={styles.locationContainer}>
                <TextInput
                  style={[
                    styles.locationInput,
                    touched.location && errors.location && styles.inputError,
                  ]}
                  placeholder="Location"
                  value={values.location}
                  onChangeText={handleChange('location')}
                  onBlur={handleBlur('location')}
                />
                <View style={styles.locationIconContainer}>
                  <Image
                    source={require('../../../assets/images/marmasset/location.png')}
                    style={styles.downarrow}
                    resizeMode="contain"
                  />
                </View>
              </View>
              {touched.location && errors.location && (
                <Text style={styles.errorText}>{errors.location}</Text>
              )}

              {/* Continue Button */}
              <TouchableOpacity
                style={[
                  styles.continueButton,
                  (!isValid || !dirty) && styles.continueButtonDisabled,
                ]}
                onPress={handleSubmit}
                disabled={!isValid || !dirty}>
                <Text style={styles.continueButtonText}>Continue</Text>
              </TouchableOpacity>

              {/* Login Link */}
              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Already have an Account ? </Text>
                <TouchableOpacity onPress={handleLogin}>
                  <Text style={styles.loginLinkText}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },

  headerContainer: {
    marginTop: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  headerSubtitle: {
     fontStyle: 'italic',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 5,
    paddingHorizontal: 20,
  },
  illustration: {
    width: '100%',
    height: 180,
    marginVertical: 20,
  },

  illustrationBack: {
    width: 35,
    height: 35,
    marginVertical: 20,
    marginTop: 40,
  },

  downarrow: {
    width: 25,
    height: 25,
  },

  formContainer: {
    width: '100%',
  },
  input: {
    height: 46,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 28,
    paddingHorizontal: 20,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
  inputError: {
    borderColor: '#FF3B30',
  },
  errorText: {
    color: '#FF3B30',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 10,
  },
  phoneContainer: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    height: 46,
    width: 90,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 28,
  },
  countryCodeText: {
    fontSize: 16,
    color: '#333',
  },
  phoneInput: {
    flex: 1,
    height: 46,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 28,
    paddingHorizontal: 20,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  locationContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  locationInput: {
    height: 46,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 28,
    paddingHorizontal: 20,
    paddingRight: 50,
    fontSize: 16,
    color: '#333',
  },
  locationIconContainer: {
    position: 'absolute',
    right: 15,
    top: 10,
  },
  continueButton: {
    height: 46,
    backgroundColor: '#FF0000',
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  continueButtonDisabled: {
    backgroundColor: '#FF6666',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  loginText: {
    fontSize: 16,
    color: '#666',
  },
  loginLinkText: {
    fontSize: 16,
    color: '#FF0000',
    fontWeight: 'bold',
  },
});

export default SignupScreen;
