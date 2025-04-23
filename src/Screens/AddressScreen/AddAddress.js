import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Picker,
  Image,
  StatusBar,
  ToastAndroid,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {Appstrings} from '../../Contants/Appstrings';
import {useNavigation} from '@react-navigation/core';
import CustomDropdown from '../../Component/CustomDropdown';

const AddAddress = ({route}) => {
  const params = route.params || '';
  console.log(params, 'params');

  const navigation = useNavigation();
  const [form, setForm] = useState({
    fullName: params?.ua_name || '',
    mobile: params.ua_mobile || '',
    mail: params.ua_email || '',
    flat: params.ua_address || '',
    area: params.ua_district || '',
    landmark: params.ua_landmark || '',
    pincode: params.ua_zip_code || '',
    city: params.ua_city || '',
    state: params.ua_state || '',
    isDefault: false,
    type: params.ua_type || '',
  });

  const handleChange = (key, value) => {
    setForm(prev => ({...prev, [key]: value}));
  };
  const addAddress = async () => {
    try {
      const user_id = await AsyncStorage.getItem(Appstrings.USER_ID);
      const Bearer = await AsyncStorage.getItem(Appstrings.USER_TOCKEN);
      const requestbody = {
        // u_id: user_id,
        name: form.fullName,
        email: form.mail,
        mobile: form.mobile,
        address: `${form.flat}`,
        state: form.state,
        district: form.area,
        landmark: form.landmark,
        city: form.city,
        zipcode: form.pincode,
        type: form.type,
      };
      console.log(requestbody, 'requestbody');

      const response = await fetch(
        'https://healthyfresh.lunarsenterprises.com/fishapp/add/address',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Bearer}`,
          },
          body: JSON.stringify(requestbody),
        },
      );

      const data = await response.json();
      console.log(data, 'datdadtatda');
      if (data.result) {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        navigation.navigate('Address');
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const EditAddress = async () => {
    try {
      const Bearer = await AsyncStorage.getItem(Appstrings.USER_TOCKEN);
      const user_id = await AsyncStorage.getItem(Appstrings.USER_ID);
      const requestbody = {
        ua_id: params.ua_id || '',
        // u_id: user_id,
        name: form.fullName,
        email: form.mail,
        mobile: form.mobile,
        address: `${form.flat}`,
        state: form.state,
        district: form.area,
        landmark: form.landmark,
        city: form.city,
        zipcode: form.pincode,
        type: form.type,
      };

      const response = await fetch(
        'https://healthyfresh.lunarsenterprises.com/fishapp/edit/address',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${Bearer}`,
          },
          body: JSON.stringify(requestbody),
        },
      );

      const data = await response.json();
      console.log(data, 'datdadtatda');
      if (data.result) {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        navigation.navigate('Address');
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <KeyboardAvoidingView>
          <StatusBar barStyle="dark-content" />

          <View style={styles.header}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.goBack()}>
              <Image
                source={require('../../assets/images/Fishimage/Back.png')}
                style={styles.backButton}
              />
            </TouchableOpacity>
            <Text style={styles.heading}>
              {params.ua_id ? 'Edit' : 'Add'} Address
            </Text>
            <View style={styles.placeholder} />
          </View>

          <Text style={styles.labelText}>Full Name (First & Last Name)</Text>
          <TextInput
            style={styles.input}
            value={form.fullName}
            onChangeText={text => handleChange('fullName', text)}
          />
          <Text style={styles.labelText}>Mail</Text>
          <TextInput
            style={styles.input}
            value={form.mail}
            onChangeText={text => handleChange('mail', text)}
          />

          <Text style={styles.labelText}>Mobile Number</Text>
          <TextInput
            style={styles.input}
            keyboardType="phone-pad"
            value={form.mobile}
            onChangeText={text => handleChange('mobile', text)}
          />

          <Text style={styles.labelText}>
            Flat, House name, Building, Apartment, Area, Street
          </Text>
          <TextInput
            style={styles.input}
            value={form.flat}
            onChangeText={text => handleChange('flat', text)}
          />

          <Text style={styles.labelText}> District</Text>
          <TextInput
            style={styles.input}
            value={form.area}
            onChangeText={text => handleChange('area', text)}
          />

          <Text style={styles.labelText}>Landmark</Text>
          <TextInput
            style={styles.input}
            value={form.landmark}
            onChangeText={text => handleChange('landmark', text)}
          />

          <View style={styles.row}>
            <View style={{width: '48%'}}>
              <Text style={styles.labelText}>Pincode</Text>
              <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={form.pincode}
                onChangeText={text => handleChange('pincode', text)}
              />
            </View>

            <View style={{width: '48%'}}>
              <Text style={styles.labelText}>Town/City</Text>
              <TextInput
                style={styles.input}
                value={form.city}
                onChangeText={text => handleChange('city', text)}
              />
            </View>
          </View>

          <Text style={styles.labelText}>State</Text>
          <TextInput
            style={styles.input}
            value={form.state}
            onChangeText={text => handleChange('state', text)}
          />
          <Text style={styles.labelText}>Address type</Text>
          <CustomDropdown form={form} handleChange={handleChange} />

          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => handleChange('isDefault', !form.isDefault)}>
            <View style={styles.checkbox}>
              {form.isDefault === true && <View style={styles.checked} />}
            </View>
            {/* <Checkbox
              status={ form.isDefault? 'checked' : 'unchecked'}
              onPress={() => handleChange('isDefault', !form.isDefault)}
            /> */}
            <Text style={styles.label}>Make this default address</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => (params ? EditAddress() : addAddress())}>
            <Text style={styles.buttonText}>save Address</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAddress;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f9f9f9',
    paddingBottom: 40,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomColor: '#e0e0e0',
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
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'left',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    marginLeft: 8,
  },
  labelText: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: '500',
    color: '#333',
  },

  button: {
    // position: 'absolute',
    // bottom: 20,
    // width: '100%',
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    // marginLeft: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#999',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },

  checked: {
    width: 12,
    height: 12,
    backgroundColor: '#007bff',
    borderRadius: 2,
  },
});
