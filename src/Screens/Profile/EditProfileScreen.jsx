import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';

const EditProfileScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };
  const [formData, setFormData] = useState({
    username: 'puerto_rico',
    email: 'puertorico@gmail.com',
    mobileNumber: '987467626566',
    gender: 'Female',
    state: 'Kerala',
    address: 'ABC address thiruvanathapuram',
  });

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    // Handle form submission
    console.log('Profile updated:', formData);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image
              source={require('../../assets/images/marmasset/Back.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit profile</Text>
        </View>
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Username Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              value={formData.username}
              onChangeText={text => updateField('username', text)}
              placeholder="Enter username"
            />
          </View>

          {/* Email Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={text => updateField('email', text)}
              placeholder="Enter email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* Mobile Number Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Mobile Number</Text>
            <TextInput
              style={styles.input}
              value={formData.mobileNumber}
              onChangeText={text => updateField('mobileNumber', text)}
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
            />
          </View>

          {/* Gender Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Gender</Text>
            <TextInput
              style={styles.input}
              value={formData.gender}
              onChangeText={text => updateField('gender', text)}
              placeholder="Enter gender"
            />
          </View>

          {/* State Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>State</Text>
            <TextInput
              style={styles.input}
              value={formData.state}
              onChangeText={text => updateField('state', text)}
              placeholder="Enter state"
            />
          </View>

          {/* Address Field */}
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={[styles.input, styles.addressInput]}
              value={formData.address}
              onChangeText={text => updateField('address', text)}
              placeholder="Enter address"
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
        </ScrollView>

        {/* Update Button */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Edit and Update</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
  },

  time: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signal: {
    fontSize: 12,
    marginRight: 4,
  },
  wifi: {
    fontSize: 12,
    marginRight: 4,
  },
  battery: {
    fontSize: 12,
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {
    marginRight: 16,
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  fieldContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#e1e1e1',
  },
  addressInput: {
    height: 120,
    paddingTop: 16,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#ffff',
  },
  updateButton: {
    backgroundColor: '#FE0000',
    borderRadius: 25,
    paddingVertical: 13,
    alignItems: 'center',
    shadowColor: '#FE0000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  homeIndicator: {
    position: 'absolute',
    bottom: 8,
    left: '50%',
    marginLeft: -67,
    width: 134,
    height: 5,
    backgroundColor: '#000',
    borderRadius: 3,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },

  illustration: {
    width: 30,
    height: 30,
  },
});

export default EditProfileScreen;
