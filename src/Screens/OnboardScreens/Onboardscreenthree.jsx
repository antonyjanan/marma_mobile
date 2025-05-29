import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const Onboardscreenthree = () => {
  const navigation = useNavigation();

  const Nextscreen = () => {
    navigation.navigate('Roleselection');
  };

  const skipscreen = () => {
    navigation.navigate('Roleselection');
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <ImageBackground
        source={require('../../assets/images/marmasset/bgimagee.png')}
        style={styles.profileBackground}
        resizeMode="stretch">
        <LinearGradient
          colors={['rgba(254, 0, 0, 0)', '#FFFFFF']}
          start={{x: 0.5, y: 0.4}}
          end={{x: 1.0, y: 0.9}}
          style={styles.container}>
          <View style={styles.header}>
            <Image
              source={require('../../assets/images/marmasset/logocp.png')}
              style={styles.logocp}
              resizeMode="contain"
            />

            {/* onboardiingbg */}
          </View>

          <View style={styles.badgeContainer}>
            <View style={styles.badge}>
              <View style={styles.redDot} />
              <Text style={styles.badgeText}>1st Time in the world</Text>
            </View>
          </View>

          <View style={styles.mainImageContainer}>
            {/* <Image
            source={require('../../assets/images/marmasset/onboardone.png')}
            style={styles.mainImage}
            resizeMode="contain"
          /> */}
          </View>

          <View style={styles.textcontent}>
            <View style={{marginBottom: 40}}>
              <Text style={styles.mainTitle}></Text>

              <Text style={styles.subtitleHighlight}>
                Become a Professional {'\n'}Therapist in
                <Text style={styles.subtitle}> just 3 days</Text>
              </Text>

              <Text style={styles.subtitleHighlightsec}>
                in CP’s Reflex Marma{' '}
              </Text>
            </View>
            <View style={styles.bottomSection}>
              <View style={styles.progressDots}>
                <View style={styles.dot} />

                <View style={styles.dot} />
                <View style={[styles.dot, styles.activeDot]} />
              </View>

              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.skipButton}
                  onPress={skipscreen}>
                  <Text style={styles.skipButtonText}>Skip</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.nextButton}
                  onPress={Nextscreen}>
                  <Text style={styles.nextButtonText}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileBackground: {
    width: '100%',
    height: '100%',
  },

  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  badgeContainer: {
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginTop: 30,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFFF',
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 4,
    backgroundColor: '#FE0000',
    marginRight: 10,
  },
  badgeText: {
    color: '#FE0000',
    fontSize: 20,
    fontWeight: '500',
  },
  mainImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainImage: {
    width: 1200,
    height: 400,
  },
  logocp: {
    width: 76,
    height: 46.41,
  },
  textcontent: {
    paddingHorizontal: 20,
  },
  bottomSection: {
    paddingHorizontal: 10,
    paddingBottom: 40,
    alignItems: 'center',
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: '500',
    color: '#FFFF',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 26,
    color: '#FE0000',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  subtitleHighlight: {
    fontSize: 20,
    color: '#',
    fontWeight: '500',
    lineHeight: 30,
  },

  subtitleHighlightsec: {
    fontSize: 14,
    color: '#',
    fontWeight: '800',
    lineHeight: 30,
  },

  description: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 30,
  },
  progressDots: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 19,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#DDD',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FE0000',
    width: 38,
    borderRadius: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    gap: 15,
  },
  skipButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#878787',
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#878787',
    fontSize: 18,
    fontWeight: '600',
  },
  nextButton: {
    flex: 1,
    backgroundColor: '#FE0000',
    borderRadius: 25,
    paddingVertical: 10,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Onboardscreenthree;
