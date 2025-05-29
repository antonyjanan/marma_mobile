// import React, { useEffect, useRef } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   Animated,
//   Dimensions,
// } from 'react-native';

// const { width, height } = Dimensions.get('window');

// const SuccessModal = ({ onClose }) => {
//   const scaleAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     Animated.spring(scaleAnim, {
//       toValue: 1,
//       friction: 5,
//       useNativeDriver: true,
//     }).start();
//   }, []);

//   return (
//     <View style={styles.overlay}>
//       <Animated.View style={[styles.modal, { transform: [{ scale: scaleAnim }] }]}>
//         <Text style={styles.emoji}>🎉</Text>
//         <Text style={styles.message}>Request Sent Successfully!</Text>
//         <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//           <Text style={styles.closeText}>Close</Text>
//         </TouchableOpacity>
//       </Animated.View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   overlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.5)',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   modal: {
//     width: width * 0.8,
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.25,
//     shadowRadius: 10,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 10,
//   },
//   emoji: {
//     fontSize: 48,
//     marginBottom: 10,
//   },
//   message: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: '#333',
//     textAlign: 'center',
//     marginBottom: 25,
//   },
//   closeButton: {
//     backgroundColor: '#FE0000',
//     paddingVertical: 10,
//     paddingHorizontal: 30,
//     borderRadius: 10,
//   },
//   closeText: {
//     color: '#fff',
//     fontWeight: '600',
//     fontSize: 16,
//   },
// });

// export default SuccessModal;



import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  Dimensions,
  Image,
} from 'react-native';

const { width } = Dimensions.get('window');

const SuccessModal = ({
  onClose,
  title = 'Request Sent Successfully!',
  emoji = '🎉',
  image = null,
  buttonText = 'Close',
}) => {
  const scaleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 5,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <View style={styles.overlay}>
      <Animated.View style={[styles.modal, { transform: [{ scale: scaleAnim }] }]}>
        {image ? (
          <Image source={image} style={styles.image} resizeMode="contain" />
        ) : (
          <Text style={styles.emoji}>{emoji}</Text>
        )}
        <Text style={styles.message}>{title}</Text>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeText}>{buttonText}</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: width * 0.8,
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 10,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 10,
  },
  image: {
    width: 300,
    height:99,
    marginBottom: 0,
  },
  message: {
    fontSize: 14,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    marginBottom: 25,
  },
  closeButton: {
    backgroundColor: '#FE0000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  closeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});

export default SuccessModal;
