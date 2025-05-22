import {useNavigation} from '@react-navigation/core';
import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

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
          <Text style={styles.headerTitle}>Privacy Policy</Text>
        </View>
      </View>

  

      {/* Content */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Section 1 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Types data we collect</Text>
          <Text style={styles.sectionText}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
          <Text style={styles.sectionText}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse
            cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
            cupidatat non proident.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Use of your personal data</Text>
          <Text style={styles.sectionText}>
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae.
          </Text>
          <Text style={styles.sectionText}>
            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut
            fugit.
          </Text>
        </View>

        {/* Section 3 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            3. Disclosure of your personal data
          </Text>
          <Text style={styles.sectionText}>
            At vero eos et accusamus et iusto odio dignissimos ducimus qui
            blanditiis praesentium voluptatum deleniti atque corrupti quos
            dolores et quas molestias excepturi sint occaecati cupiditate non
            provident, similique sunt in culpa qui officia deserunt mollitia
            animi, id est laborum et dolorum fuga.
          </Text>
          <Text style={styles.sectionText}>
            Et harum quidem rerum facilis est et expedita distinctio. Nam libero
            tempore, cum soluta nobis est eligendi optio cumque nihil impedit
            quo minus id quod maxime placeat facere possimus, omnis voluptas
            assumenda est, omnis dolor repellendus.
          </Text>
          <Text style={styles.sectionText}>
            Temporibus autem quibusdam et aut officiis debitis aut rerum
            necessitatibus saepe eveniet ut et voluptates repudiandae sint et
            molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
            delectus
          </Text>
        </View>
      </ScrollView>

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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
    lineHeight: 24,
  },
  sectionText: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 16,
    textAlign: 'justify',
  },
 
  //========================================

  
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

export default PrivacyPolicyScreen;
