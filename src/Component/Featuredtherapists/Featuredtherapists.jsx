import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';


import one from '../../assets/images/marmasset/one.png';
import two from '../../assets/images/marmasset/two.png';

import three from '../../assets/images/marmasset/three.png';

import four from '../../assets/images/marmasset/four.png';

export default function Featuredtherapists() {
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
      rating: 4.9,
      reviews: 300,
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

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {nearbyTherapists.map((item, index) => (
        <View key={index} style={styles.therapistCard}>
          <Image source={item.image} style={styles.therapistImage} />
          <View style={styles.therapistdetail}>
            <View>
              <Text style={styles.therapistName}>{item.name}</Text>
              <Text style={styles.therapistSpecialty}>{item.specialty}</Text>
            </View>
            {item.rating && (
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
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {fontSize: 16, fontWeight: '600', marginBottom: 8},
  category: {alignItems: 'center', marginRight: 12},
  categoryImage: {width: 74, height: 74, borderRadius: 32},
  categoryLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '400',
    fontFamily: 'roboto',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  linkText: {
    fontSize: 12,
    color: '#1F1F1F',
    fontWeight: '400',
    fontFamily: 'roboto',
  },
  therapistCard: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 10,
    marginRight: 12,
    padding: 8,
    marginBottom: 10,
    elevation: 2,
  },
  therapistImage: {width: '100%', height: 150, borderRadius: 10},

  therapistdetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  therapistName: {fontWeight: 'bold', marginTop: 6},
  therapistSpecialty: {
    fontSize: 11,
    color: '#666',
    marginTop: 5,
    marginBottom: 5,
  },
  therapistRating: {fontSize: 11, color: 'red'},
  therapistLocation: {fontSize: 10, color: '#888'},
  detailsButton: {
    backgroundColor: 'red',
    height: 42,
    borderRadius: 100,
    marginTop: 10,
    justifyContent: 'center',
  },
  detailsButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'roboto',
    fontWeight: '600',
  },
  featuredImage: {
    width: '100%',
    height: 120,
    borderRadius: 10,
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderColor: '#eee',
    paddingVertical: 10,
  },
  navItem: {alignItems: 'center'},
  navItemActive: {alignItems: 'center'},
  navText: {fontSize: 11, color: '#aaa', marginTop: 4},
  navTextActive: {fontSize: 11, color: 'red', marginTop: 4},
});
