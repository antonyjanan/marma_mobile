import {useNavigation} from '@react-navigation/core';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Switch,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
} from 'react-native';
import propicbg from '../../assets/images/marmasset/propicbg.png';

import notification from '../../assets/images/marmasset/notification.png';
import lock from '../../assets/images/marmasset/lock.png';
import chat from '../../assets/images/marmasset/chat.png';
import profilechat from '../../assets/images/marmasset/profilechat.png';
import contact from '../../assets/images/marmasset/chat.png'; // Add this image
import privacy from '../../assets/images/marmasset/lock.png'; // Add this image
import logout from '../../assets/images/marmasset/logout.png'; // Add this image
import howToWork from '../../assets/images/marmasset/settings.png'; // Add this image

const ProfileScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const menuItems = [
    {
      id: 1,
      icon: profilechat,
      title: 'Profile Information',
      hasArrow: true,
      navigateTo: 'EditProfileScreen',
    },
    {id: 2, icon: notification, title: 'Notifications', hasSwitch: true},
    {
      id: 3,
      icon: howToWork,
      title: 'How to work',
      hasArrow: true,
      navigateTo: 'HowToWork',
    },
  ];

  const bottomMenuItems = [
    {
      id: 4,
      icon: contact,
      title: 'Contact us',
      hasArrow: true,
      navigateTo: 'ContactUsScreen',
    },
    {
      id: 5,
      icon: privacy,
      title: 'Privacy policy',
      hasArrow: true,
      navigateTo: 'PrivacyPolicyScreen',
    },
    {
      id: 6,
      icon: logout,
      title: 'Logout',
      hasArrow: true,
      navigateTo: 'LoginScreen',
    }, // Implement logout logic here
  ];

  const renderMenuItem = item => (
    <TouchableOpacity
      key={item.id}
      style={styles.menuItem}
      onPress={() => {
        if (item.navigateTo) {
          navigation.navigate(item.navigateTo);
        }
        // You can add logout confirmation here if needed
      }}>
      <View style={styles.menuItemLeft}>
        <Image source={item.icon} style={styles.icon} />
        <Text style={styles.menuTitle}>{item.title}</Text>
      </View>
      {item.hasSwitch && (
        <Switch
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
          trackColor={{false: '#e1e1e1', true: '#00d4aa'}}
          thumbColor={'#fff'}
        />
      )}
      {item.hasArrow && <Text style={styles.arrow}>›</Text>}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f5f5f5" />

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
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
      </View>

      {/* Background Image */}
      <ImageBackground
        source={propicbg}
        style={styles.profileBackground}
        resizeMode="contain"
      />

      {/* Profile Info */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <View style={styles.avatarImage}>
              <Image
                source={require('../../assets/images/marmasset/profile.png')}
                style={styles.avatar}
                resizeMode="contain"
              />
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Image
              source={require('../../assets/images/marmasset/edit.png')}
              style={styles.illustration}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.name}>Puerto Rico</Text>
        <Text style={styles.contact}>
          youremail@domain.com | +01 234 567 89
        </Text>
      </View>

      {/* Menu Sections */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.menuSection}>{menuItems.map(renderMenuItem)}</View>
        <View style={styles.menuSection}>
          {bottomMenuItems.map(renderMenuItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  // Fixed header
  headerWrapper: {
    position: 'absolute',
    top: 20,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: 'rgba(245, 245, 245, 0.95)',
  },
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
    marginRight: 10,
  },
  backButton: {
    padding: 5,
  },
  illustration: {
    width: 30,
    height: 30,
  },

  profileBackground: {
    width: '100%',
    height: 291.16,
    marginTop: 60,
    marginBottom: 20,
  },
  profileSection: {
    alignItems: 'center',
    marginTop: -100,
    paddingBottom: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 10,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#a8d8ea',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  avatarImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ff7675',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarEmoji: {
    fontSize: 40,
  },
  editButton: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  editIcon: {
    fontSize: 16,
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    color: '#000',
    marginBottom: 2,
  },
  contact: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  menuSection: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 20,
    marginRight: 16,
    width: 24,
  },
  menuTitle: {
    fontSize: 17,
    color: '#000',
    fontWeight: '400',
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
  },
});

export default ProfileScreen;
