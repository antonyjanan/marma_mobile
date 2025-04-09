import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
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
} from 'react-native';

const Cart = () => {
  const navigation = useNavigation();

  const [cartItems, setCartItems] = useState([
    {
      id: '1',
      name: 'Kerala Prawns',
      price: 350,
      image: 'https://i.imgur.com/nVQzl1Z.jpg',
      quantity: 5,
      deliveryTitlefee: 40,
    },
    {
      id: '2',
      name: 'Fresh Salmon',
      price: 400,
      image: 'https://i.imgur.com/nVQzl1Z.jpg',
      quantity: 14,
      deliveryTitlefee: 40,
    },
    {
      id: '3',
      name: 'King Crab',
      price: 500,
      image: 'https://i.imgur.com/nVQzl1Z.jpg',
      quantity: 12,
      deliveryTitlefee: 40,
    },
    {
      id: '4',
      name: 'Tuna Fish',
      price: 450,
      image: 'https://i.imgur.com/nVQzl1Z.jpg',
      quantity: 1,
      deliveryTitlefee: 0,
    },
  ]);

  // Function to update quantity
  const updateQuantity = (id, action) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? {
              ...item,
              quantity:
                action === 'increase'
                  ? item.quantity + 1
                  : Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  };

  // Total calculations
  const totalItemPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );
  const totalDeliveryFee = cartItems.reduce(
    (acc, item) => acc + item.deliveryTitlefee,
    0,
  );
  const grandTotal = totalItemPrice + totalDeliveryFee;

  // Render cart items
  const renderItem = ({item}) => {
    const totalPrice = item.price * item.quantity;

    return (
      <View style={styles.itemContainer}>
        <Image
          source={{uri: item.image}}
          style={styles.itemImage}
          resizeMode="cover"
        />

        <View style={styles.itemDetailsContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceSymbol}>₹</Text>
            <Text style={styles.price}>{item.price}</Text>
            <Text style={styles.quantity}> / 500gm</Text>
          </View>

          <Text style={styles.itemDescription} numberOfLines={2}>
            Fresh and high-quality seafood sourced directly from the best
            suppliers.
          </Text>

          <View style={styles.deliveryInfoRow}>
            <Text style={styles.deliveryTimeText}>Delivery in 45mins.</Text>
            <Text style={styles.originalPriceText}>₹40</Text>
            <Text style={styles.freeText}>FREE</Text>
          </View>

          <View style={styles.quantityContainer}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, 'decrease')}>
              <Text style={styles.quantityButtonText}>−</Text>
            </TouchableOpacity>

            <Text style={styles.quantityText}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => updateQuantity(item.id, 'increase')}>
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
        <Text style={styles.headerTitle}>Order Summary</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.contentContainer}>
        {/* Delivery Information */}
        <View style={styles.deliveryInfoContainer}>
          <View style={styles.deliveryTitleContainer}>
            <Text style={styles.deliveryTitle}>Delivered to:</Text>
            <View style={styles.officeTag}>
              <Text style={styles.officeTagText}>OFFICE</Text>
            </View>
          </View>

          <View style={styles.deliveryDetailsContainer}>
            <View>
              <Text style={styles.customerName}>Irma Juwan</Text>
              <Text style={styles.addressText}>8502 Preston Rd.</Text>
              <Text style={styles.addressText}>Inglewood, Maine 98380</Text>
              <Text style={styles.addressText}>Pin - 684208</Text>
              <Text style={styles.addressText}>
                Mobile Number +91 7826 598110
              </Text>
            </View>
            <TouchableOpacity style={styles.changeButton}>
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.orderItemsContainer}>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id}
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
            <Text style={styles.priceValue}>₹ {totalDeliveryFee}.00</Text>
          </View>

          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total-Price</Text>
            <Text style={styles.totalValue}>₹ {grandTotal}.00</Text>
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton}>
          <Text style={styles.continueButtonText}>Continue</Text>
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
