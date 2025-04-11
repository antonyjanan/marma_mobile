import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/core';
import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import {Appstrings} from '../../Contants/Appstrings';

const Notification = () => {
  const navigation = useNavigation();

  const notifications = [
    {
      title: 'Today',
      data: [
        {
          id: '1',
          title: '30% Special Discount!',
          description: 'Special promotion only valid today',
          iconBackground: '#ff6b6b',
          icon: require('../../assets/images/Fishimage/Offer.png'),
        },
        {
          id: '2',
          title: 'Your Order Has Been Taken by the Driver boy',
          description: 'Recently',
          iconBackground: '#51cf66',
          icon: require('../../assets/images/Fishimage/Selection.png'),
        },
        {
          id: '3',
          title: 'Your Order Has Been Canceled',
          description: '19 Jun 2023',
          iconBackground: '#ff6b6b',
          icon: require('../../assets/images/Fishimage/Cross.png'),
        },
      ],
    },
    {
      title: 'Yesterday',
      data: [
        {
          id: '4',
          title: '35% Special Discount!',
          description: 'Special promotion only valid today',
          icon: require('../../assets/images/Fishimage/Mail.png'),
          iconBackground: '#f8f9fa',
        },
        {
          id: '5',
          title: 'Account Setup Successful!',
          description: 'Special promotion only valid today',
          icon: require('../../assets/images/Fishimage/Man.png'),
          iconBackground: '#f8f9fa',
        },
        {
          id: '6',
          title: 'Special Offer! 60% Off',
          description: 'Special offer for new account, valid until 20 Nov 2025',
          icon: require('../../assets/images/Fishimage/Offer.png'),
          iconBackground: '#ff6b6b',
        },
      ],
    },
  ];
  useEffect(() => {
    notiList();
  }, []);
  const notiList = async () => {
    let user_id = await AsyncStorage.getItem(Appstrings.USER_ID);
    // let requestbody = {
    //   user_id: user_id,
    // };

    fetch(
      'https://healthyfresh.lunarsenterprises.com/fishapp/list/notification',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify(requestbody),
      },
    )
      .then(response => response.json())
      .then(data => {
        console.log(data, 'data');

        if (data.result) {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
        } else {
          ToastAndroid.show(data.message, ToastAndroid.SHORT);
        }
      })
      .catch(error => {
        console.log(error, 'error');
      });
  };

  const renderSectionHeader = ({section: {title}}) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const renderNotificationItem = ({item}) => (
    <View style={styles.notificationItem}>
      <View style={[styles.iconContainer, {backgroundColor: '#F5F5FF'}]}>
        <Image
          source={item.icon}
          style={styles.iconimage}
          resizeMode="contain"
        />
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/Fishimage/Back.png')}
            style={styles.backButton}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
      </View>

      <SectionList
        sections={notifications}
        keyExtractor={item => item.id}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderNotificationItem}
        ListFooterComponent={<View style={styles.footer} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  headerTitle: {fontSize: 18, fontWeight: '600', marginLeft: 16},
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#f8f9fa',
  },
  sectionHeaderText: {fontSize: 16, color: '#666', fontWeight: '500'},
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationContent: {flex: 1},
  notificationTitle: {fontSize: 15, fontWeight: '500', marginBottom: 4},
  notificationDescription: {fontSize: 13, color: '#888'},
  footer: {height: 60},
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,

    alignItems: 'center',
    justifyContent: 'center',
  },

  iconimage: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Notification;
