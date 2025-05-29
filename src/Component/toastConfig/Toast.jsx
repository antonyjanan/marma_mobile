import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from 'react-native';
import { AuthContext } from '../../Context/AuthContext';

const Toast = ({onClose, onSend}) => {
  // const [selectedTime, setSelectedTime] = useState('1 hour');
  const {selectedTime,setSelectedTime} = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bottomSheet}>
        {/* Close Button */}
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>✕</Text>
        </TouchableOpacity>

        {/* Time Selection */}
        <View style={styles.timeSelector}>
          <TouchableOpacity
            style={[
              styles.timeButton,
              selectedTime === '1 hour' && styles.timeButtonSelected,
            ]}
            onPress={() => setSelectedTime('1 hour')}>
            <Text
              style={[
                styles.timeButtonText,
                selectedTime === '1 hour' && styles.timeButtonTextSelected,
              ]}>
              1 hour
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.timeButton,
              selectedTime === '30 minute' && styles.timeButtonSelected,
            ]}
            onPress={() => setSelectedTime('30 minute')}>
            <Text
              style={[
                styles.timeButtonText,
                selectedTime === '30 minute' && styles.timeButtonTextSelected,
              ]}>
              30 minute
            </Text>
          </TouchableOpacity>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Enjoy a full session at a nearby wellness center.
        </Text>

        {/* Send Button */}
        <TouchableOpacity style={styles.sendButton} onPress={onSend}>
          <Text style={styles.sendButtonText}>Send Request</Text>
          <View style={styles.sendButtonIcon}>
            <Image
              source={require('../../assets/images/marmasset/sent.png')}
              style={styles.starIcon}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
  },
  bottomSheet: {
    padding: 20,

    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 10,
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#333',
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  timeSelector: {
    flexDirection: 'row',
    backgroundColor: '#e9ecef',
    borderRadius: 25,
    padding: 4,
    marginBottom: 10,
    marginTop: 30,
  },
  timeButton: {
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 21,
    minWidth: 100,
    alignItems: 'center',
  },
  timeButtonSelected: {
    backgroundColor: '#FE0000',
    shadowColor: '#FE0000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  timeButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#666',
  },
  timeButtonTextSelected: {
    color: 'white',
    fontWeight: '600',
  },
  description: {
    fontSize: 12,
    color: '#787878',
    textAlign: 'center',
    marginBottom: 10,
    marginTop: 10,
    lineHeight: 20,
  },
  sendButton: {
    backgroundColor: '#FE0000',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 300,
    shadowColor: '#FE0000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  sendButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginRight: 8,
  },
  sendButtonIcon: {
    transform: [{rotate: '45deg'}],
  },
  starIcon: {
    height: 20,
    width: 20,
    marginTop: 5,
  },
});

export default Toast;
