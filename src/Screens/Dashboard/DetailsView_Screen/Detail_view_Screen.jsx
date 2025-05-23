import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ImageBackground,
  Modal,
} from 'react-native';

import one from '../../../assets/images/marmasset/one.png';
import {useNavigation} from '@react-navigation/core';
import Toast from '../../../Component/toastConfig/Toast';
import SuccessModal from '../../../Component/toastConfig/SuccessModal';

const Detail_view_Screen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const [isToastVisible, setIsToastVisible] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSendRequest = () => {
    setIsToastVisible(false);
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="red" />
      <View style={styles.contentContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>
          {/* Background Image Header */}
          <ImageBackground
            source={one}
            style={styles.profileBackground}
            resizeMode="cover">
            <View style={styles.header}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={handleBackPress}>
                <Image
                  source={require('../../../assets/images/marmasset/Backwhite.png')}
                  style={styles.illustration}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <View style={styles.locationContainer}>
                <Text style={styles.locationText}>
                  Syracuse, Connecticut | 12 km
                </Text>
              </View>
            </View>
          </ImageBackground>

          {/* Profile Details */}
          <View style={styles.profileContent}>
            <View style={styles.avatarContainer}>
              <Image
                source={{
                  uri: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2',
                }}
                style={styles.avatar}
              />
            </View>

            <Text style={styles.name}>Nguyen, Shane</Text>
            <Text style={styles.title}>Foot Reflexology Specialist</Text>
            <Text style={styles.bio}>
              Nguyen Shane is a certified Ayurvedic therapist specializing in
              foot massage therapies. She uses traditional methods to relieve
              stress, boost circulation, and support overall wellness with a
              personalized touch.
            </Text>

            {/* Specialities */}
            <Text style={styles.sectionTitle}>Specialities</Text>
            <View style={styles.specialities}>
              <View style={styles.specialityRow}>
                <View style={styles.specialityRowdot}>
                  <Text style={styles.specialityItemdot}>•</Text>
                  <Text style={styles.specialityItem}>
                    Aromatherapy Foot Treatment
                  </Text>
                </View>
                <View style={styles.specialityRowdot}>
                  <Text style={styles.specialityItemdot}>•</Text>
                  <Text style={styles.specialityItem}>
                    Foot Reflexology Massage
                  </Text>
                </View>
              </View>
              <View style={styles.specialityRow}>
                <View style={styles.specialityRowdot}>
                  <Text style={styles.specialityItemdot}>•</Text>
                  <Text style={styles.specialityItem}>
                    Herbal Foot Soak & Massage
                  </Text>
                </View>
                <View style={styles.specialityRowdot}>
                  <Text style={styles.specialityItemdot}>•</Text>
                  <Text style={styles.specialityItem}>
                    Stress Relief Foot Massage
                  </Text>
                </View>
              </View>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>520+</Text>
                <Text style={styles.statLabel}>Clients Treated</Text>
              </View>
              <View style={styles.statBox}>
                <View style={styles.ratingContainer}>
                  <Image
                    source={require('../../../assets/images/marmasset/star.png')}
                    style={styles.starIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.statNumber}>4.9</Text>
                </View>
                <Text style={styles.statLabel}>300 Reviews</Text>
              </View>
            </View>

            {/* Reviews */}
            <Text style={styles.sectionTitle}>Reviews</Text>
            {[1, 2].map((_, index) => (
              <View key={index} style={styles.reviewCard}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewTitle}>
                    " Absolutely relaxing! "
                  </Text>
                  <View style={styles.starsContainer}>
                    {[...Array(4)].map((_, i) => (
                      <Image
                        key={i}
                        source={require('../../../assets/images/marmasset/star.png')}
                        style={styles.starIcon}
                        resizeMode="contain"
                      />
                    ))}
                    <Image
                      source={require('../../../assets/images/marmasset/starem.png')}
                      style={styles.starIcon}
                      resizeMode="contain"
                    />
                  </View>
                </View>
                <Text style={styles.reviewText}>
                  Dr. Adya's foot massage therapy helped relieve months of
                  stress. I feel so much lighter and refreshed.
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Sticky Button */}
        <TouchableOpacity
          style={styles.requestButton}
          onPress={() => setIsToastVisible(true)}>
          <Text style={styles.requestButtonText}>Request a Session</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isToastVisible}
        onRequestClose={() => setIsToastVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Toast
              onClose={() => setIsToastVisible(false)}
              onSend={handleSendRequest}
            />
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <SuccessModal
          onClose={handleCloseSuccess}
          title="Request Sent Successfully!"
          emoji="🎉"
          buttonText="Close"
        />
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  contentContainer: {flex: 1,},
  scrollContent: {paddingBottom: 120},
  profileBackground: {height: 200, width: '100%'},
  header: {
    marginTop: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustration: {width: 35, height: 35},
  locationContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(200, 200, 200, 0.5)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 24,
  },
  locationText: {fontSize: 13, color: '#FFFFFF'},
  profileContent: {paddingHorizontal: 20, paddingBottom: 20},
  avatarContainer: {alignItems: 'center', marginTop: -50},
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#fff',
  },
  name: {fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginTop: 12},
  title: {
    fontSize: 14,
    color: '#787878',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '500',
  },
  bio: {fontSize: 14, lineHeight: 22, color: '#333', textAlign: 'left'},
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 12,
  },
  specialities: {width: '100%'},
  specialityRow: {
    flexDirection: 'row',
    marginBottom: 8,
    justifyContent: 'space-between',
  },
  specialityRowdot: {flexDirection: 'row', width: '48%'},
  specialityItemdot: {
    fontSize: 14,
    color: '#1F1F1F',
    fontWeight: '500',
    marginRight: 10,
  },
  specialityItem: {fontSize: 14, color: '#1F1F1F', fontWeight: '500'},
  statsContainer: {
    flexDirection: 'row',
    marginTop: 24,
    justifyContent: 'space-between',
  },
  statBox: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statNumber: {fontSize: 18, fontWeight: '500', color: '#FE0000'},
  statLabel: {fontSize: 14, color: '#1F1F1F', marginTop: 4, fontWeight: '500'},
  ratingContainer: {flexDirection: 'row', alignItems: 'center'},
  reviewCard: {
    borderTopWidth: 2,
    borderColor: '#eee',
    padding: 16,
    marginBottom: 8,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewTitle: {fontSize: 14, fontWeight: 'bold'},
  starsContainer: {flexDirection: 'row'},
  starIcon: {height: 14, width: 14, marginRight: 4},
  reviewText: {fontSize: 13, color: '#333', marginTop: 8, lineHeight: 20},
  requestButton: {
    backgroundColor: '#FE0000',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  requestButtonText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},

  modalOverlay: {
    flex: 1,

    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    height: '25%',
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default Detail_view_Screen;
