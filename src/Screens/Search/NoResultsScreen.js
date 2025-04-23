import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ToastAndroid,
} from 'react-native';
import {Appstrings} from '../../Contants/Appstrings';

const {width, height} = Dimensions.get('window');

const NoResultsScreen = () => {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [cartVisible, setCartVisible] = useState({});
  const baseurl = 'https://healthyfresh.lunarsenterprises.com';

  useEffect(() => {
    productList();
  }, []);

  const productList = () => {
    fetch('https://healthyfresh.lunarsenterprises.com/fishapp/list/products', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {
          setProducts(data.list);
          setFilteredProducts(data.list);
        } else {
          console.log(data.message, 'error in banner response');
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };
  const addToCart = async (id, qa) => {
    let user_id = await AsyncStorage.getItem(Appstrings.USER_ID);
    let requestbody = {
      u_id: user_id,
      p_id: id,
      quantity: qa,
    };

    fetch('https://healthyfresh.lunarsenterprises.com/fishapp/add/cart', {
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
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };
  const handleSearch = text => {
    setSearchQuery(text);
    if (text.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(item =>
        item.p_name?.toLowerCase().includes(text.toLowerCase()),
      );
      setFilteredProducts(filtered);
    }
  };
  const toggleCart = index => {
    setCartVisible(prev => ({
      ...prev,
      [index]: !prev[index],
    }));
  };
  const renderProductItem = ({item, index}) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('Product_view_Screen', item.p_id)}>
      <Image
        source={
          item.p_image ? {uri: baseurl + item.p_image} : baseurl + item.p_image
        }
        style={styles.offerImage}
        resizeMode="cover"
      />

      <View style={styles.offerDetailsRow}>
        <View style={{flex: 1}}>
          <Text style={styles.offerName}>{item.p_name}</Text>
          <View style={styles.Star}>
            <Image
              source={require('../../assets/images/Fishimage/star.png')}
              style={styles.starIcon}
            />
            <Text style={styles.ratingText}>4.5</Text>
          </View>
        </View>

        <View style={{alignItems: 'flex-end'}}>
          {item.p_discount_price > 0 && (
            <Text style={{textDecorationLine: 'line-through', fontSize: 12}}>
              ₹ {item.p_orgianl_price}
            </Text>
          )}
          <Text style={styles.offerPrice}>
            ₹
            {item.p_discount_price
              ? item.p_discount_price
              : item.p_orgianl_price}{' '}
            / <Text style={styles.grams}>{item?.p_unit}gms</Text>
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => {
          addToCart(item.p_id, 1);
          toggleCart(index);
        }}>
        <Text style={styles.addToCartText}>
          {cartVisible[index] ? 'Carted' : 'Add to Cart'}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>
        Find Your{'\n'}
        <Text style={styles.bold}>Favorite One...!</Text>
      </Text>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search menu, restaurant or etc"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={handleSearch}
        />
        <View style={styles.filterBox}>
          <Image
            source={require('../../assets/images/Fishimage/Filter.png')}
            style={styles.filterIconImage}
          />
        </View>
      </View>

      {/* Conditional Content */}
      {filteredProducts.length > 0 ? (
        <FlatList
          data={filteredProducts}
          renderItem={renderProductItem}
          keyExtractor={item => item.p_id}
          contentContainerStyle={styles.productList}
        />
      ) : (
        <View style={styles.noResultContainer}>
          <Image
            source={require('../../assets/images/notfound.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.noResultText}>We couldn’t find any result!</Text>
          <Text style={styles.description}>
            Please check your search for any type{'\n'}or spelling errors, or
            try a different{'\n'}search term.
          </Text>
        </View>
      )}
    </View>
  );
};

export default NoResultsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  closeButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  closeText: {
    fontSize: 28,
    fontWeight: '300',
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '400',
    marginTop: 20,
  },
  bold: {
    fontWeight: '700',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 24,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#000',
  },
  filterBox: {
    marginLeft: 10,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  filterIconImage: {
    height: 18,
    width: 18,
    marginHorizontal: 10,
  },
  productList: {
    paddingTop: 20,
    paddingBottom: 100,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  offerImage: {
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
    objectFit: 'cover',
  },
  offerDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  offerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  Star: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    width: 20,
    height: 20,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 3,
    color: '#666',
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
  noResultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60,
  },
  image: {
    width: 180,
    height: 180,
  },
  noResultText: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 24,
  },
  description: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: 10,
    lineHeight: 20,
  },
});
