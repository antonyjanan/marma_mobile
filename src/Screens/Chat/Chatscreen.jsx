import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
import one from '../../assets/images/marmasset/one.png';
import {useNavigation} from '@react-navigation/core';

const {width} = Dimensions.get('window');

const Chatscreen = () => {
  const navigation = useNavigation();

  const handlegoBack = () => {
    navigation.goBack();
  };

  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! 👋',
      isUser: false,
      timestamp: '9:41',
    },
    {
      id: 2,
      text: "Thank you for reaching out. I'm Dr. Aarya, an Ayurvedic specialist with a focus on foot massage and stress relief therapies.",
      isUser: false,
      timestamp: '9:41',
    },
    {
      id: 3,
      text: 'How can I assist you today?',
      isUser: false,
      timestamp: '9:41',
    },
    {
      id: 4,
      text: "Hi Dr. Aarya! I was looking into booking a foot massage session. I'd love to know your available time slots this week.",
      isUser: true,
      timestamp: '9:42',
    },
  ]);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        isUser: true,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
    }
  };

  const renderMessage = msg => (
    <View
      key={msg.id}
      style={[
        styles.messageContainer,
        msg.isUser ? styles.userMessage : styles.otherMessage,
      ]}>
      {!msg.isUser && <Image source={one} style={styles.avatar} />}
      <View
        style={[
          styles.messageBubble,
          msg.isUser ? styles.userBubble : styles.otherBubble,
        ]}>
        <Text
          style={[
            styles.messageText,
            msg.isUser ? styles.userText : styles.otherText,
          ]}>
          {msg.text}
        </Text>
        <Text
          style={[
            styles.messageText,
            msg.isUser ? styles.userText : styles.otherText,
            {fontSize: 10, marginTop: 4},
          ]}>
          {msg.timestamp}
        </Text>
      </View>
      {msg.isUser && (
        <Image
          source={{
            uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
          }}
          style={styles.avatar}
        />
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton} onPress={handlegoBack}>
          <Image
            source={require('../../assets/images/marmasset/Back.png')}
            style={styles.illustrationBack}
            resizeMode="contain"
          />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Image source={one} style={styles.headerAvatar} />
          <Text style={styles.headerName}>Neha Sajith</Text>
        </View>

        <TouchableOpacity style={styles.headerButton}>
          <Text style={styles.headerButtonText}></Text>
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}>
        {messages.map(renderMessage)}
      </ScrollView>

      {/* Payment Button */}
      <View style={styles.paymentContainer}>
        <TouchableOpacity
          style={styles.paymentButton}
          onPress={() => {
            // Handle payment logic here
            alert('Payment feature coming soon!');
          }}>
          <Text style={styles.paymentButtonText}>Make Payment</Text>
        </TouchableOpacity>
      </View>

      {/* Input Bar */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TouchableOpacity style={styles.addButton}>
            <Image
              source={require('../../assets/images/marmasset/plus.png')}
              style={styles.addButton}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            placeholder="Type here..."
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            multiline
          />
        </View>
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Image
            source={require('../../assets/images/marmasset/Inputmsg.png')}
            style={styles.sendButton}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: '#e0e0e0',
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerButtonText: {
    fontSize: 18,
    color: '#333',
  },
  headerCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
  },
  headerName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  messagesContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  messagesContent: {
    paddingVertical: 20,
  },
  messageContainer: {
    flexDirection: 'row',
    marginVertical: 4,
    paddingHorizontal: 16,
    alignItems: 'flex-end',
  },
  userMessage: {
    justifyContent: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginHorizontal: 8,
  },
  messageBubble: {
    maxWidth: width * 0.7,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
  },
  userBubble: {
    backgroundColor: '#ff3333',
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    backgroundColor: '#fff',
    borderBottomLeftRadius: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  messageText: {
    fontSize: 13,
    lineHeight: 20,
  },
  userText: {
    color: '#fff',
  },
  otherText: {
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderTopWidth: 0.5,
    borderTopColor: '#e0e0e0',
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 25,
    paddingHorizontal: 4,
    marginRight: 12,
    minHeight: 50,
  },
  addButton: {
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#333',
    maxHeight: 100,
  },
  sendButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  illustrationBack: {
    width: 35,
    height: 35,
    marginVertical: 20,
  },

  // Payment Styles
  paymentContainer: {
    paddingHorizontal: 150,
    paddingBottom: 8,
   
  },
  paymentButton: {
    backgroundColor: '#FE0000',
    paddingVertical: 4,
    borderRadius: 30,
    alignItems: 'center',
  },
  paymentButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '400',
  },
});

export default Chatscreen;
