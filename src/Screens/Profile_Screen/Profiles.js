import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import {Appstrings} from '../../Contants/Appstrings';

const Profiles = () => {
  const navigation = useNavigation();
  const [fullName, setFullName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    profileView();
  }, []);

  const profileView = async () => {
    try {
      const user_id = await AsyncStorage.getItem(Appstrings.USER_ID);

      console.log(user_id, 'user_id');
      const response = await fetch(
        'https://healthyfresh.lunarsenterprises.com/fishapp/list/users',
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            u_id: user_id,
          },
        },
      );

      const data = await response.json();
      console.log(data, 'datainside ');

      if (data.result) {
        const respons = data?.list[0];
        console.log(respons, 'data');

        setFullName(respons?.u_name);
        setEmail(respons.u_email);
        setMobile(respons.u_mobile);
      } else {
        console.log(data.message, 'error in cart respons');
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const profileEdit = async () => {
    setLoader(true);
    try {
      const user_id = await AsyncStorage.getItem(Appstrings.USER_ID);

      const requestbody = {
        u_id: JSON.parse(user_id),
        name: fullName,
        email: email,
        mobile: mobile,
      };

      const response = await fetch(
        'https://healthyfresh.lunarsenterprises.com/fishapp/edit/profile',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestbody),
        },
      );

      const data = await response.json();

      if (data.result) {
        setLoader(false);
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        navigation.navigate('ProfileScreen');
      } else {
        setLoader(false);
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        console.log(data.message, 'error in cart respons');
      }
    } catch (error) {
      ToastAndroid.show(
        'server down please try again later',
        ToastAndroid.SHORT,
      );
      setLoader(false);
      console.log(error, 'error');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/Fishimage/Back.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <View style={styles.placeholder} />
      </View>
      <View style={styles.innerContainer}>
        {/* Profile Image with Edit Icon */}
        <View style={styles.imageContainer}>
          <Image
            source={{uri: 'https://randomuser.me/api/portraits/men/68.jpg'}}
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

          {/* <View style={styles.inputRow}>
            <TextInput
              style={[styles.input, {flex: 1}]}
              placeholder="Date of Birth"
              value={dob}
              onChangeText={setDob}
            />
            <Text style={styles.inlineIcon}>📅</Text>
          </View> */}

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
              value="+91"
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

          <TouchableOpacity
            style={styles.saveButton}
            disabled={loader ? true : false}
            onPress={() => profileEdit()}>
            <Text style={styles.saveButtonText}>
              {loader ? 'Loading...' : 'Save Changes'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Profiles;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // padding: 16,
    flex: 1,
  },
  innerContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  placeholder: {
    width: 40,
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
