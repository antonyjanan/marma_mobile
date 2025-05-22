import React from 'react';
import { Text, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';

const GradientText = ({ text }) => {
  return (
    <MaskedView maskElement={<Text style={styles.text}>{text}</Text>}>
      <LinearGradient
        colors={['#FE0000', '#000000']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}>
        <Text style={[styles.text, { opacity: 0 }]}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom:20
  },
});

export default GradientText;
