import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  Switch,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import menuarrow from '../../assets/images/Menuarrow.png';
import userwhite from '../../assets/images/user.png';
import {useNavigation} from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const handleToggleSwitch = () =>
    setNotificationsEnabled(!notificationsEnabled);
  const handleNavigation = goto => {
    if (goto !== 'Login') {
      navigation.navigate(goto);
    } else {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              await AsyncStorage.clear();
              navigation.replace('Login');
            },
          },
        ],
        {cancelable: true},
      );
    }
  };

  const MenuItem = ({iconBg, icon, label, showSwitch, goto}) => (
    <TouchableOpacity
      style={styles.menuItem}
      onPress={() => handleNavigation(goto)}>
      <View style={[styles.iconContainer, {backgroundColor: iconBg}]}>
        <Text style={styles.iconText}>{icon}</Text>
      </View>
      <Text style={styles.menuLabel}>{label}</Text>
      {showSwitch ? (
        <Switch
          value={notificationsEnabled}
          onValueChange={handleToggleSwitch}
        />
      ) : (
        <Image source={menuarrow} style={styles.arrow} resizeMode="contain" />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileContainer}>
        <Image source={userwhite} style={styles.profileImage} />
        <Text style={styles.profileName}>Irma Juwan</Text>
        <Text style={styles.profileEmail}>irmajuwan@gmail.cpm</Text>
      </View>

      <View style={styles.menuContainer}>
        <MenuItem
          iconBg="#DDF4D7"
          icon="👤"
          label="View & Edit Profile"
          goto="BottomtabHome"
        />
        <MenuItem
          iconBg="#FBF4C5"
          icon="📄"
          label="My Orders"
          goto="My_Order"
        />
        <MenuItem
          iconBg="#D3EEFF"
          icon="💙"
          label="Favorites"
          goto="Favorites"
        />
        <MenuItem
          iconBg="#FCE1F4"
          icon="⚙️"
          label="Notification"
          showSwitch
          goto="BottomtabHome"
        />
        <MenuItem
          iconBg="#E7DCFD"
          icon="📃"
          label="Terms & Conditions"
          goto="BottomtabHome"
        />
        <MenuItem
          iconBg="#D0F8E3"
          icon="🛠️"
          label="Support"
          goto="BottomtabHome"
        />
        <MenuItem iconBg="#FAD3D3" icon="🚪" label="Logout" goto="Login" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileEmail: {
    color: 'gray',
    fontSize: 14,
  },
  menuContainer: {
    width: '90%',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 16,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
  },
  arrow: {
    height: 15,
    width: 8,
  },
});

export default ProfileScreen;
