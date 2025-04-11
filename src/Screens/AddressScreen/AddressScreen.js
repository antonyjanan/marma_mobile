import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  Image,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Appstrings} from '../../Contants/Appstrings';
import {useFocusEffect, useNavigation} from '@react-navigation/core';

const AddressScreen = () => {
  const navigation = useNavigation();
  const [selectedId, setSelectedId] = useState(1);
  const [address, setAddress] = useState([]);

  useEffect(() => {
    AddressList();
  }, []);
  useFocusEffect(
    useCallback(() => {
      AddressList();
    }, []),
  );
  const AddressList = async () => {
    try {
      const user_id = await AsyncStorage.getItem(Appstrings.USER_ID);
      const requestbody = {
        u_id: JSON.parse(user_id),
      };

      const response = await fetch(
        'https://healthyfresh.lunarsenterprises.com/fishapp/list/address',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestbody),
        },
      );

      const data = await response.json();
      console.log(data, 'dtaa');

      if (data.result) {
        setAddress(data.list);
      } else {
        console.log(data.message, 'error in cart respons');
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const DefaultAddress = async ua_id => {
    setSelectedId(ua_id);
    try {
      const user_id = await AsyncStorage.getItem(Appstrings.USER_ID);
      const requestbody = {
        user_id: JSON.parse(user_id),
        ua_id: ua_id,
      };

      const response = await fetch(
        'https://healthyfresh.lunarsenterprises.com/fishapp/set/default-address',
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
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      } else {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };
  const handleDelete = id => {
    Alert.alert(
      'Delete',
      'Are you sure you want to Delete?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: () => {
            Deleteapi(id);
          },
        },
      ],
      {cancelable: true},
    );
  };
  const Deleteapi = async id => {
    // let user_id = await AsyncStorage.getItem(Appstrings.USER_ID);
    let requestbody = {
      ua_id: id,
    };

    fetch('https://healthyfresh.lunarsenterprises.com/fishapp/delete', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestbody),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
          AddressList();
        } else {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };
  return (
    <View style={styles.container}>
      {/* Header */}
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/Fishimage/Back.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shipping Address</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Add New Address */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddAddress')}>
        <Text style={styles.addButtonText}>+ Add a new address</Text>
      </TouchableOpacity>

      <ScrollView style={styles.cardscontainer}>
        {address.map(item => (
          <View key={item.ua_id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.name}>{item.ua_name}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.ua_type}</Text>
              </View>
            </View>
            <Text style={styles.text}>{item.ua_address}</Text>
            <Text style={styles.text}>{item.ua_city}</Text>
            <Text style={styles.text}>Pin - {item.ua_zip_code}</Text>
            <Text style={styles.text}>Mobile - {item.ua_mobile}</Text>

            <View style={styles.cardActions}>
              <TouchableOpacity
                onPress={() => navigation.navigate('AddAddress', item)}>
                <Text style={styles.iconButton}>✏️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(item.ua_id)}>
                <Text style={styles.iconButton}>🗑️</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => DefaultAddress(item.ua_id)}>
                <Text style={styles.iconButton}>
                  {item.ua_default_address === 1 ? '✅' : '⬜'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f5f9',
    padding: 16,
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
  addButton: {
    backgroundColor: '#e4effe',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  addButtonText: {
    color: '#0a65cc',
    fontWeight: '600',
  },
  card: {
    backgroundColor: '#fff',
    padding: 14,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  name: {
    fontWeight: '700',
    fontSize: 14,
  },
  badge: {
    backgroundColor: '#e8f0fd',
    paddingVertical: 3,
    borderRadius: 4,
  },
  badgeText: {
    color: '#0a65cc',
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
  text: {
    color: '#333',
    fontSize: 13,
    marginBottom: 2,
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
    gap: 10,
  },
  iconButton: {
    fontSize: 18,
    marginLeft: 12,
  },
});
