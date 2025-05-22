import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Toast from './Toast';
import SuccessModal from './SuccessModal';

const RequestModalManager = () => {
  const [showToast, setShowToast] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSendRequest = () => {
    setShowToast(false);
    setShowSuccess(true);
  };

  return (
    <View style={styles.container}>
      {!showToast && !showSuccess && (
        <TouchableOpacity style={styles.requestButton} onPress={() => setShowToast(true)}>
          <Text style={styles.requestButtonText}>Request a Session</Text>
        </TouchableOpacity>
      )}

      {showToast && (
        <Toast onClose={() => setShowToast(false)} onSend={handleSendRequest} />
      )}

      {/* ✅ Render Success Modal absolutely to overlay everything */}
      {showSuccess && (
        <View style={StyleSheet.absoluteFill}>
          <SuccessModal onClose={() => setShowSuccess(false)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestButton: {
    backgroundColor: '#FE0000',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  requestButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default RequestModalManager;
