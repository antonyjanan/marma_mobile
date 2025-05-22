import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Linking,
  Image,
} from 'react-native';

const ContactUsScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const contacts = [
    {
      id: 1,
      name: 'Admin',
      phone: '+99897 565 71 73',
      email: 'admin@gmail.com',
    },
    {
      id: 2,
      name: 'Staff',
      phone: '+99897 565 71 73',
      email: 'staff@gmail.com',
    },
  ];

  const handleCall = phoneNumber => {
    const phone = phoneNumber.replace(/\s/g, '');
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = email => {
    Linking.openURL(`mailto:${email}`);
  };

  const renderContact = contact => (
    <View key={contact.id} style={styles.contactCard}>
      <View style={styles.contactLeft}>
        <View style={styles.avatar}>
          <Image
            source={require('../../assets/images/marmasset/man.png')}
            style={styles.avatar}
            resizeMode="contain"
          />
        </View>
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{contact.name}</Text>
          <Text style={styles.contactPhone}>{contact.phone}</Text>
          <Text style={styles.contactEmail}>{contact.email}</Text>
        </View>
      </View>
      <View style={styles.contactActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleEmail(contact.email)}>
          <Image
            source={require('../../assets/images/marmasset/email.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => handleCall(contact.phone)}>
          <Image
            source={require('../../assets/images/marmasset/call.png')}
            style={styles.illustration}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </View>
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
          <Text style={styles.headerTitle}>Contact Us</Text>
        </View>
      </View>

      {/* Contact List */}
      <View style={styles.contactList}>{contacts.map(renderContact)}</View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  time: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
  },
  statusIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signal: {
    fontSize: 12,
    marginRight: 4,
  },
  wifi: {
    fontSize: 12,
    marginRight: 4,
  },
  battery: {
    fontSize: 12,
  },
  titleBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  backButton: {
    marginRight: 16,
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  contactList: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 60,
    height: 60,

    marginRight: 16,
  },
  avatarIcon: {
    fontSize: 24,
    color: '#fff',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  contactPhone: {
    fontSize: 16,
    color: '#666',
    marginBottom: 2,
  },
  contactEmail: {
    fontSize: 16,
    color: '#666',
  },
  contactActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
   
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  emailIcon: {
    fontSize: 18,
    color: '#fff',
  },
  phoneIcon: {
    fontSize: 16,
    color: '#fff',
  },

  //------------------

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

export default ContactUsScreen;
