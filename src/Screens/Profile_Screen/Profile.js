import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

const Profile = () => {
  const [fullName, setFullName] = useState('Princess Linda');
  const [dob, setDob] = useState('01/04/2002');
  const [email, setEmail] = useState('Abcd124@gmail.com');
  const [mobile, setMobile] = useState('8123456789');

  return (
    <SafeAreaView style={styles.container}>
      {/* Back Arrow */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backText}>{'←'}</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Edit Profile</Text>

      {/* Profile Image with Edit Icon */}
      <View style={styles.imageContainer}>
        <Image
          source={{uri: 'https://randomuser.me/api/portraits/women/68.jpg'}}
          style={styles.profileImage}
        />
        <TouchableOpacity style={styles.editOverlay}>
          <Text style={styles.editText}>✎</Text>
        </TouchableOpacity>
      </View>

      {/* Form */}
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />

        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, {flex: 1}]}
            placeholder="Date of Birth"
            value={dob}
            onChangeText={setDob}
          />
          <Text style={styles.inlineIcon}>📅</Text>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, {flex: 1}]}
            placeholder="Email Address"
            value={email}
            editable={false}
          />
          <Text style={styles.inlineIcon}>✉️</Text>
        </View>

        <View style={styles.inputRow}>
          <TextInput
            style={[styles.input, {width: 60, marginRight: 10}]}
            value="+234"
            editable={false}
          />
          <TextInput
            style={[styles.input, {flex: 1}]}
            placeholder="Mobile Number"
            value={mobile}
            onChangeText={setMobile}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  backText: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
  },
  editOverlay: {
    position: 'absolute',
    right: '35%',
    bottom: 0,
    backgroundColor: '#fff',
    padding: 4,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  editText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  form: {
    marginTop: 10,
  },
  input: {
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 16,
    color: '#333',
    marginBottom: 15,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  inlineIcon: {
    fontSize: 18,
    marginLeft: 10,
    color: '#777',
  },
  saveButton: {
    backgroundColor: '#0B1E66',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
