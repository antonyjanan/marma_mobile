import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from 'react-native';

const NotificationsScreen = ({navigation}) => {
  const [filterType, setFilterType] = useState('All');
  const [filterTime, setFilterTime] = useState('All');
  const [showDropdown, setShowDropdown] = useState(false);

  const notifications = [
    {
      id: 1,
      type: 'appointment',
      title: 'Appointment Confirmed',
      message:
        'Your request with Dr. Aarya Varun has been approved. Choose a time slot to proceed with the booking.',
      image: require('../../assets/images/marmasset/foot.png'),
      time: 'today',
    },
    {
      id: 2,
      type: 'new_therapist',
      title: 'Session Reminder',
      message:
        'You have a confirmed session with Neel Thakur tomorrow at 10:30 AM.',
      image: require('../../assets/images/marmasset/Neck.png'),
      time: 'today',
    },
    {
      id: 3,
      type: 'new_therapist',
      title: 'New Therapist Added in Your Area!',
      message:
        'Meet Dr. Kavya Menon – Expert in Oil & Detox Therapies now available in your location (3.0 km away).',
      image: require('../../assets/images/marmasset/head.png'),
      time: 'yesterday',
    },
    {
      id: 4,
      type: 'appointment',
      title: 'Therapist Message',
      message:
        'Hi! Just a quick note regarding your upcoming detox massage ...',
      image: require('../../assets/images/marmasset/knee.png'),
      time: 'yesterday',
    },
  ];

  const filteredByType =
    filterType === 'All'
      ? notifications
      : notifications.filter(n => n.type === filterType.toLowerCase());

  const finalFiltered =
    filterTime === 'All'
      ? filteredByType
      : filteredByType.filter(
          n => n.time.toLowerCase() === filterTime.toLowerCase(),
        );

  const groupedNotifications = finalFiltered.reduce((groups, notification) => {
    if (!groups[notification.time]) groups[notification.time] = [];
    groups[notification.time].push(notification);
    return groups;
  }, {});

  const renderNotification = notification => (
    <TouchableOpacity key={notification.id} style={styles.notificationItem}>
      <Image source={notification.image} style={styles.notificationImage} />
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{notification.title}</Text>
        <Text style={styles.notificationMessage}>{notification.message}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/marmasset/Back.png')}
            style={styles.illustrationBack}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifications</Text>

        <View>
          <TouchableOpacity
            style={[styles.filterTab, styles.dropdownToggle]}
            onPress={() => setShowDropdown(prev => !prev)}>
            <Text style={styles.filterText}>{filterTime}</Text>
            <Image
              source={require('../../assets/images/marmasset/filter.png')}
              style={[
                styles.illustrationdown,
                showDropdown && {transform: [{rotate: '180deg'}]},
              ]}
              resizeMode="contain"
            />
          </TouchableOpacity>

          {showDropdown && (
            <View style={styles.dropdownMenu}>
              {['All', 'Today', 'Yesterday', 'Week'].map(item => (
                <TouchableOpacity
                  key={item}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setFilterTime(item);
                    setShowDropdown(false);
                  }}>
                  <Text style={styles.dropdownText}>{item}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        {/* Time Filter Dropdown */}

        {/* Type Filters */}
        <TouchableOpacity
          style={[
            styles.filterTab,
            filterType === 'All' && styles.activeFilterTab,
          ]}
          onPress={() => setFilterType('All')}>
          <Text style={styles.filterText}>All</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterTab,
            filterType === 'appointment' && styles.activeFilterTab,
          ]}
          onPress={() => setFilterType('appointment')}>
          <Text style={styles.filterText}>Appointments</Text>
        </TouchableOpacity>
      </View>

      {/* Notifications List */}
      <ScrollView style={styles.scrollContainer}>
        {Object.keys(groupedNotifications).length === 0 ? (
          <Text style={{textAlign: 'center', marginTop: 50, fontSize: 16}}>
            No notifications found.
          </Text>
        ) : (
          Object.keys(groupedNotifications).map(timeGroup => (
            <View key={timeGroup} style={styles.timeSection}>
              <Text style={styles.timeSectionHeader}>
                {timeGroup.charAt(0).toUpperCase() + timeGroup.slice(1)}
              </Text>
              {groupedNotifications[timeGroup].map(renderNotification)}
            </View>
          ))
        )}
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  illustrationBack: {
    width: 35,
    height: 35,
    marginVertical: 20,
  },
  illustrationdown: {
    width: 15,
    height: 15,
    marginLeft: 6,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  placeholderView: {
    width: 40,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#f8f8f8',
  },
  activeFilterTab: {
    backgroundColor: '#f0f0f0',
  },
  filterText: {
    color: '#1F1F1F',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollContainer: {
    flex: 1,
  },
  timeSection: {
    marginBottom: 12,
  },
  timeSectionHeader: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  notificationImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 12,
    color: '#666',
    lineHeight: 15,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    elevation: 5,
    zIndex: 1000,
    width: 180,
    paddingVertical: 4,
    marginLeft: -100,
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
});

export default NotificationsScreen;
