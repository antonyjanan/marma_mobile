import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import one from '../../assets/images/marmasset/one.png';
import two from '../../assets/images/marmasset/two.png';
import three from '../../assets/images/marmasset/three.png';
import four from '../../assets/images/marmasset/four.png';
import {useNavigation} from '@react-navigation/core';

const screenWidth = Dimensions.get('window').width;
const CARD_WIDTH = (screenWidth - 36) / 2; // 16 padding + 10 margin between = 26

export default function Category_details() {
  const navigation = useNavigation();

  const goBack = () => {
    navigation.goBack();
  };
  const nearbyTherapists = [
    {
      name: 'Nguyen, Shane',
      specialty: 'Foot Reflexology Specialist',
      rating: 4.9,
      reviews: 300,
      location: 'Syracuse, Connecticut',
      distance: '12 km',
      image: one,
    },
    {
      name: 'Nguyen, Sha',
      specialty: 'Full Body Massage S',
      location: '2118 Thorn',
      image: two,
      rating: 4.9,
      reviews: 300,
    },
    {
      name: 'Nguyen, Shane',
      specialty: 'Foot Reflexology Specialist',
      rating: 4.9,
      reviews: 300,
      location: 'Syracuse, Connecticut',
      distance: '12 km',
      image: three,
    },
    {
      name: 'Nguyen, Sha',
      specialty: 'Full Body Massage S',
      location: '2118 Thorn',
      image: four,
      rating: 0,
      reviews: 0,
    },
  ];

  const renderItem = ({item}) => (
    <View style={styles.therapistCard}>
      <Image source={item.image} style={styles.therapistImage} />
      <View style={styles.therapistdetail}>
        <View>
          <Text style={styles.therapistName}>{item.name}</Text>
          <Text style={styles.therapistSpecialty}>{item.specialty}</Text>
        </View>
        {item.rating > 0 && (
          <View style={{flexDirection: 'row', marginTop: 5}}>
            <Image
              source={require('../../assets/images/marmasset/star.png')}
              style={{height: 10, width: 10, marginTop: 2, marginRight: 4}}
              resizeMode="contain"
            />
            <Text style={styles.therapistRating}>
              {item.rating} ({item.reviews} reviews)
            </Text>
          </View>
        )}
      </View>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Image
          source={require('../../assets/images/marmasset/cardloco.png')}
          style={{height: 20, width: 20}}
          resizeMode="contain"
        />
        <Text style={styles.therapistLocation}>
          {item.location}
          {item.distance ? ` | ${item.distance}` : ''}
        </Text>
      </View>
      <TouchableOpacity style={styles.detailsButton}>
        <Text style={styles.detailsButtonText}>View Details</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Image
              source={require('../../assets/images/marmasset/Back.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Category list</Text>
        </View>
      </View>
      <FlatList
        data={nearbyTherapists}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between', marginBottom: 10}}
        contentContainerStyle={{padding: 10}}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},

  therapistCard: {
    backgroundColor: '#fff',
    width: CARD_WIDTH,
    borderRadius: 10,
    padding: 8,
    elevation: 2,

    marginTop: 20,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,

    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 10,
  },
  icon: {
    width: 24,
    height: 24,
  },
  
  illustration: {
    width: 30,
    height: 30,
  },
  therapistImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  therapistdetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  therapistName: {
    fontWeight: 'bold',
    marginTop: 6,
    fontSize: 13,
  },
  therapistSpecialty: {
    fontSize: 11,
    color: '#666',
    marginTop: 5,
    marginBottom: 5,
  },
  therapistRating: {
    fontSize: 11,
    color: 'red',
  },
  therapistLocation: {
    fontSize: 10,
    color: '#888',
    marginLeft: 4,
  },
  detailsButton: {
    backgroundColor: 'red',
    height: 36,
    borderRadius: 100,
    marginTop: 10,
    justifyContent: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 13,
    fontWeight: '600',
  },
});
