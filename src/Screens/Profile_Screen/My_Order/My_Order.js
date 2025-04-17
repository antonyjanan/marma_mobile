import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import {Appstrings} from '../../../Contants/Appstrings';

const My_Order = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    orderList();
  }, []);

  const orderList = async () => {
    let user_id = await AsyncStorage.getItem(Appstrings.USER_ID);
    let requestbody = {
      u_id: user_id,
    };

    fetch('https://healthyfresh.lunarsenterprises.com/fishapp/list/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestbody),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data, 'data added');

        if (data.result) {
          setOrders(data.list);
        } else {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };
  const baseurl = 'https://healthyfresh.lunarsenterprises.com';
  const renderOrderItem = ({item}) => (
    <TouchableOpacity
      style={styles.orderCard}
      onPress={() => navigation.navigate('Myorder_Tracking', item.op_id)}>
      <View style={{padding: 10}}>
        <Image
          source={{uri: baseurl + item.p_image}}
          style={styles.orderImage}
        />
      </View>
      <View style={styles.orderDetails}>
        <View style={styles.headerRow}>
          <Text style={styles.orderTitle}>{item.p_name}</Text>
          <View style={styles.ratingContainer}>
            <Image
              source={require('../../../assets/images/Fishimage/star.png')}
              style={styles.starIcon}
              resizeMode="contain"
            />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
        </View>
        {item.p_discount_price > 0 ? (
          <Text style={{textDecorationLine: 'line-through'}}>
            ₹ {item.p_orgianl_price}
          </Text>
        ) : null}
        <View style={styles.priceRow}>
          <Text style={styles.priceText}>
            ₹
            {item.p_discount_price
              ? item.p_discount_price
              : item.p_orgianl_price}{' '}
            /{' '}
          </Text>

          <Text style={styles.pricekg}>{item.p_unit}</Text>
        </View>

        <Text style={styles.descriptionText} numberOfLines={2}>
          {item.p_description}
        </Text>
        <View
          style={[
            styles.backgroundjj,
            {backgroundColor: '#0C8CE91F', opacity: 0.7},
          ]}>
          <Text style={[styles.statusText, {color: '#0C8CE9'}]}>
            {item.od_delivery_status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
  //   {
  //     id: '1',
  //     name: 'Kerala Prawns',
  //     price: '₹ 1400',
  //     weight: '2.0kg',
  //     description: 'Kerala prawns, known for their rich flavor and tende...',
  //     image: require("../../../assets/images/Fishimage/splashimage.png"),
  //     rating: '4.8',
  //     status: 'Delivered | 29 jan 2025',
  //     statusColor: '#0C8CE9',
  //     bg: "#0C8CE91F"

  // }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#87CEEB"
        barStyle="dark-content"
        hidden={false}
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../../assets/images/Fishimage/Back.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.op_id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View style={styles.footer} />}
      />
      <TouchableOpacity
        style={styles.buyNowButton}
        onPress={() => navigation.navigate('BottomtabHome')}>
        <Text style={styles.buyNowText}>Back To Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
    marginTop: 20,
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  listContainer: {},
  orderCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',

    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buyNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  buyNowButton: {
    width: '100%',

    height: 48,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  orderImage: {
    width: 180,
    height: 150,
    borderRadius: 4,
  },
  orderDetails: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212121',
    flex: 1,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#212121',
    marginLeft: 4,
  },
  priceRow: {
    flexDirection: 'row',

    alignItems: 'center',
    marginVertical: 4,
  },
  priceText: {
    fontSize: 15,
    fontWeight: '900',

    color: '#0C8CE9',
  },
  pricekg: {
    fontSize: 15,
    fontWeight: '500',
    color: '#212121',
  },
  descriptionText: {
    fontSize: 14,
    color: '#757575',
    marginBottom: 8,
    lineHeight: 18,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '900',
    textAlign: 'center',
  },

  backgroundjj: {
    alignItems: 'center',
    paddingVertical: 5,
    borderRadius: 4,
  },
  footer: {height: 60},
});

export default My_Order;
