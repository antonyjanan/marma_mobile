import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect, useNavigation} from '@react-navigation/core';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  ScrollView,
  FlatList,
  ToastAndroid,
} from 'react-native';
import {Appstrings} from '../../Contants/Appstrings';

const Cart = () => {
  const navigation = useNavigation();

  const [cartItems, setCartItems] = useState([]);
  const [address, setAddress] = useState([]);

  useFocusEffect(
    useCallback(() => {
      cartList();
      DefaultAddress();
    }, []),
  );

  const updateQuantity = (id, action) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.p_id === id
          ? {
              ...item,
              ct_quantity:
                action === 'increase'
                  ? item.ct_quantity + 1
                  : Math.max(1, item.ct_quantity - 1),
            }
          : item,
      ),
    );
  };

  const totalItemPrice = cartItems.reduce((acc, item) => {
    const price =
      item.p_discount_price && item.p_discount_price !== 0
        ? item.p_discount_price
        : item.p_orgianl_price;
    return acc + price * item.ct_quantity;
  }, 0);

  const totalDeliveryFee = cartItems.reduce(
    (acc, item) => acc + (item.deliveryTitlefee || 0),
    0,
  );

  const grandTotal = totalItemPrice + (totalDeliveryFee ? totalDeliveryFee : 0);
  console.log(totalItemPrice, 'totalItemPrice', grandTotal);

  const cartList = async () => {
    try {
      const user_id = await AsyncStorage.getItem(Appstrings.USER_ID);
      const requestbody = {
        u_id: JSON.parse(user_id),
      };

      const response = await fetch(
        'https://healthyfresh.lunarsenterprises.com/fishapp/list/cart',
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
        setCartItems(data.list);
      } else {
        console.log(data.message, 'error in cart response');
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

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
  const cartDelete = async id => {
    try {
      const user_id = await AsyncStorage.getItem(Appstrings.USER_ID);
      const requestbody = {
        // u_id: JSON.parse(user_id),
        ct_id: id,
      };

      const response = await fetch(
        'https://healthyfresh.lunarsenterprises.com/fishapp/delete',
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
        cartList();
        ToastAndroid.show('Removed Successfully', ToastAndroid.SHORT);
      } else {
        console.log(data.message, 'error in cart respons');
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error, 'error');
    }
  };

  const renderItem = ({item}) => {
    const totalPrice =
      (item.p_discount_price && item.p_discount_price !== 0
        ? item.p_discount_price
        : item.p_orgianl_price) * item.ct_quantity;

    const baseurl = 'https://healthyfresh.lunarsenterprises.com';
    return (
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: baseurl + item.p_image}}
            style={styles.itemImage}
            resizeMode="cover"
          />
          <TouchableOpacity
            style={styles.removeButton}
            onPress={() => {
              // Implement your remove function here
              setCartItems(prev => prev.filter(i => i.p_id !== item.p_id));
              cartDelete(item.ct_id);
            }}>
            <Text style={styles.removeButtonText}>×</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.itemDetailsContainer}>
          <View style={styles.deliveryItem}>
            <Text style={styles.itemName}>{item.p_name}</Text>
            <View style={styles.row}>
              <Image
                source={require('../../assets/images/Fishimage/Starblue.png')}
                style={styles.Timing}
                resizeMode="contain"
              />
              <Text style={styles.deliveryText}>4.5</Text>
            </View>
          </View>
          <Text
            style={[styles.priceSymbol, {textDecorationLine: 'line-through'}]}>
            {item.p_discount_price > 0 ? `₹${item.p_orgianl_price}` : null}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceSymbol}>₹</Text>
            <Text style={styles.price}>
              {item.p_discount_price
                ? item.p_discount_price
                : item.p_orgianl_price}
            </Text>
            <Text style={styles.quantity}> /{item.p_unit}</Text>
          </View>

          <Text style={styles.itemDescription} numberOfLines={2}>
            {item.p_description}
          </Text>

          <View style={styles.deliveryInfoRow}>
            <Text style={styles.deliveryTimeText}>Delivery in 45mins.</Text>
            <Text style={styles.originalPriceText}>₹40</Text>
            <Text style={styles.freeText}>FREE</Text>
          </View>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.p_id, 'decrease')}>
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{item.ct_quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.p_id, 'increase')}>
              <Text style={styles.quantityButtonText}>+</Text>
            </TouchableOpacity>

            <Text style={styles.itemTotalPrice}>₹ {totalPrice}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.headerTitle}>Cart</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.contentContainer}>
        {/* Delivery Information */}
        {/* <View style={styles.deliveryInfoContainer}>
          <View style={styles.deliveryTitleContainer}>
            <Text style={styles.deliveryTitle}>Delivered to:</Text>
            <View style={styles.officeTag}>
              <Text style={styles.officeTagText}>
                {address.ua_type || 'Home'}
              </Text>
            </View>
          </View>

          <View style={styles.deliveryDetailsContainer}>
            <View>
              <Text style={styles.customerName}>
                {address.ua_name}
                {address.ua_address}
              </Text>
              <Text style={styles.addressText}>
                {address.ua_city}
                {address.ua_landmark}
              </Text>
              <Text style={styles.addressText}>
                {address.ua_district}
                {address.ua_state}
                {address.ua_zip_code}
              </Text>
              <Text style={styles.addressText}>
                Pin - {address.ua_zip_code}
              </Text>
              <Text style={styles.addressText}>
                Mobile Number - {address.ua_mobile}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.changeButton}
              onPress={() => navigation.navigate('Address')}>
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View> */}

        {/* Order Items */}
        <View style={styles.orderItemsContainer}>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.p_id.toString()}
            renderItem={renderItem}
            scrollEnabled={false}
            ItemSeparatorComponent={() => <View style={{height: 15}} />} // Adds space between items
            style={{marginTop: 30}}
          />
        </View>
        {/* Price Summary */}
        <View style={styles.priceSummaryContainer}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Sub-total</Text>
            <Text style={styles.priceValue}>₹ {totalItemPrice}.00</Text>
          </View>

          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery-fee</Text>
            <Text style={styles.priceValue}>
              ₹ {totalDeliveryFee ? totalDeliveryFee : 0}.00
            </Text>
          </View>

          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total-Price</Text>
            <Text style={styles.totalValue}>₹ {grandTotal}.00</Text>
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => navigation.navigate('Order_summary')}>
          <Text style={styles.continueButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    marginTop: 20,
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
  imageContainer: {
    position: 'relative',
    width: 150,
    height: 150,
    borderRadius: 8,
    overflow: 'hidden',
  },

  removeButton: {
    position: 'absolute',
    top: 6,
    right: 6,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },

  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
  contentContainer: {
    flex: 1,
  },
  Timing: {
    width: 14,
    height: 14,
  },
  deliveryText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333333',
  },
  deliveryInfoContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  deliveryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0099ff',
  },
  officeTag: {
    marginLeft: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
  officeTagText: {
    fontSize: 12,
    color: '#666',
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 16,
  },
  row: {
    flexDirection: 'row',
  },
  deliveryDetailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  deliveryInfoRow: {
    marginTop: 10,
    marginBottom: 10,

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    paddingVertical: 2,
    borderRadius: 3,
    backgroundColor: '#0C8CE91F',
  },

  originalPriceText: {
    fontSize: 14,
    color: '#888',
    textDecorationLine: 'line-through',
    marginRight: 6,
  },
  freeText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '500',
  },
  customerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  changeButton: {
    borderWidth: 1,
    borderColor: '#0099ff',
    borderRadius: 4,
    paddingHorizontal: 16,
    paddingVertical: 4,
    backgroundColor: '#0C8CE908',
  },
  changeButtonText: {
    color: '#0099ff',
    fontWeight: '600',
  },
  orderItemsContainer: {
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 5,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
  },
  itemImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  itemDetailsContainer: {
    flex: 1,
    marginLeft: 12,
  },
  itemHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 4,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  priceSymbol: {
    fontSize: 14,
    color: '#0099ff',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0099ff',
  },
  quantity: {
    fontSize: 16,
    color: '#666',
  },
  itemDescription: {
    fontSize: 12,
    color: 'black',
    marginTop: 4,
  },

  deliveryTimeText: {
    fontSize: 12,
    color: '#0C8CE9',
  },
  strikeThrough: {
    fontSize: 14,
    color: '#666',
    textDecorationLine: 'line-through',
  },
  freeText: {
    fontSize: 14,
    color: 'green',
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  quantityText: {
    marginHorizontal: 16,
    fontSize: 16,
    fontWeight: '600',
  },
  itemTotalPrice: {
    marginLeft: 'auto',
    fontSize: 18,
    fontWeight: '600',
    color: '#0099ff',
  },
  priceSummaryContainer: {
    marginTop: 8,
    backgroundColor: '#fff',
    padding: 16,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
  },
  priceValue: {
    fontSize: 16,
    color: '#666',
  },
  totalRow: {
    marginTop: 4,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#0099ff',
  },
  buttonContainer: {
    backgroundColor: '#fff',
    padding: 16,
    paddingBottom: 24,
    alignItems: 'center',
  },
  continueButton: {
    backgroundColor: '#0099ff',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  continueButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  homeLine: {
    width: 80,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    marginTop: 16,
  },
});

export default Cart;
