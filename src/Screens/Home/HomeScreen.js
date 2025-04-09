import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  Dimensions,
  ImageBackground,
  StatusBar,
} from 'react-native';
import SwiperFlatList from 'react-native-swiper-flatlist';
import Toast from 'react-native-toast-message';

const {width, height} = Dimensions.get('window');
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
const banners = [
  {
    id: '1',
    backgroundColorss: require('../../assets/images/Fishimage/Banner1.png'),
  },
  {
    id: '2',
    backgroundColorss: require('../../assets/images/Fishimage/carosuel.png'),
  },
  {
    id: '3',
    backgroundColorss: require('../../assets/images/Fishimage/Banner.png'),
  },
];

const HomeScreen = () => {
  const navigation = useNavigation();
  const [favorites, setFavorites] = useState({});
  const [cartVisible, setCartVisible] = useState(false);
  const [category, setCategory] = useState([]);
  const [banner, setBanner] = useState([]);
  const [offers, setOffers] = useState([]);

  useEffect(() => {
    categoryList();
    BannerList();
    productList();
  }, []);

  const categoryList = () => {
    fetch('https://healthyfresh.lunarsenterprises.com/fishapp/list/category', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setCategory(data?.list);
        } else {
          console.log(data.message, 'error in category response');
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };
  const BannerList = () => {
    fetch('https://healthyfresh.lunarsenterprises.com/fishapp/list/banner', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        console.log(data, 'daatattaatat');

        if (data.result) {
          setBanner(data?.list);
        } else {
          console.log(data.message, 'error in banner response');
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };
  const productList = () => {
    fetch('https://healthyfresh.lunarsenterprises.com/fishapp/list/products', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setOffers(data?.list);
        } else {
          console.log(data.message, 'error in banner response');
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  const toggleFavorite = index => {
    setFavorites(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const toggleCart = index => {
    setCartVisible(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const addToCart = () => {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Success',
      text2: 'Added to Cart Successfully!',
      visibilityTime: 2000, // 2 seconds
      autoHide: true,
      bottomOffset: 50, // Adjust position
    });
  };
  const getRandomBackground = () => {
    const randomIndex = Math.floor(Math.random() * banners.length);
    return banners[randomIndex].backgroundColorss;
  };
  const bannerWithRandomBackgrounds = banner.map(item => ({
    ...item,
    backgroundImage: getRandomBackground(),
  }));
  const baseurl = 'https://healthyfresh.lunarsenterprises.com/';
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} backgroundColor="white" />
      <ScrollView
        style={{marginTop: 20, marginHorizontal: 20}}
        showsVerticalScrollIndicator={false}>
        {/* Location Header */}
        <View style={styles.headerContainer}>
          <View style={styles.locationContainer}>
            <Image
              source={require('../../assets/images/Fishimage/Location.png')}
              style={styles.locationIcon}
              resizeMode="contain"
            />
            <Text style={styles.locationText}>Jl. Soekarno Hatta 15A...</Text>
          </View>
          <View style={styles.headerIcons}>
            <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
              <Image
                source={require('../../assets/images/Fishimage/Favourite.png')}
                style={styles.locationIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.newStyle}
              onPress={() => navigation.navigate('Notification')}>
              <Image
                source={require('../../assets/images/Fishimage/Notification.png')}
                style={[styles.locationIcon, styles.newStyle]}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.insideseach}>
            <View style={styles.seachtext}>
              <TouchableOpacity style={styles.filterIcon}>
                <Image
                  source={require('../../assets/images/Fishimage/Search.png')}
                  style={styles.filterIconImage}
                />
              </TouchableOpacity>
              <TextInput
                placeholder="Search menu, restaurant or etc"
                style={styles.searchInput}
              />
            </View>
            <TouchableOpacity
              style={styles.filterIcon}
              onPress={() => navigation.navigate('Category')}>
              <Image
                source={require('../../assets/images/Fishimage/Filter.png')}
                style={styles.filterIconImage}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/*Carousel  Discount Banner */}

        <View style={styles.Maincaro}>
          <SwiperFlatList
            autoplay
            autoplayDelay={3}
            autoplayLoop
            index={0}
            showPagination
            paginationStyle={styles.pagination}
            paginationStyleItem={styles.paginationDot}
            data={bannerWithRandomBackgrounds}
            style={{borderRadius: 20}}
            renderItem={({item, index}) => (
              <ImageBackground
                key={item.b_id}
                source={item.backgroundImage}
                style={styles.backgroundImage}
                resizeMode="cover">
                <View style={styles.cardContainer}>
                  <View style={styles.discountBanner}>
                    <View style={styles.bannerTextContainer}>
                      <Text style={styles.bannerTitle}>
                        {item.b_description}
                      </Text>
                      <TouchableOpacity style={styles.orderButton}>
                        <Text style={styles.orderButtonText}>Order now</Text>
                      </TouchableOpacity>
                    </View>
                    <Image
                      src={baseurl + item.b_image}
                      style={styles.bannerImage}
                      resizeMode="contain"
                    />
                  </View>
                </View>
              </ImageBackground>
            )}
          />
        </View>

        {/* Categories */}
        <View style={styles.categoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>All Categories</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Category')}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <SwiperFlatList
            data={category}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.categoryItem}
                onPress={() => navigation.navigate('Category')}>
                <Image
                  src={baseurl + item.c_image}
                  style={styles.categoryIcon}
                />
                <Text style={styles.categoryText}>{item.c_name}</Text>
              </TouchableOpacity>
            )}
            // index={0}
            // showPagination
            // paginationStyle={styles.pagination}
            // paginationStyleItem={styles.paginationDot}
            // paginationActiveColor="#ff5a5f"
            // paginationDefaultColor="#d3d3d3"
            // autoplay
            // autoplayDelay={3}
            // autoplayLoop
            keyExtractor={(item, index) => index.toString()}
          />
        </View>

        {/* Offer Items */}
        <View style={styles.offersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Offer Items</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          {/* Horizontal Scroll View */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.scrollView}>
            {offers?.map((categoryObj, index) => {
              const categoryName = Object.keys(categoryObj)[0];
              const items = categoryObj[categoryName];

              return items?.map(item => (
                <TouchableOpacity
                  key={index}
                  style={styles.offerItem}
                  onPress={() =>
                    navigation.navigate('Product_view_Screen', item.p_id)
                  }>
                  {/* Favorite Button */}
                  <TouchableOpacity
                    style={styles.favoriteIcon}
                    onPress={() => toggleFavorite(index)}>
                    <Image
                      source={
                        favorites[index]
                          ? require('../../assets/images/Fishimage/favourtieheart.png')
                          : require('../../assets/images/Fishimage/unfavourtie.png')
                      }
                      style={[
                        styles.heartIcon,
                        favorites[index]
                          ? styles.favoriteHeart
                          : styles.unfavoriteHeart,
                      ]}
                      resizeMode="contain"
                    />
                  </TouchableOpacity>

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
                  <Text style={styles.offerPrice}>
                    ₹{item.p_discount_price} /{' '}
                    <Text style={styles.grams}>{item.p_stocks}gms/Kg</Text>
                  </Text>

                  {/* Add to Cart Button */}
                  <TouchableOpacity
                    style={styles.addToCartButton}
                    onPress={() => {
                      addToCart();
                      toggleCart(index);
                    }}>
                    <Image
                      source={
                        cartVisible[index]
                          ? require('../../assets/images/Fishimage/Cart.png')
                          : null
                      }
                      style={[
                        styles.heartIcon,
                        cartVisible[index] ? styles.cartHeart : null,
                      ]}
                      resizeMode="contain"
                    />
                    <Text style={styles.addToCartText}>
                      {cartVisible[index] ? 'Carted' : 'Add to Cart'}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ));
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#FFFFFF',
  },
  mainview: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 40,
    height: 40,
  },

  locationIcon: {
    height: 34,
    width: 34,
    borderRadius: 4,
  },
  locationText: {
    marginLeft: 10,
    color: '#101010',
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  newStyle: {
    marginLeft: 5,
  },
  //------search-------------------

  searchContainer: {
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#D6D6D6',
    height: 42,
    marginTop: 10,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
  },

  searchInput: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: 'transparent',
    height: '100%',
    fontSize: 14,
    color: '#878787',
  },

  seachtext: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },

  insideseach: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },

  filterIconImage: {
    height: 18,
    width: 18,
    marginHorizontal: 10,
  },

  filterIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  //------Carousel  Discount Banner-------------------

  Maincaro: {
    marginVertical: 20,
  },
  cardContainer: {
    width: width * 1,

    borderRadius: 20,
  },

  backgroundImage: {
    // marginRight: 10,
    borderRadius: 20,
  },
  discountBanner: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 20,
    padding: 20,
  },
  bannerTextContainer: {
    flex: 1,
    borderRadius: 20,
  },
  bannerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffff',
  },
  orderButton: {
    backgroundColor: '#00E676',
    width: '40%',
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  orderButtonText: {
    color: '#1F1F1F',
    fontWeight: 'bold',
  },
  bannerImage: {
    width: 100,
    height: 100,
    marginRight: 30,
    borderRadius: 12,
  },
  pagination: {
    position: 'absolute',
    bottom: -10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ff5a5f',
    marginHorizontal: 4,
  },
  //------All Categories\----------------
  categoriesSection: {
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
    fontSize: 12,
    color: '#C2C2C2',
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width / 5, // 4 items per row
  },
  categoryIcon: {
    width: 70,
    height: 70,
    borderRadius: 35, // Makes the image round
    borderWidth: 2,
    borderColor: '#ddd',
  },
  categoryText: {
    marginTop: 5,
    fontSize: 12,
    fontWeight: '400',
    textAlign: 'center',
  },
  pagination: {
    marginTop: 10,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  //-------------offer------ item

  scrollView: {
    // backgroundColor:'red',
    paddingBottom: 10,
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

  cartHeart: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: 'white', // Red color for selected heart
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
  addToCartText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default HomeScreen;
