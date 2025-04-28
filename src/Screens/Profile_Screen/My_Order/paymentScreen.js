import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  SafeAreaView,
  Modal,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Appstrings} from '../../../Contants/Appstrings';

const paymentScreen = ({route}) => {
  const params = route.params || '';
  const navigation = useNavigation();
  const [address, setAddress] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState('');
  const [loader, setLoader] = useState(false);

  useFocusEffect(
    useCallback(() => {
      DefaultAddress();
      console.log(route.params, 'paramss', params);
    }, []),
  );

  const DefaultAddress = async () => {
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
      console.log(data, 'data inside address');

      if (data.result) {
        const defaultAddr = data.list.find(
          item => item.ua_default_address === 1,
        );
        setAddress(defaultAddr);
      } else {
        console.log(data.message, 'error in cart respons');
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const OrderItem = async () => {
    if (selected) {
      setLoader(true);
      try {
        const user_id = await AsyncStorage.getItem(Appstrings.USER_ID);
        const requestbody = {
          u_id: JSON.parse(user_id),
          amount: params.amount,
          payment_method: selected,
          user_name: address.ua_name,
          user_email: address.ua_email,
          user_mobile_no: address.ua_mobile,
          user_address: address.ua_address,
          user_state: address.ua_state,
          user_district: address.ua_district,
          landmark: address.ua_landmark,
          user_city: address.ua_city,
          user_zipcode: address.ua_zip_code,
          product_details: params.cartItems.map(item => ({
            product_id: item.p_id,
            quantity: item.ct_quantity,
          })),
        };
        console.log(requestbody, 'requestbody order');

        const response = await fetch(
          'https://healthyfresh.lunarsenterprises.com/fishapp/add/order',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestbody),
          },
        );

        const data = await response.json();
        console.log(data, 'data inside the cartlist');

        if (data.result) {
          setShowModal(true);
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
          setLoader(false);
        } else {
          console.log(data.message, 'error in cart response');
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
          setLoader(false);
        }
      } catch (error) {
        console.log(error, 'error');
        setLoader(false);
      }
    } else {
      Alert.alert('Before proceeding select any payment method!!');
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../assets/images/Fishimage/Back.png')}
              style={styles.backButton}
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Payment</Text>
          <View style={styles.placeholder} />
        </View>

        {/* Price Summary */}
        <View style={styles.summaryBox}>
          <View style={styles.row}>
            <Text style={styles.label}>Sub-total</Text>
            <Text style={styles.value}>₹{params.amount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Delivery-fee</Text>
            <Text style={styles.value}>₹0.00</Text>
          </View>
          <View style={[styles.row, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total-Price</Text>
            <Text style={styles.totalValue}>₹{params.amount}</Text>
          </View>
        </View>

        {/* Payment Options */}
        {/* <TouchableOpacity style={styles.option}>
          <Text style={styles.emoji}>💳</Text>
          <Text style={styles.optionText}>Debit/Credit Card</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.emoji}>🏦</Text>
          <Text style={styles.optionText}>Net Banking</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option}>
          <Text style={styles.emoji}>📲</Text>
          <Text style={styles.optionText}>UPI Payment</Text>
        </TouchableOpacity> */}
        <Image
          source={require('../../../assets/images/Qrcode.jpg')}
          style={{width: '100%', height: '110%'}}
        />

        <TouchableOpacity
          style={styles.option}
          onPress={() => {
            setSelected(prev =>
              prev === 'cash on delivery' ? '' : 'cash on delivery',
            );
          }}>
          <View style={styles.checkbox}>
            {selected === 'cash on delivery' && <View style={styles.checked} />}
          </View>
          <Text style={styles.optionText}>📦 Cash on delivery</Text>
        </TouchableOpacity>

        <View style={{marginTop: 20}}>
          <TouchableOpacity
            style={styles.submitButton}
            disabled={loader ? true : false}
            onPress={OrderItem}>
            <Text style={styles.submitButtonText}>
              {loader ? 'Loading...' : 'Submit Order'}
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>
                🎉 Thank you for your purchase! Order Placed Successfull.
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setShowModal(false);
                  navigation.navigate('My_Order');
                }}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 16,
    flex: 1,
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
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryBox: {
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#555',
  },
  value: {
    fontSize: 16,
    color: '#555',
  },
  totalRow: {
    marginTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  emoji: {
    fontSize: 20,
    width: 30,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 4,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 6,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
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

export default paymentScreen;
