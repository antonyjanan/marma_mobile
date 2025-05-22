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


export default function Booking() {
  const [activeTab, setActiveTab] = useState('Bookings');
  const [bookingView, setBookingView] = useState('previous');
  const [bookingcancel, setBookingcancel] = useState('cancel');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="red" />

      {/* Header */}
      <SearchComponent />
      <View style={{backgroundColor: '#FFFFFF'}}>
        <Text style={styles.sectionTitle}>Upcoming Bookings</Text>
      </View>

      <ScrollView style={styles.scrollView}>
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
                        Sun | May 11, 2025 | 10:30 am
                      </Text>
                      <Text style={styles.detailText}>
                        2118 Thornridge Cir.
                      </Text>
                      <Text style={styles.detailText}>
                        Syracuse, Connecticut 35624
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: '#F5F5F5',
                        padding: 10,
                        borderRadius: 10,
                      }}>
                      <Text style={styles.cancelNote}>
                        Cancellation unavailable: cut-off time of 4hrs before
                        scheduled time
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ImageBackground>

            {/* Buttons */}
            <View style={styles.tabRowcancel}>
              <TouchableOpacity
                style={[
                  styles.tabButtoncancel,
                  bookingcancel === 'cancel' && styles.tabActivecancel,
                ]}
                onPress={() => setBookingcancel('cancel')}>
                <Text
                  style={[
                    styles.tabText,
                    bookingcancel === 'cancel' && styles.tabTextActive,
                  ]}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButtoncancel,
                  bookingcancel === 'Reschedule' && styles.tabActivecancel,
                ]}
                onPress={() => setBookingcancel('Reschedule')}>
                <Text
                  style={[
                    styles.tabText,
                    bookingcancel === 'Reschedule' && styles.tabTextActive,
                  ]}>
                  Reschedule
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {/* Tabs */}

        <View
          style={{
            backgroundColor: '#f9fafb',
            marginTop: 20,
          }}>
          <View style={styles.tabRow}>
            <View style={styles.tabRowroe}>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  bookingView === 'previous' && styles.tabActive,
                ]}
                onPress={() => setBookingView('previous')}>
                <Text
                  style={[
                    styles.tabText,
                    bookingView === 'previous' && styles.tabTextActive,
                  ]}>
                  Previous Bookings
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.tabButton,
                  bookingView === 'cancelled' && styles.tabActive,
                ]}
                onPress={() => setBookingView('cancelled')}>
                <Text
                  style={[
                    styles.tabText,
                    bookingView === 'cancelled' && styles.tabTextActive,
                  ]}>
                  Cancelled Bookings
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Previous Bookings */}
          {[1, 2,3,4].map(item => (
            <View key={item} style={styles.prevCardmain}>
              <View key={item} style={styles.prevCard}>
                <Image source={one} style={styles.prevImage} />
                <View style={styles.prevInfo}>
                  <Text style={styles.name}>Nguyen, Shane</Text>
                  <Text style={styles.specialty}>
                    Foot Reflexology Specialist
                  </Text>
                  <Text style={styles.bookingDetailscard}>
                    Sun | May 11, 2025 | 10:30 am
                  </Text>

                  <Text style={styles.detailText}>2118 Thornridge Cir.</Text>
                  <Text style={styles.detailText}>
                    Syracuse, Connecticut 35624
                  </Text>
                </View>
              </View>

              <View>
                <View style={styles.prevButtons}>
                  <TouchableOpacity style={styles.viewBtn}>
                    <Text style={styles.viewBtnText}>View Details</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.repeatBtn}>
                    <Text style={styles.repeatBtnText}>Repeat Booking</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
     
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
  detailText: {fontSize: 12, color: '#787878'},
  cancelNote: {fontSize: 11, color: '#787878'},
  cardActions: {
    marginTop: 10,
    flexDirection: 'row',
  },
  cancelButton: {
    padding: 12,
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#eee',
  },
  rescheduleButton: {
    backgroundColor: '#FE0000',
    padding: 12,
    alignItems: 'center',
  },
  cancelText: {color: '#333'},
  rescheduleText: {color: '#fff'},
  tabRow: {
    flexDirection: 'row',

    marginBottom: 8,
    marginTop: 10,
    justifyContent: 'center',
  },
  tabRowroe: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: 3,
    borderRadius: 20,
  },
  tabRowcancel: {
    flexDirection: 'row',
    paddingHorizontal: 12,

    backgroundColor: 'red ',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
  },

  tabButtoncancel: {
    width: '38%',
    height: 36,
    borderWidth: 1,
    borderRadius: 20,
    marginRight: 8,
    borderColor: '#787878',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabActive: {backgroundColor: '#FE0000'},
  tabActivecancel: {backgroundColor: '#FE0000', borderWidth: 0},

  tabText: {color: 'black'},
  tabTextActive: {color: 'white'},
  prevCard: {
    flexDirection: 'row',
  },

  prevCardmain: {
    backgroundColor: '#fff',
    padding: 12,
    marginHorizontal: 12,
    marginBottom: 8,
    borderRadius: 12,
    elevation: 2,
  },
  prevImage: {
    width: 110,
    height: 94,
    borderRadius: 8,
    marginRight: 12,
  },
  prevInfo: {flex: 1},
  prevButtons: {
    flexDirection: 'row',
    marginTop: 8,
  },
  viewBtn: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 8,
    alignItems: 'center',
    borderRadius: 20,
  },
  repeatBtn: {
    flex: 1,
    padding: 8,
    backgroundColor: '#FE0000',
    alignItems: 'center',
    borderRadius: 20,
  },
  viewBtnText: {color: '#444'},
  repeatBtnText: {color: '#fff'},
});
