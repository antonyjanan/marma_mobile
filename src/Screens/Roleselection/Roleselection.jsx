import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';

const Roleselection = ({navigation}) => {
  const handleBookTherapist = () => {
   
    navigation.navigate('SignupScreen');
  };

  const handleBecomeTherapist = () => {
    // Navigate to become therapist flow
    navigation.navigate('BecomeTherapist');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="red" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Choose Your Role</Text>
          <Text style={styles.subtitle}>
            Select how you want to use the CP's Reflex Marma app
          </Text>
        </View>

        {/* Therapy User Option */}
        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>CP's Reflex Marma Therapy</Text>
          <Text style={styles.sectionDescription}>
            Blend of Modern Reflexology with the Traditional Chakra Healing
          </Text>
          <Text style={styles.sectionTagline}>
            Say good bye to stressful workout exercises...
          </Text>

          <View style={styles.card}>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardQuote}>
                "Enjoy! Stress Reduction improved circulation enhanced
                Relaxation pain reduction"
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={handleBookTherapist}>
                <Text style={styles.buttonText}>Click here</Text>
              </TouchableOpacity>
              <Text style={styles.buttonSubtext}>
                To book a therapist near your area
              </Text>
            </View>
            <View style={styles.cardImageContainer}>
              <Image
                source={require('../../assets/images/marmasset/message.png')}
                style={styles.cardImage}
                resizeMode="cover"
              />
            </View>
          </View>
        </View>

        {/* Job Seeker Option */}
        <View style={styles.sectionContainer}>
          <Text style={styles.jobSectionTitle}>Searching for a job?</Text>
          <Text style={styles.jobSectionDescription}>
            No need for waiting ready at you convenience No age limit/ any
            educational qualification
          </Text>

          <View style={styles.card}>
            <View style={styles.cardTextContainer}>
              <Text style={styles.uniqueText}>1st Time in the world</Text>
              <Text style={styles.becomeTitle}>
                Become a Professional Therapist
              </Text>
              <Text style={styles.inProgram}>in CP's Reflex Marma</Text>
              <Text style={styles.fastTrack}>(Fast Track Training)</Text>

              <View style={styles.bulletPointContainer}>
                <Text style={styles.bulletPoint}>• </Text>
                <Text style={styles.bulletText}>
                  Start working with us from the 4th day onwards
                </Text>
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={handleBecomeTherapist}>
                <Text style={styles.buttonText}>Click here</Text>
              </TouchableOpacity>
              <Text style={styles.buttonSubtext}>
                Take courses to become a certified therapist.
              </Text>
            </View>
            <View style={styles.cardImageContainer}>

            <Image
              source={require('../../assets/images/marmasset/Nurse.png')}
              style={styles.cardImagenurse}
              resizeMode="cover"
            />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 30,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 5,
  },
  sectionDescription: {
    fontSize: 12,
    color: '#666',
  },
  sectionTagline: {
    fontSize: 14,
    color: '#212121',
    marginBottom: 15,
    fontWeight: 'bold',
    marginTop: 5,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#eee',
  },
  cardTextContainer: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
  },
  cardQuote: {
    fontSize: 14,
    color: '#555',
    // fontStyle: 'italic',
    fontWeight: '500',
    marginBottom: 12,
    lineHeight: 20,
    textAlign: 'center',
  },
  cardImage: {
    width: 153,
    height: 195,
    borderRadius: 10,
  },

  cardImagenurse:{
     width: 153,
    height: 255,
    borderRadius: 10,
  },

  cardImageContainer: {
    borderRadius: 10,
    margin: 10,
  },
  button: {
    backgroundColor: '#FF0000',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonSubtext: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 3,
  },
  jobSectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 5,
  },
  jobSectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  uniqueText: {
    fontSize: 13,
    color: '#555',
    marginBottom: 2,
  },
  becomeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#212121',
    marginBottom: 2,
  },
  inProgram: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  fastTrack: {
    fontSize: 12,
   
    color: '#555',
    marginBottom: 10,
  },
  bulletPointContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  bulletPoint: {
    fontSize: 14,
    color: '#555',
    marginRight: 2,
  },
  bulletText: {
    fontSize: 14,
    color: '#555',
  },
});

export default Roleselection;
