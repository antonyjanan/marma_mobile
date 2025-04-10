import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';

const CustomDropdown = ({form, handleChange}) => {
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(form.type || '');

  const addressTypes = ['Home', 'Work', 'Other'];

  const handleSelect = item => {
    setSelected(item);
    handleChange('type', item);
    setVisible(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setVisible(true)}>
        <Text style={selected ? styles.dropdownText : styles.placeholder}>
          {selected || 'Select address type'}
        </Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setVisible(false)}
          activeOpacity={1}>
          <View style={styles.modalContent}>
            {addressTypes.map(item => (
              <TouchableOpacity
                key={item}
                style={styles.item}
                onPress={() => handleSelect(item)}>
                <Text style={styles.itemText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 12,
    borderRadius: 6,
    marginBottom: 12,
  },
  dropdownText: {
    fontSize: 16,
    color: '#000',
  },
  placeholder: {
    fontSize: 16,
    color: '#aaa',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 10,
    elevation: 5,
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  itemText: {
    fontSize: 16,
  },
});

export default CustomDropdown;
