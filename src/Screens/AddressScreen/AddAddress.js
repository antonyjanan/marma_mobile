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
} from 'react-native';
import {Checkbox} from 'react-native-paper';
import {Appstrings} from '../../Contants/Appstrings';
import {useNavigation} from '@react-navigation/core';
import CustomDropdown from '../../Component/CustomDropdown';

const AddAddress = () => {
  const navigation = useNavigation();
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    mail: '',
    flat: '',
    area: '',
    landmark: '',
    pincode: '',
    city: '',
    state: '',
    isDefault: false,
    type: '',
  });

  const handleChange = (key, value) => {
    setForm(prev => ({...prev, [key]: value}));
  };
  const addAddress = async () => {
    try {
      const user_id = await AsyncStorage.getItem(Appstrings.USER_ID);
      const requestbody = {
        u_id: user_id,
        name: form.fullName,
        email: form.mail,
        mobile: form.mobile,
        address: `${form.flat}, ${form.area}, ${form.landmark}`,
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
    <ScrollView contentContainerStyle={styles.container}>
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
        <Text style={styles.heading}>Edit Address</Text>
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
        Flat, House name, Building, Apartment
      </Text>
      <TextInput
        style={styles.input}
        value={form.flat}
        onChangeText={text => handleChange('flat', text)}
      />

      <Text style={styles.labelText}>Area, Street, Village</Text>
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

      <View style={styles.checkboxContainer}>
        <Checkbox
          status={form.isDefault ? 'checked' : 'unchecked'}
          onPress={() => handleChange('isDefault', !form.isDefault)}
        />
        <Text style={styles.label}>Make this default address</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => addAddress()}>
        <Text style={styles.buttonText}>save Address</Text>
      </TouchableOpacity>
    </ScrollView>
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
    position: 'absolute',
    bottom: 20,
    width: '100%',
    backgroundColor: '#007bff',
    paddingVertical: 14,
    borderRadius: 6,
    alignItems: 'center',
    marginLeft: 16,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
});
