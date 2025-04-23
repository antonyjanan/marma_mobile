import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  TextInput,
} from 'react-native';
import {Appstrings} from '../../Contants/Appstrings';

const Categorylist = () => {
  const [selectedCategory, setSelectedCategory] = useState('Fruits');
  const [expandedCategory, setExpandedCategory] = useState('Fruits');
  const [search, setSearch] = useState(false);
  const [category, setCategory] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [product, setProduct] = useState([]);

  const navigation = useNavigation();
  useEffect(() => {
    categoryList();
  }, []);
  useEffect(() => {
    fetchProduct();
  }, [category]);

  const profileCards = [
    {
      id: 'ethan',
      name: 'Ethan',
      surname: 'Nentran',
      image: require('../../assets/images/Fishimage/splashimage.png'),
    },
    {
      id: 'poovan',
      name: 'Poovan',
      image: require('../../assets/images/Fishimage/splashimage.png'),
    },
    {
      id: 'robusta',
      name: 'robusta',
      image: require('../../assets/images/Fishimage/splashimage.png'),
    },
  ];

  const toggleCategoryExpansion = category => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(category);
    }
  };
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
  const fetchSubcategories = async categoryId => {
    setSubcategories([]);
    const Bearer = await AsyncStorage.getItem(Appstrings.USER_TOCKEN);
    console.log(Bearer, 'Bearer');

    fetch('https://healthyfresh.lunarsenterprises.com/fishapp/subcategory', {
      method: 'GET',
      headers: {
        category_id: categoryId,
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Bearer}`,
      },
      // body: JSON.stringify({category_id: categoryId}),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data, 'dtaasdss');

        if (data.result) {
          setSubcategories(data.data || []);
        } else {
          console.log('Error fetching subcategories:', data.message);
          setSubcategories([]);
        }
      })
      .catch(error => {
        console.log('Subcategory API error:', error);
        setSubcategories([]);
      });
  };
  const fetchProduct = (categoryId, subitem) => {
    console.log(categoryId, subitem, 'subitems');

    const requestBody = {
      category_id: !subitem ? categoryId || category[0]?.c_id : undefined,
      sub_category_id: subitem || '',
    };

    fetch('https://healthyfresh.lunarsenterprises.com/fishapp/list/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data, 'datain product');

        if (data.result) {
          setProduct(data?.list || []);
        } else {
          console.log('Error fetching subcategories:', data.message);
          setProduct([]);
        }
      })
      .catch(error => {
        console.log('Subcategory API error:', error);
        setProduct([]);
      });
  };

  const baseurl = 'https://healthyfresh.lunarsenterprises.com/';
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        backgroundColor="#87CEEB"
        barStyle="dark-content"
        hidden={false}
      />

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
        <Text style={styles.headerTitle}>All Categories</Text>

        {/* {search ? (
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => setSearch(false)}>
            <Image
              source={require('../../assets/images/Fishimage/Close.png')}
              style={styles.backButton}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => setSearch(true)}>
            <Image
              source={require('../../assets/images/Fishimage/SearchCate.png')}
              style={styles.backButton}
            />
          </TouchableOpacity>
        )} */}
        <View />
      </View>
      {/* //------search------------------- */}

      {search && (
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
            <TouchableOpacity style={styles.filterIcon}></TouchableOpacity>
          </View>
        </View>
      )}

      <View style={styles.content}>
        <View style={styles.sidebar}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {category.map(category => (
              <View key={category.c_id}>
                <TouchableOpacity
                  style={[
                    styles.categoryItem,
                    selectedCategory === category.c_name &&
                      styles.selectedCategory,
                  ]}
                  onPress={() => {
                    setSelectedCategory(category.c_name);
                    toggleCategoryExpansion(category.c_name);
                    fetchSubcategories(category.c_id);
                    fetchProduct(category.c_id);
                  }}>
                  <Image
                    src={baseurl + category.c_image}
                    style={styles.categoryIcon}
                  />
                  <Text style={styles.categoryText}>{category.c_name}</Text>
                  <Image
                    source={
                      expandedCategory === category.c_name
                        ? require('../../assets/images/Fishimage/Up.png')
                        : require('../../assets/images/Fishimage/Down.png')
                    }
                    style={styles.downarrow}
                    resizeMode="contain"
                  />
                </TouchableOpacity>

                {expandedCategory === category.c_name && (
                  <View style={styles.subcategoriesContainer}>
                    {subcategories.map(sub => (
                      <TouchableOpacity
                        key={sub.sc_id}
                        style={styles.subcategoryItem}
                        onPress={() => fetchProduct(category.c_id, sub.sc_id)}>
                        <Text style={styles.subcategoryText}>
                          {sub.sc_name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Right content */}
        <View style={styles.mainContent}>
          <View style={styles.profileCardsContainer}>
            {product.map(profile => (
              <View key={profile.p_id} style={styles.profileCard}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Product_view_Screen', profile.p_id)
                  }>
                  <Image
                    source={{uri: baseurl + profile.p_image}}
                    style={styles.profileImage}
                  />
                  <Text style={styles.profileName}>{profile.p_name}</Text>
                  {profile.surname && (
                    <Text style={styles.profileSurname}>{profile.surname}</Text>
                  )}
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },
  downarrow: {
    width: 10,
    height: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: '40%',
    backgroundColor: '#fff',
    borderRightWidth: 1,
    borderRightColor: '#eaeaea',
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#F5F5F5',
  },
  selectedCategory: {
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    backgroundColor: 'white',
  },
  categoryIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 12,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
  },
  expandIcon: {
    marginLeft: 'auto',
  },
  subcategoriesContainer: {
    backgroundColor: '#f8f8f8',
  },
  subcategoryItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    paddingLeft: 28,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  subcategoryText: {
    fontSize: 16,
    color: '#333',
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  profileCardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  profileCard: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 16,
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },
  profileName: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  profileSurname: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
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
    marginHorizontal: 10,
    marginBottom: 10,
    backgroundColor: 'white',
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
});

export default Categorylist;
