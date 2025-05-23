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

import foot from '../../assets/images/marmasset/foot.png';
import Neck from '../../assets/images/marmasset/Neck.png';
import head from '../../assets/images/marmasset/head.png';
import knee from '../../assets/images/marmasset/knee.png';
import massage from '../../assets/images/marmasset/Massage.png';
import one from '../../assets/images/marmasset/one.png';
import two from '../../assets/images/marmasset/two.png';
import three from '../../assets/images/marmasset/three.png';
import four from '../../assets/images/marmasset/four.png';
import Featuredtherapists from '../../Component/Featuredtherapists/Featuredtherapists';
import {useNavigation} from '@react-navigation/core';
import SearchComponent from '../../Component/SearchComponent/SearchComponent';
import GradientText from '../../Component/GradientQuote/GradientText';
import RequestPendingScreen from '../../Component/RequestPendingScreen/RequestPendingScreen';
import {getUserProfile, therapists_list} from '../../Component/api/apiService';

export default function Home() {
  const navigation = useNavigation();

  const handleLogin = () => {
    navigation.navigate('Detail_view_Screen');
  };

  const [currentLocation, setCurrentLocation] = useState(
    'Fetching location...',
  );

  const categories = [
    {name: 'Foot Reflexology', image: foot},
    {name: 'Body pain', image: massage},
    {name: 'Joint Pain', image: knee},
    {name: 'Stress Relief', image: head},
    {name: 'Neck Pain', image: Neck},
    {name: 'Foot Reflexology', image: foot},
    {name: 'Body pain', image: massage},
    {name: 'Joint Pain', image: knee},
    {name: 'Stress Relief', image: head},
    {name: 'Neck Pain', image: Neck},
  ];

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

  //------------categories--------------------

  const [therapistdetail, settherapistdetail] = useState([]);

  useEffect(() => {
    const fetchTherapistDetails = async () => {
      try {
        const Therapist = await therapists_list();

        const data = Therapist.data;
        settherapistdetail(data); // Update state

        console.log(data, 'datadata');
      } catch (error) {
        console.error('Failed to fetch therapist details:', error);
      }
    };

    fetchTherapistDetails();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SearchComponent />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Welcome Message */}
        <View style={styles.section}>
          <Text style={styles.welcomeTitle}>
            Welcome to Healing CP's Reflex Marma Therapies!
          </Text>
          <Text style={styles.subtitle}>
            Revitalize enjoy the wellness within you.
          </Text>
        </View>

        <RequestPendingScreen />

        {/* Categories */}
        <View style={styles.sectioncate}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Categories</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((cat, index) => (
              <View key={index} style={styles.category}>
                <Image source={cat.image} style={styles.categoryImage} />
                <Text style={styles.categoryLabel}>{cat.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Nearby Therapists */}
        <View style={styles.sectionthera}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Nearby Therapists</Text>
            <Text style={styles.linkText}>View all</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {nearbyTherapists.map((item, index) => (
              <View key={index} style={styles.therapistCard}>
                <Image source={item.image} style={styles.therapistImage} />
                <View style={styles.therapistdetail}>
                  <View>
                    <Text style={styles.therapistName}>{item.name}</Text>
                    <Text style={styles.therapistSpecialty}>
                      {item.specialty}
                    </Text>
                  </View>
                  {item.rating && (
                    <View style={{flexDirection: 'row', marginTop: 5}}>
                      <Image
                        source={require('../../assets/images/marmasset/star.png')}
                        style={{
                          height: 10,
                          width: 10,
                          marginTop: 2,
                          marginRight: 4,
                        }}
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
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={handleLogin}>
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Featured Therapists */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Featured Therapists</Text>
            <Text style={styles.linkText}>View all</Text>
          </View>
          <Featuredtherapists />
        </View>

        <GradientText text="Healing is a matter of time, but it is sometimes also a matter of opportunity." />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FFFFFF'},
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
    marginTop: 20,
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
  section: {paddingHorizontal: 16, marginTop: 10, marginBottom: 10},
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

// import React, {useState, useEffect} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   Button,
//   PermissionsAndroid,
//   Linking,
// } from 'react-native';
// import Geolocation from 'react-native-geolocation-service';
// // Function to get permission for location
// const requestLocationPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       {
//         title: 'Geolocation Permission',
//         message: 'Can we access your location?',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       },
//     );
//     console.log('granted', granted);
//     if (granted === 'granted') {
//       console.log('You can use Geolocation');
//       return true;
//     } else {
//       console.log('You cannot use Geolocation');
//       return false;
//     }
//   } catch (err) {
//     return false;
//   }
// };
// const App = () => {
//   // state to hold location
//   const [location, setLocation] = useState(false);
//   // function to check permissions and get Location
//   const getLocation = () => {
//     const result = requestLocationPermission();
//     result.then(res => {
//       console.log('res is:', res);
//       if (res) {
//         Geolocation.getCurrentPosition(
//           position => {
//             console.log(position);
//             setLocation(position);
//           },
//           error => {
//             // See error code charts below.
//             console.log(error.code, error.message);
//             setLocation(false);
//           },
//           {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
//         );
//       }
//     });
//     console.log(location);
//   };
//   // Function to Send Location to twitter
//   const sendLocation = () => {
//     try {
//       if (location) {
//         const tweet = `latitude is ${location.coords.latitude} and longitude is ${location.coords.longitude}`;
//         const url = `https://twitter.com/intent/tweet?text=${tweet}`;
//         Linking.openURL(url);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   return (
//     <View style={styles.container}>
//       <Text>Welcome!</Text>
//       <View
//         style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
//         <Button title="Get Location" onPress={getLocation} />
//       </View>
//       <Text>Latitude: {location ? location.coords.latitude : null}</Text>
//       <Text>Longitude: {location ? location.coords.longitude : null}</Text>
//       <View
//         style={{marginTop: 10, padding: 10, borderRadius: 10, width: '40%'}}>
//         <Button title="Send Location" onPress={sendLocation} />
//       </View>
//     </View>
//   );
// };
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
// export default App;
