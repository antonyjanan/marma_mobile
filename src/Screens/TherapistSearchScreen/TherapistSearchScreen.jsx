import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import SearchComponent from '../../Component/SearchComponent/SearchComponent';

const TherapistSearchScreen = () => {
  const [selectedGender, setSelectedGender] = useState(null);

  const trendingTherapists = [
    {
      id: 1,
      name: 'Nguyen, Shane',
      specialty: 'Foot Reflexology Specialist',
      image: require('../../assets/images/marmasset/one.png'),
    },
    {
      id: 2,
      name: 'Nguyen, Shane',
      specialty: 'Foot Reflexology Specialist',
      image: require('../../assets/images/marmasset/two.png'),
    },
    {
      id: 3,
      name: 'Nguyen, Shane',
      specialty: 'Foot Reflexology Specialist',
      image: require('../../assets/images/marmasset/three.png'),
    },
  ];

  const searchSuggestions = [
    {id: 1, text: 'Most booked therapists'},
    {id: 2, text: 'Trending therapies'},
    {id: 3, text: 'Highly reviewed therapist'},
    {id: 4, text: 'Top rated in your area'},
    {id: 5, text: 'Trusted by locals'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      <SearchComponent />

      {/* Search Input */}
      <View style={styles.searchContainer}>
        <Image
          source={require('../../assets/images/marmasset/search.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search categories, therapists, etc..."
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView
        style={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        {/* Gender Selection */}
        <View style={styles.genderFilters}>
          <TouchableOpacity
            style={[
              styles.genderButton,
              selectedGender === 'female' && styles.selectedGender,
            ]}
            onPress={() => setSelectedGender('female')}>
            <Image
              source={require('../../assets/images/marmasset/female.png')}
              style={styles.genderIcon}
            />
            <Text style={styles.genderText}>Female</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.genderButton,
              selectedGender === 'male' && styles.selectedGender,
            ]}
            onPress={() => setSelectedGender('male')}>
            <Image
              source={require('../../assets/images/marmasset/male.png')}
              style={styles.genderIcon}
            />
            <Text style={styles.genderText}>Male</Text>
          </TouchableOpacity>
        </View>

        {/* Search Suggestions */}
        <View style={styles.suggestionsSection}>
          <Text style={styles.sectionTitle}>You Might Want To Search</Text>
          <View style={styles.chipContainer}>
            {searchSuggestions.map(suggestion => (
              <TouchableOpacity key={suggestion.id} style={styles.chip}>
                <Text style={styles.chipText}>{suggestion.text}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Trending Section */}
        <View style={styles.trendingSection}>
          <Text style={styles.sectionTitle}>Trending</Text>
          {trendingTherapists.map((therapist, index) => (
            <TouchableOpacity key={therapist.id} style={styles.therapistCard}>
              <Image source={therapist.image} style={styles.therapistImage} />
              <View style={styles.therapistInfo}>
                <View>
                  <Text style={styles.therapistNumber}>
                    {index + 1}. {therapist.specialty} by
                  </Text>
                  <Text style={styles.therapistName}>{therapist.name}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  illustration: {
    width: 20,
    height: 20,
    marginRight: 10,
    marginLeft: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationPin: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  currentLocationText: {
    fontSize: 12,
    color: '#999',
  },
  locationAddress: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    maxWidth: 200,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,

    height: 42,
    borderColor: '#F5F5F5',
    borderWidth: 1,
    backgroundColor: 'white',

    borderRadius: 20,
  },
  searchIcon: {},
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 14,
    color: '#000',
  },
  scrollContent: {
    flex: 1,
    marginTop: 20,
  },
  genderFilters: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  genderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    marginRight: 12,
  },
  selectedGender: {
    backgroundColor: '#F0F9FF',
    borderColor: 'red',
  },
  genderIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  genderText: {
    fontSize: 14,
    color: '#333',
  },
  suggestionsSection: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  trendingSection: {
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#000',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderColor: '#F5F5F5',
    borderWidth: 1,
    borderRadius: 24,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  therapistCard: {
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  therapistImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  therapistInfo: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginLeft: 10,
  },
  therapistNumber: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  therapistName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  tabBar: {
    flexDirection: 'row',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderTopWidth: 2,
    borderTopColor: '#FF3B30',
  },
  tabText: {
    fontSize: 12,
    color: '#999',
    marginTop: 4,
  },
  activeTabText: {
    color: '#FF3B30',
  },
});

export default TherapistSearchScreen;
