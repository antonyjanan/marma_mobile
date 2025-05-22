import React, { useRef, useEffect, useState } from 'react';
import {
  Animated,
  View,
  Dimensions,
  StyleSheet,
  Easing,
  Image,
} from 'react-native';

const { height, width } = Dimensions.get('window');

export default function Splashscreen() {
  const ballY = useRef(new Animated.Value(0)).current;
  const redHeight = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;
  const shadowScale = useRef(new Animated.Value(1)).current;
  const shadowOpacity = useRef(new Animated.Value(0.3)).current;

  const [hideBall, setHideBall] = useState(false);

  useEffect(() => {
    const bounce = () =>
      Animated.sequence([
        Animated.parallel([
          Animated.timing(ballY, {
            toValue: -120,
            duration: 400,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(shadowScale, {
            toValue: 0.7,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(shadowOpacity, {
            toValue: 0.1,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(ballY, {
            toValue: 0,
            duration: 400,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(shadowScale, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(shadowOpacity, {
            toValue: 0.3,
            duration: 400,
            useNativeDriver: true,
          }),
        ]),
      ]);

    Animated.sequence([
      bounce(),
      bounce(),
      bounce(),
      Animated.timing(redHeight, {
        toValue: height,
        duration: 1200,
        easing: Easing.inOut(Easing.exp),
        useNativeDriver: false,
      }),
    ]).start(() => {
      setHideBall(true);
      Animated.timing(textOpacity, {
        toValue: 1,
        duration: 800,
        useNativeDriver: false,
      }).start();
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Red background spreading upward */}
      <Animated.View style={[styles.redOverlay, { height: redHeight }]} />

      {/* Shadow under the ball */}
      {!hideBall && (
        <Animated.View
          style={[
            styles.shadow,
            {
              transform: [{ scale: shadowScale }],
              opacity: shadowOpacity,
            },
          ]}
        />
      )}

      {/* Bouncing 3D red ball with highlight */}
      {!hideBall && (
        <Animated.View
          style={[
            styles.ball,
            {
              transform: [{ translateY: ballY }],
            },
          ]}
        >
          <View style={styles.highlight} />
        </Animated.View>
      )}

      {/* Company logo fade-in */}
      <Animated.Image
        source={require('../../assets/images/marmasset/mrmalogo.png')}
        style={[styles.iconCircle, { opacity: textOpacity }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-end',
    alignItems: 'center',
    overflow: 'hidden',
  },
  ball: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 20,
    zIndex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    // Android elevation
    elevation: 8,
  },
  highlight: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.6)',
    position: 'absolute',
    top: 10,
    left: 10,
  },
  shadow: {
    position: 'absolute',
    bottom: 25,
    width: 60,
    height: 10,
    borderRadius: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    zIndex: 1,
  },
  redOverlay: {
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: 'red',
    zIndex: 0,
  },
  iconCircle: {
    width: 180,
    height: 180,
    position: 'absolute',
    top: height / 2 - 90,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
});
