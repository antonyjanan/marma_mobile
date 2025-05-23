import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';

const HowToWorkScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}

      <View style={styles.headerWrapper}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
            <Image
              source={require('../../assets/images/marmasset/Back.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Privacy Policy</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainer}>
        {/* Section 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Explore & Book a Therapist</Text>
          <Text style={styles.subtitle}>
            Experience CP's Signature Marma Therapy
          </Text>

          <Text style={styles.bulletPoint}>
            • A blend of Reflexology & Chakra Healing at your doorstep.
          </Text>

          <Text style={styles.subheading}>Choose a session:</Text>

          <View style={styles.checkboxContainer}>
            <View style={styles.checkbox}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
            <Text style={styles.checkboxText}>1-hour session</Text>
          </View>

          <View style={styles.checkboxContainer}>
            <View style={styles.checkbox}>
              <Text style={styles.checkmark}>✓</Text>
            </View>
            <Text style={styles.checkboxText}>30-minute session</Text>
          </View>
        </View>

        {/* Section 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            2. Become a Certified Marma Therapist
          </Text>
          <Text style={styles.subtitle}>
            Join the 3-day Professional Training Program
          </Text>
          <Text style={styles.description}>
            No age limit, no prior qualification needed.
          </Text>

          <View style={styles.linkContainer}>
            <Text style={styles.linkIcon}>📘</Text>
            <Text style={styles.linkText}>
              Learn CP's Marma Therapy & Start Earning
            </Text>
          </View>
        </View>

        {/* Section 3 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            3. Marma Training Program Flow
          </Text>

          <Text style={styles.stepTitle}>Step 1:</Text>
          <Text style={styles.bulletPoint}>
            • Book your seat in a 3-day Residential Program.
          </Text>
          <Text style={styles.bulletPoint}>
            • Professional training + accommodation included.
          </Text>

          <Text style={styles.stepTitle}>Step 2:</Text>
          <Text style={styles.bulletPoint}>
            • On successful 3-day completion:
          </Text>
          <View style={styles.nestedBullets}>
            <Text style={styles.nestedBullet}>• Get certified</Text>
            <Text style={styles.nestedBullet}>
              • Become a CP-approved therapist
            </Text>
            <Text style={styles.nestedBullet}>
              • Start earning by accepting local therapy requests
            </Text>
          </View>
        </View>

        {/* Section 3 (Duplicate) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            3. Marma Training Program Flow
          </Text>

          <Text style={styles.stepTitle}>Step 1:</Text>
          <Text style={styles.bulletPoint}>
            • Book your seat in a 3-day Residential Program.
          </Text>
          <Text style={styles.bulletPoint}>
            • Professional training + accommodation included.
          </Text>

          <Text style={styles.stepTitle}>Step 2:</Text>
          <Text style={styles.bulletPoint}>
            • On successful 3-day completion:
          </Text>
          <View style={styles.nestedBullets}>
            <Text style={styles.nestedBullet}>• Get certified</Text>
            <Text style={styles.nestedBullet}>
              • Become a CP-approved therapist
            </Text>
            <Text style={styles.nestedBullet}>
              • Start earning by accepting local therapy requests
            </Text>
          </View>
        </View>

        {/* Section 4 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Learning & Certification</Text>
          <Text style={styles.description}>
            Learn about human body through short video content
          </Text>
          <Text style={styles.description}>
            Take tool-kit-based model tests
          </Text>
          <Text style={styles.description}>On completion, receive:</Text>

          <Text style={styles.bulletPoint}>• Certification</Text>
          <Text style={styles.bulletPoint}>
            • Listing on CP's Marma platform
          </Text>
          <Text style={styles.bulletPoint}>
            • Therapist ID for service access
          </Text>
        </View>
      </ScrollView>

      {/* Home indicator */}
      <View style={styles.homeIndicator} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 8,
    lineHeight: 24,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    lineHeight: 22,
  },
  subheading: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  bulletPoint: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
    marginBottom: 6,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 16,
    marginBottom: 8,
  },
  nestedBullets: {
    marginLeft: 16,
    marginTop: 4,
  },
  nestedBullet: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
    marginBottom: 4,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    backgroundColor: '#4CAF50',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  checkmark: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
  },
  linkIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  linkText: {
    fontSize: 15,
    color: '#007AFF',
    fontWeight: '500',
    flex: 1,
  },
  ////----------------------
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight + 10 : 20,
    paddingBottom: 10,
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
});

export default HowToWorkScreen;
