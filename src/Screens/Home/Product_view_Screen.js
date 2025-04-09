import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';

const offerItems = [
  {
    id: 1,
    name: 'Kerala Fish',
    price: '₹150',
    quality: '500gm',

    rating: 4.8,
    image: require('../../assets/images/Fishimage/splashimage.png'),
  },
  {
    id: 2,
    name: 'Kerala Prawn',
    price: '₹350',
    quality: '500gm',

    rating: 4.8,
    image: require('../../assets/images/Fishimage/splashimage.png'),
  },
  {
    id: 3,
    name: 'Lobster',
    price: '₹500 / 500gm',
    quality: '500gm',

    rating: 4.9,
    image: require('../../assets/images/Fishimage/splashimage.png'),
  },
];
const {width, height} = Dimensions.get('window');
const Product_view_Screen = ({route}) => {
  const navigation = useNavigation();
  const params = route.params || '';

  const [quantity, setQuantity] = useState(1);
  const [isReadMoreVisible, setIsReadMoreVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [productView, setProductview] = useState([]);
  const [similar, setSimilar] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const incrementQuantity = () => setQuantity(quantity + 1);
  const decrementQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleReadMore = () => setIsReadMoreVisible(!isReadMoreVisible);

  const handleAddToCart = () => {
    console.log('Added to cart:', quantity, 'Kerala Prawns');
  };

  const handleBuyNow = () => {
    console.log('Buy now:', quantity, 'Kerala Prawns');
  };

  const handleSeeAll = () => {
    console.log('See all trending items pressed');
  };
  const fetchProduct = () => {
    fetch('https://healthyfresh.lunarsenterprises.com/fishapp/view-product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({p_id: params}),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data, 'listing');

        if (data.result) {
          setProductview(data?.list || []);
          setSimilar(data.similar || []);
        } else {
          console.log('Error fetching subcategories:', data.message);
          setProductview([]);
        }
      })
      .catch(error => {
        console.log('Subcategory API error:', error);
        setProductview([]);
      });
  };
  const pricePerUnit = productView[0]?.p_orgianl_price; // ₹350 per 500gm
  const totalPrice = quantity * pricePerUnit; // Dynamic total price
  const baseurl = 'https://healthyfresh.lunarsenterprises.com';
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Swiper for Product Images */}
        <View style={styles.imageContainer}>
          <Swiper
            style={styles.wrapper}
            showsPagination={true}
            autoplay={true}
            loop={true}>
            <Image
              source={{uri: baseurl + productView[0]?.p_image}}
              style={styles.productImage}
            />
            {/* <Image
              source={require('../../assets/images/Fishimage/splashimage.png')}
              style={styles.productImage}
            />
            <Image
              source={require('../../assets/images/Fishimage/splashimage.png')}
              style={styles.productImage}
            /> */}
          </Swiper>

          {/* Back Button */}
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Image
              source={require('../../assets/images/Fishimage/Back.png')}
              style={styles.backButtonimage}
            />
          </TouchableOpacity>

          {/* Favorite Button */}
          <TouchableOpacity
            style={styles.favoriteIcon}
            onPress={toggleFavorite}>
            <Image
              source={
                isFavorite
                  ? require('../../assets/images/Fishimage/favourtieheart.png') // Red Heart
                  : require('../../assets/images/Fishimage/unfavourtie.png') // Gray Heart
              }
              style={styles.heartIcon}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        {/* Product Content */}
        <View style={styles.contentContainer}>
          {/* Product Title and Badge */}
          <View style={styles.titleContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.productTitle}>
                {productView[0]?.p_name} <Text style={styles.emojiText}></Text>
              </Text>
              <View style={styles.badgeContainer}>
                <Text style={styles.badgeText}>Best Seller</Text>
              </View>
            </View>
            <Text style={styles.priceText}>
              ₹ {pricePerUnit}
              <Text style={styles.priceTextgm}>
                {' '}
                / {productView[0]?.p_stocks} gm
              </Text>
            </Text>
          </View>

          {/* Delivery Info */}
          <View style={styles.deliveryInfoContainer}>
            <View style={styles.deliveryItem}>
              <Image
                source={require('../../assets/images/Fishimage/Freedelivery.png')}
                style={styles.icons}
                resizeMode="contain"
              />

              <Text style={styles.deliveryText}>Free Delivery</Text>
            </View>

            <View style={styles.deliveryItem}>
              <Image
                source={require('../../assets/images/Fishimage/Timing.png')}
                style={styles.Timing}
                resizeMode="contain"
              />
              <Text style={styles.deliveryText}>20 - 30 min</Text>
            </View>

            <View style={styles.deliveryItem}>
              <Image
                source={require('../../assets/images/Fishimage/Starblue.png')}
                style={styles.Timing}
                resizeMode="contain"
              />
              <Text style={styles.deliveryText}>4.5</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionTitle}>Description</Text>
            <Text
              style={styles.descriptionText}
              numberOfLines={isReadMoreVisible ? null : 3}>
              {productView[0]?.p_description}
            </Text>
            <TouchableOpacity onPress={toggleReadMore}>
              <Text style={styles.readMoreText}>
                {isReadMoreVisible ? 'Read Less' : 'Read More'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quantity and Total Price */}
          <View style={styles.quantityContainer}>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={decrementQuantity}>
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={incrementQuantity}>
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.totalPrice}>₹ {totalPrice}</Text>
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
            {similar?.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.offerItem}
                onPress={() =>
                  navigation.navigate('Product_view_Screen', item.p_id)
                }>
                {/* Favorite Button */}
                {/* <TouchableOpacity
                  style={styles.favoriteIcon}
                  onPress={() => toggleFavorite(index)}>
                  <Image
                    source={
                      favorites[index]
                        ? require('../../../assets/images/Fishimage/favourtieheart.png')
                        : require('../../../assets/images/Fishimage/unfavourtie.png')
                    }
                    style={[
                      styles.heartIcon,
                      favorites[index]
                        ? styles.favoriteHeart
                        : styles.unfavoriteHeart,
                    ]}
                    resizeMode="contain"
                  />
                </TouchableOpacity> */}

                <Image
                  source={{uri: baseurl + item.p_image}}
                  style={styles.offerImage}
                />

                <View style={styles.offerDetails}>
                  <Text style={styles.offerName}>{item.p_name}</Text>

                  <View style={styles.Star}>
                    <Image
                      source={
                        require('../../assets/images/Fishimage/star.png') // Red Heart
                      }
                      style={styles.starIcon}
                      resizeMode="contain"
                    />
                    <Text style={styles.ratingText}>4.5</Text>
                  </View>
                </View>
                <Text style={{textDecorationLine: 'line-through'}}>
                  ₹ {item.p_orgianl_price}
                </Text>
                <Text style={styles.offerPrice}>
                  ₹ {item.p_discount_price} /{' '}
                  <Text style={styles.grams}>{item.p_stocks} gm</Text>
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}>
          <Image
            source={require('../../assets/images/Fishimage/Cartblue.png')}
            style={styles.cartblue}
            resizeMode="contain"
          />
          <Text style={styles.addToCartText}>Add to Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyNowButton} onPress={handleBuyNow}>
          <Text style={styles.buyNowText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContainer: {paddingBottom: 80, backgroundColor: 'white'},
  imageContainer: {
    width: '100%',
    height: 300,
  },
  wrapper: {
    height: 300,
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  icons: {
    width: 20,
    height: 23,
  },
  Timing: {
    width: 14,
    height: 14,
  },

  cartblue: {
    width: 18,
    height: 18,
    marginRight: 10,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonimage: {
    width: 40,
    height: 40,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1,
    backgroundColor: 'white',
    width: 30,
    height: 30,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  heartIcon: {
    width: 20,
    height: 20,
  },
  contentContainer: {
    marginTop: -20,
    zIndex: 999,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: 'white',

    paddingHorizontal: 16,
    paddingTop: 24,
  },
  titleContainer: {
    marginBottom: 16,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000000',
  },
  emojiText: {
    fontSize: 20,
  },
  badgeContainer: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '500',
  },
  priceText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#007AFF',
  },
  priceTextgm: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '500',
    marginHorizontal: 16,
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: '600',
    color: '#007AFF',
  },
  actionButtonsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#fff',
    padding: 16,
    justifyContent: 'space-between',
  },
  addToCartButton: {
    width: '48%',

    height: 48,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,

    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    flexDirection: 'row',
  },
  buyNowButton: {
    width: '48%',

    height: 48,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //-----------

  deliveryInfoContainer: {
    flexDirection: 'row',
    backgroundColor: '#F0F8FF',
    borderRadius: 8,
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 20,
  },

  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },

  deliveryText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#333333',
  },

  buyNowText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },

  descriptionContainer: {
    marginBottom: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 20,
    color: 'black',
  },
  readMoreText: {
    color: '#007AFF',
    marginTop: 4,
    fontSize: 14,
    fontWeight: '500',
  },

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
});

export default Product_view_Screen;
