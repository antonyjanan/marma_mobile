import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
} from 'react-native';

import StepIndicator from 'react-native-step-indicator';

const offerItems = [
  {
    id: 1,
    name: 'Kerala Fish',
    price: '₹150',
    quality: '500gm',

    rating: 4.8,
    image: require('../../../assets/images/Fishimage/splashimage.png'),
  },
  {
    id: 2,
    name: 'Kerala Prawn',
    price: '₹350',
    quality: '500gm',

    rating: 4.8,
    image: require('../../../assets/images/Fishimage/splashimage.png'),
  },
  {
    id: 3,
    name: 'Lobster',
    price: '₹500 / 500gm',
    quality: '500gm',

    rating: 4.9,
    image: require('../../../assets/images/Fishimage/splashimage.png'),
  },
];
const {width, height} = Dimensions.get('window');

const Myorder_Tracking = () => {
  const navigation = useNavigation();

  const [saveCard, setSaveCard] = useState(false);

  const toggleSaveCard = () => setSaveCard(!saveCard);

  const handleChangeAddress = () => {
    console.log('Change address button pressed');
  };

  const handleSeeAll = () => {
    console.log('See all trending items pressed');
  };

  // Order tracking steps

  const labels = ['Cart', 'Delivery', 'Payment', 'Order Confirmed'];
  const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 3,
    stepStrokeCurrentColor: '#0C8CE9',
    stepStrokeWidth: 3,
    stepStrokeFinishedColor: '#fe7013',
    stepStrokeUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: '#fe7013',
    separatorUnFinishedColor: '#aaaaaa',
    stepIndicatorFinishedColor: '#fe7013',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#fe7013',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: 'black',
    labelSize: 13,
    currentStepLabelColor: '#fe7013',
  };
  const [currentPosition, setCurrentPosition] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#87CEEB"
        barStyle="dark-content"
        hidden={false}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../assets/images/Fishimage/Back.png')}
              style={styles.backButton}
            />
          </TouchableOpacity>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Tracking ID */}
        <View style={styles.trackingIdContainer}>
          <Text style={styles.trackingIdText}>Tracking Id: 265481</Text>
        </View>

        {/* Order Item */}
        <View style={styles.orderItemCard}>
          <Image
            source={require('../../../assets/images/Fishimage/splashimage.png')}
            style={styles.orderImage}
          />
          <View style={styles.orderDetails}>
            <View style={styles.titleRow}>
              <Text style={styles.orderTitle}>Kerala Prawns</Text>
              <View style={styles.ratingContainer}>
                <Image
                  source={require('../../../assets/images/Fishimage/star.png')}
                  style={styles.starIcon}
                  resizeMode="contain"
                />
                <Text style={styles.ratingText}>4.8</Text>
              </View>
            </View>

            <Text style={styles.priceText}>
              ₹ 1400
              <Text style={styles.priceTextkg}> / 2.0kg</Text>
            </Text>
            <Text style={styles.descriptionText} numberOfLines={2}>
              Kerala prawns, known for their rich flavor and tende...
            </Text>

            <View style={styles.deliveryInfoRow}>
              <Text style={styles.deliveryTimeText}>Delivery in 45mins.</Text>
              <Text style={styles.originalPriceText}>₹40</Text>
              <Text style={styles.freeText}>FREE</Text>
            </View>
          </View>
        </View>

        {/* Payment Info */}
        <View style={styles.paymentInfoCard}>
          <View style={styles.paymentHeaderRow}>
            <View>
              <Text style={styles.paymentHeaderText}>Payment: Card</Text>

              <View style={styles.saveCardRow}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={toggleSaveCard}>
                  <View
                    style={[
                      styles.checkbox,
                      saveCard && styles.checkboxChecked,
                    ]}>
                    {saveCard && (
                      <Image
                        source={require('../../../assets/images/Fishimage/Tick.png')}
                        style={styles.starIcon}
                        resizeMode="contain"
                      />
                    )}
                  </View>
                </TouchableOpacity>
                <Text style={styles.saveCardText}>
                  Save this card for future payments.
                </Text>
              </View>
            </View>
            <View>
              <View style={styles.successBadge}>
                <Text style={styles.successText}>Successful</Text>
              </View>
              <Text style={styles.dateTimeText}>
                Date: 12 feb 2025 {'\n'}03:59 pm
              </Text>
            </View>
          </View>
        </View>

        {/* Order Tracking */}
        <View style={styles.trackingSection}>
          <Text style={styles.sectionTitle}>Track Order</Text>

          <StepIndicator
            customStyles={customStyles}
            currentPosition={currentPosition}
            labels={labels}
            stepCount={labels.length}
          />
        </View>

        {/* Delivery Address */}
        <View style={styles.deliverySection}>
          <View style={styles.deliveryHeaderRow}>
            <Text style={styles.deliveryToText}>Delivered to:</Text>
            <View style={styles.officeBadge}>
              <Text style={styles.officeText}>OFFICE</Text>
            </View>
          </View>

          <View style={styles.addressRow}>
            <View style={styles.addressContainer}>
              <Text style={styles.nameText}>Irma Juwan</Text>
              <Text style={styles.addressText}>6502 Preston Rd.</Text>
              <Text style={styles.addressText}>Inglewood, Maine 98380</Text>
              <Text style={styles.contactText}>Pin - 684208</Text>
              <Text style={styles.contactText}>
                Mobile Number +91 7826 59810
              </Text>
            </View>
            <View style={styles.changeButtonss}>
              <TouchableOpacity
                style={styles.changeButton}
                onPress={handleChangeAddress}>
                <Text style={styles.changeButtonText}>Change</Text>
              </TouchableOpacity>
              <Text style={styles.updateAddressText}>
                Update your address before your order is packed
              </Text>
            </View>
          </View>
        </View>

        {/* Price Details */}
        <View style={styles.priceDetailsSection}>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Sub-total</Text>
            <Text style={styles.priceValue}>₹ 1900.00</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.priceLabel}>Delivery-fee</Text>
            <Text style={styles.priceValue}>₹ 00.00</Text>
          </View>
          <View style={[styles.priceRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total-Price</Text>
            <Text style={styles.totalValue}>₹ 1400.00</Text>
          </View>
        </View>

        {/* Trending List */}
        <View style={styles.trendingSection}>
          <View style={styles.trendingHeaderRow}>
            <Text style={styles.sectionTitle}>Trending List</Text>
            <TouchableOpacity onPress={handleSeeAll}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* Trending items would go here - just showing placeholders */}
          {/* Horizontal Scroll View */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}>
            {offerItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.offerItem}
                onPress={() => navigation.navigate('Product_view_Screen')}>
                {/* Favorite Button */}
                {/* <TouchableOpacity
                                     style={styles.favoriteIcon}
                                     onPress={() => toggleFavorite(index)}
                                   >
                                     <Image
                                       source={
                                         favorites[index]
                                           ? require('../../../assets/images/Fishimage/favourtieheart.png') 
                                           : require('../../../assets/images/Fishimage/unfavourtie.png') 
                                       }
                                       style={[
                                         styles.heartIcon,
                                         favorites[index] ? styles.favoriteHeart : styles.unfavoriteHeart
                                       ]}
                                       resizeMode="contain"
                                     />
                   
                                   </TouchableOpacity> */}

                <Image source={item.image} style={styles.offerImage} />

                <View style={styles.offerDetails}>
                  <Text style={styles.offerName}>{item.name}</Text>

                  <View style={styles.Star}>
                    <Image
                      source={
                        require('../../../assets/images/Fishimage/star.png') // Red Heart
                      }
                      style={styles.starIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.ratingText}>{item.rating}</Text>
                  </View>
                </View>
                <Text style={styles.offerPrice}>
                  {item.price} /{' '}
                  <Text style={styles.grams}>{item.quality}</Text>
                </Text>

                {/* Add to Cart Button
                                   <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
                                     <Text style={styles.addToCartText}>Add to Cart</Text>
                                   </TouchableOpacity> */}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#EEEEEE',
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
  content: {
    flex: 1,
  },
  trackingIdContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    marginBottom: 10,
  },
  trackingIdText: {
    fontSize: 15,
    fontWeight: '500',
  },
  orderItemCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginTop: 1,
  },
  orderImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
  },
  orderDetails: {
    flex: 1,
    marginLeft: 12,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 2,
    color: '#878787',
  },
  priceText: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
    color: '#0C8CE9',
  },
  priceTextkg: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
    color: 'black',
  },
  descriptionText: {
    fontSize: 14,
    color: 'black',
    marginBottom: 4,
  },
  deliveryInfoRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',

    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: '#0C8CE91F',
  },
  deliveryTimeText: {
    fontSize: 14,
    color: '#1E88E5',
    marginRight: 8,
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
  paymentInfoCard: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    marginTop: 12,
  },
  paymentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: 12,
  },
  paymentHeaderText: {
    fontSize: 16,
    fontWeight: '600',
  },
  successBadge: {
    borderWidth: 2,
    borderColor: '#42B704',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 3,
    borderRadius: 4,
    marginBottom: 2,
  },
  successText: {
    color: '#42B704',
    fontSize: 14,
    fontWeight: '500',
  },
  saveCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  checkboxContainer: {
    marginRight: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#1E88E5',
    borderColor: '#1E88E5',
  },
  saveCardText: {
    fontSize: 14,
  },
  dateTimeText: {
    fontSize: 12,
    color: 'black',
    textAlign: 'right',
  },
  trackingSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    marginTop: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },

  deliverySection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 12,
  },
  deliveryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliveryToText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 12,
    color: '#0C8CE9',
  },
  officeBadge: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
  },
  officeText: {
    fontSize: 12,
    color: '#555',
  },
  addressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  nameText: {
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 4,
  },
  addressText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  contactText: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  changeButtonss: {
    alignItems: 'center',
  },
  changeButton: {
    borderWidth: 1,
    borderColor: '#0C8CE9',
    borderRadius: 4,
    alignItems: 'center',
    height: 30,
    width: 120,
    justifyContent: 'center',
    backgroundColor: '#0C8CE91F',
  },
  changeButtonText: {
    color: '#1E88E5',
    fontSize: 14,
    fontWeight: '500',
  },
  updateAddressText: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 10,
    color: '#1E88E5',
    textAlign: 'center',
    width: 150,
  },
  beforeOrderText: {
    fontSize: 13,
    color: '#1E88E5',
    textAlign: 'center',
  },
  priceDetailsSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: '#555',
  },
  priceValue: {
    fontSize: 14,
    color: '#555',
  },
  totalRow: {
    marginTop: 4,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  totalValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E88E5',
  },
  trendingSection: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginTop: 12,
    marginBottom: 20,
  },
  trendingHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllText: {
    color: '#C2C2C2',
    fontSize: 14,
  },
  //-------------offer------ item

  scrollView: {
    // backgroundColor:'red',
    paddingBottom: 20,
  },
  offersSection: {
    marginVertical: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  seeAllText: {
    fontSize: 14,
    color: '#C2C2C2',
  },
  offerItem: {
    width: width * 0.45, // Show 2 items per row
    marginHorizontal: width * 0.025, // Add spacing
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
    backgroundColor: 'white',
    width: 30, // Slightly larger for better touch
    height: 30,
    borderRadius: 50, // Fully rounded
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3, // For Android shadow
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: {width: 0, height: 2}, // Shadow direction
    shadowOpacity: 0.3, // Shadow visibility
    shadowRadius: 3, // Blurriness
  },

  heartIcon: {
    width: 20,
    height: 20,
  },
  favoriteHeart: {
    width: 20,
    height: 20,
    tintColor: 'red', // Red color for selected heart
  },
  unfavoriteHeart: {
    width: 20,
    height: 20,
    tintColor: 'gray', // Gray color for unselected heart
  },

  starIcon: {
    width: 20,
    height: 20,
  },
  offerImage: {
    width: 165,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  offerName: {
    fontSize: 14,
    fontWeight: 'bold',

    marginBottom: 5,
  },

  Star: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  offerDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    paddingHorizontal: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  offerPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0C8CE9',
  },
  grams: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 3,
    color: '#666',
  },
  addToCartButton: {
    marginTop: 10,
    backgroundColor: '#0C8CE9',
    paddingVertical: 6,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Myorder_Tracking;
