import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from 'react-native';

import {useNavigation} from '@react-navigation/core';

export default function SearchComponent() {
  const navigation = useNavigation();

  const handlenoti= () => {
    navigation.navigate('Notification');
  };

  const [currentLocation, setCurrentLocation] = useState(
    'Fetching location...',
  );

  return (
    <View style={styles.header}>
      <View style={styles.locationRow}>
        <View style={styles.iconCircle}>
          <Image
            source={require('../../assets/images/marmasset/homelocation.png')}
            style={styles.iconCircle}
            resizeMode="contain"
          />
        </View>
        <View>
          <Text style={styles.locationLabel}>Current location</Text>
          <Text style={styles.locationText}>
            {currentLocation.length > 24
              ? currentLocation.substring(0, 24) + '...'
              : currentLocation}
          </Text>
        </View>
      </View>
      <TouchableOpacity onPress={handlenoti}  style={{position: 'relative'}}>
        <Image
          source={require('../../assets/images/marmasset/Notify.png')}
          style={styles.iconCircle}
          resizeMode="contain"
        />

        <View
          style={{
            position: 'absolute',
            top: -2,
            right: -2,
            backgroundColor: 'black',
            borderRadius: 18,
            minWidth: 26,
            height: 24,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 2,
          }}>
          <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>
            3
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    fontSize: 12,
  },
  statusTime: {fontSize: 12},
  statusIcons: {fontSize: 12},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  locationRow: {flexDirection: 'row', alignItems: 'center'},
  iconCircle: {
    height: 44,
    width: 44,

    marginRight: 8,
  },
  locationLabel: {
    fontSize: 12,
    color: '#787878',
    fontFamily: 'roboto',
    fontWeight: '400',
  },
  locationText: {fontSize: 13, fontWeight: '600', color: '#1F1F1F'},
  dropdownIcon: {marginLeft: 4, color: '#999'},
  section: {paddingHorizontal: 16, marginTop: 10},
  welcomeTitle: {fontSize: 22, fontWeight: 'bold', fontFamily: 'roboto'},
  subtitle: {
    fontSize: 13,
    color: '#666',
    marginTop: 4,
    fontFamily: 'roboto',
    fontWeight: '400',
  },
  sectionTitle: {fontSize: 16, fontWeight: '600', marginBottom: 8},
  category: {alignItems: 'center', paddingLeft: 20},
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
    marginHorizontal: 16,
    marginTop: 15,
  },
  linkText: {
    fontSize: 12,
    color: '#1F1F1F',
    fontWeight: '400',
    fontFamily: 'roboto',
  },
  therapistCard: {
    backgroundColor: '#fff',
    width: 270,
    borderRadius: 10,

    padding: 8,
    marginBottom: 10,
    elevation: 2,
    marginLeft: 20,
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
