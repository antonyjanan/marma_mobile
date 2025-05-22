// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   TouchableOpacity,
//   SafeAreaView,
// } from 'react-native';
// import {ChevronRight} from 'lucide-react';

// const RequestPendingScreen = () => {
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.card}>
//         {/* Hourglass Icon and Header */}
//         <View style={styles.headerContainer}>
//           <View style={styles.iconContainer}>
//             <Image
//               source={require('../../assets/images/marmasset/loading.png')}
//               style={{
//                 height: 20,
//                 width: 17,

//                 marginRight: 4,
//               }}
//               resizeMode="contain"
//             />
//           </View>
//           <Text style={styles.pendingText}>Request Pending ...</Text>
//         </View>

//         {/* Notification Message */}
//         <Text style={styles.notificationText}>
//           Please note that Dr. Adya will review and approve your request as soon
//           as possible. We will notify you once it's confirmed.
//         </Text>

//         {/* Doctor Info Card */}
//         <TouchableOpacity style={styles.doctorCard}>
//           <Image
//             source={require('../../assets/images/marmasset/one.png')}
//             style={styles.doctorImage}
//           />
//           <View style={styles.doctorInfo}>
//             <Text style={styles.doctorName}>Dr.Aarya Varun</Text>
//             <Text style={styles.specialization}>Foot Massage Specialist</Text>
//           </View>
//         <Image
//             source={require('../../assets/images/marmasset/rightarrow.png')}
//             style={styles.iconarrow}
//             resizeMode='contain'
//           />
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {

//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 16,
//   },
//   card: {
//     width: '100%',
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 10,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 5,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 5,
//     marginTop:5
//   },
//   iconContainer: {
//     marginRight: 5,
//   },

//   pendingText: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#222222',
//   },
//   notificationText: {
//     fontSize: 12,
//      fontWeight: '400',
//     color: '#666',
//     lineHeight: 20,
//     marginBottom: 10,
//   },
//   doctorCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#eee',
//     borderRadius: 5,
//     padding: 5,

//   },
//   doctorImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 8,
//   },

//   iconarrow:{
//     width: 30,
//     height: 30,
//   },
//   doctorInfo: {
//     flex: 1,
//     marginLeft: 16,
//   },
//   doctorName: {
//     fontSize: 14,
//     fontWeight: '400',
//     color: '#222222',
//     marginBottom: 4,
//   },
//   specialization: {
//     fontSize: 12,
//     fontWeight: '400',
//     color: '#222222',
//   },
//   chevron: {
//     marginLeft: 8,
//   },
// });

// export default RequestPendingScreen;
import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
  ImageBackground,
} from 'react-native';
import SearchComponent from '../../Component/SearchComponent/SearchComponent';
import ticket from '../../assets/images/marmasset/ticket.png';
import one from '../../assets/images/marmasset/one.png';

export default function RequestPendingScreen() {
  const [activeTab, setActiveTab] = useState('Bookings');
  const [bookingView, setBookingView] = useState('previous');
  const [bookingcancel, setBookingcancel] = useState('cancel');

  return (
    <View style={styles.container}>
      {/* Booking Card */}

      <View
        style={{
          backgroundColor: '#f9fafb',
        }}>
        <View
          style={{
            marginHorizontal: 10,
          }}>
          <ImageBackground
            source={ticket}
            style={styles.profileBackground}
            resizeMode="cover">
            <View style={styles.card}>
              <View style={styles.leftSection}>
                <View style={styles.verticalNumber}>
                  {'9379-3984'.split('').map((char, index) => (
                    <Text key={index} style={styles.verticalChar}>
                      {char}
                    </Text>
                  ))}
                </View>
              </View>

              <View style={styles.cardContent}>
                <View style={styles.cardInfo}>
                  <View style={styles.profileRow}>
                    <Image
                      source={{
                        uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
                      }}
                      style={styles.avatar}
                    />
                    <View>
                      <Text style={styles.name}>Nguyen, Shane</Text>
                      <Text style={styles.specialty}>
                        Foot Reflexology Specialist
                      </Text>
                    </View>
                  </View>
                  <View style={styles.bookingDetails}>
                    <Text style={styles.detailText}>
                      Your Request Has Been Approved!
                    </Text>
                    <Text style={styles.cancelNote}>
                      The therapist will share a secure payment link in chat.
                      Complete your payment there to proceed.
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#F5F5F5',
                      padding: 10,
                      borderRadius: 10,
                    }}>
                    <Text style={styles.cancelNote}>
                      You can only proceed to book the session once the payment
                      is confirmed.
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </ImageBackground>

          {/* Buttons */}

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <TouchableOpacity
              style={styles.tabButtoncancel}
              onPress={() => setBookingcancel('cancel')}>
              <Text style={styles.tabText}>Make Payment via Chat</Text>
              <Image
                source={require('../../assets/images/marmasset/whitearrow.png')}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    alignItems: 'center',
  },

  scrollView: {flex: 1, backgroundColor: '#FE00001F', marginTop: 20},
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 12,
  },

  profileBackground: {
    width: '100%',
    height: 191.16,
    marginTop: 20,
    marginBottom: 20,
  },

  card: {
    flexDirection: 'row',
    height: 181.16,
  },

  leftSection: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },

  verticalNumber: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  verticalChar: {
    fontSize: 12,
    color: '#333', // or any color you like
    lineHeight: 16, // to control spacing
  },

  cardContent: {
    width: '75%',
    flexDirection: 'row',
    padding: 20,
    marginLeft: 30, // adjust as needed
  },

  profileRow: {flexDirection: 'row', marginBottom: 8, alignItems: 'center'},
  avatar: {width: 40, height: 40, borderRadius: 20, marginRight: 8},
  name: {fontSize: 14, fontWeight: '500', color: '#1F1F1F'},
  specialty: {fontSize: 10, color: '#787878'},

  bookingDetailscard: {fontSize: 12, marginTop: 10, color: '#787878'},

  bookingDetails: {marginBottom: 8},
  detailText: {fontSize: 12, color: '#262626', fontWeight: '600'},
  cancelNote: {fontSize: 11, color: '#787878'},
  cardActions: {
    marginTop: 10,
    flexDirection: 'row',
  },

  tabButtoncancel: {
    width: '80%',
    height: 38,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#FE0000',
    paddingHorizontal: 16, // for spacing
    position: 'relative', // needed for absolute positioning
  },

  tabText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    flex: 1, // takes up all space in the row
  },

  arrowIcon: {
    width: 15,
    height: 15,
    position: 'absolute',
    right: 16, // position from right
  },
});
