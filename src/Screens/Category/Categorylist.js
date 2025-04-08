import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, StatusBar, TextInput } from 'react-native';




const Categorylist = () => {
    const [selectedCategory, setSelectedCategory] = useState('Fruits');
    const [expandedCategory, setExpandedCategory] = useState('Fruits');
    const [search, setSearch] = useState(false);


    const navigation = useNavigation();

    // const handlePress = () => {
    //     navigation.navigate('Login');
    // };

    const categories = [
        { id: 'fishes', name: 'Fishes', icon: require("../../assets/images/Fishimage/splashimage.png"), },
        { id: 'fruits', name: 'Fruits', icon: require("../../assets/images/Fishimage/splashimage.png"), },
        { id: 'vegetables', name: 'Vegetables', icon: require("../../assets/images/Fishimage/splashimage.png"), },
    ];

    const fruitSubcategories = [
        { id: 'banana', name: 'Banana' },
        { id: 'mango', name: 'Mango' },
        { id: 'jackfruit', name: 'Jackfruit' },
        { id: 'guava', name: 'Guava' },
        { id: 'watermelon', name: 'Watermelon' },
        { id: 'apple', name: 'Apple' },
        { id: 'orange', name: 'Orange' },
    ];

    const profileCards = [
        { id: 'ethan', name: 'Ethan', surname: 'Nentran', image: require("../../assets/images/Fishimage/splashimage.png"), },
        { id: 'poovan', name: 'Poovan', image: require("../../assets/images/Fishimage/splashimage.png"), },
        { id: 'robusta', name: 'robusta', image: require("../../assets/images/Fishimage/splashimage.png"), },
    ];

    const toggleCategoryExpansion = (category) => {
        if (expandedCategory === category) {
            setExpandedCategory(null);
        } else {
            setExpandedCategory(category);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="#87CEEB" barStyle="dark-content" hidden={false} />


            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}  onPress={() =>navigation.goBack()}>
                    <Image
                        source={require('../../assets/images/Fishimage/Back.png')}
                        style={styles.backButton}
                    />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>All Categories</Text>

                {search ? (
                    <TouchableOpacity style={styles.searchButton} onPress={() => setSearch(false)}>
                        <Image
                            source={require('../../assets/images/Fishimage/Close.png')}
                            style={styles.backButton}
                        />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity style={styles.searchButton} onPress={() => setSearch(true)}>
                        <Image
                            source={require('../../assets/images/Fishimage/SearchCate.png')}
                            style={styles.backButton}
                        />
                    </TouchableOpacity>
                )}


            </View>
            {/* //------search------------------- */}

            {search && (

                <View style={styles.searchContainer}>
                    <View style={styles.insideseach}>
                        <View style={styles.seachtext}>
                            <TouchableOpacity style={styles.filterIcon}>
                                <Image
                                    source={require('../../assets/images/Fishimage/Search.png')}
                                    style={styles.filterIconImage}
                                />
                            </TouchableOpacity>
                            <TextInput
                                placeholder="Search menu, restaurant or etc"
                                style={styles.searchInput}
                            />
                        </View>
                        <TouchableOpacity style={styles.filterIcon}>
                            {/* <Image
                                source={require('../../assets/images/Fishimage/Filter.png')}
                                style={styles.filterIconImage}
                            /> */}
                        </TouchableOpacity>
                    </View>
                </View>
            )}


            <View style={styles.content}>

                <View style={styles.sidebar}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        {categories.map((category) => (
                            <View key={category.id}>
                                <TouchableOpacity
                                    style={[
                                        styles.categoryItem,
                                        selectedCategory === category.name && styles.selectedCategory,
                                    ]}
                                    onPress={() => {
                                        setSelectedCategory(category.name);
                                        toggleCategoryExpansion(category.name);
                                    }}
                                >
                                    <Image source={category.icon} style={styles.categoryIcon} />
                                    <Text style={styles.categoryText}>{category.name}</Text>
                                    {category.name === 'Fruits' && (
                                        <TouchableOpacity style={{}}
                                            onPress={() => {
                                                setSelectedCategory(category.name);
                                                toggleCategoryExpansion(category.name);
                                            }}
                                        >
                                            <Image
                                                source={
                                                    expandedCategory === 'Fruits'
                                                        ? require('../../assets/images/Fishimage/Up.png')
                                                        : require('../../assets/images/Fishimage/Down.png')
                                                }
                                                style={styles.downarrow}
                                                resizeMode='contain'
                                            />
                                        </TouchableOpacity>
                                    )}

                                </TouchableOpacity>

                                {category.name === 'Fruits' && expandedCategory === 'Fruits' && (
                                    <View style={styles.subcategoriesContainer}>
                                        {fruitSubcategories.map((subcategory) => (
                                            <TouchableOpacity
                                                key={subcategory.id}
                                                style={styles.subcategoryItem}
                                            >
                                                <Text style={styles.subcategoryText}>{subcategory.name}</Text>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}
                    </ScrollView>
                </View>

                {/* Right content */}
                <View style={styles.mainContent}>
                    <View style={styles.profileCardsContainer}>
                        {profileCards.map((profile) => (
                            <View key={profile.id} style={styles.profileCard}>
                                <Image source={profile.image} style={styles.profileImage} />
                                <Text style={styles.profileName}>{profile.name}</Text>
                                {profile.surname && (
                                    <Text style={styles.profileSurname}>{profile.surname}</Text>
                                )}
                            </View>
                        ))}
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        marginTop: 20
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
   
        alignItems: 'center',
        justifyContent: 'center',
    },
    downarrow: {
        width: 15,
        height: 15,

    },
    headerTitle: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    searchButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        flex: 1,
        flexDirection: 'row',
    },
    sidebar: {
        width: '40%',
        backgroundColor: '#fff',
        borderRightWidth: 1,
        borderRightColor: '#eaeaea',
    },
    categoryItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
        backgroundColor: '#F5F5F5'

    },
    selectedCategory: {
        borderLeftWidth: 4,
        borderLeftColor: '#3b82f6',
        backgroundColor: 'white',
    },
    categoryIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        marginRight: 12,
    },
    categoryText: {
        fontSize: 16,
        fontWeight: '500',
        flex: 1,
    },
    expandIcon: {
        marginLeft: 'auto',
    },
    subcategoriesContainer: {
        backgroundColor: '#f8f8f8',
    },
    subcategoryItem: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        paddingLeft: 28,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    subcategoryText: {
        fontSize: 16,
        color: '#333',
    },
    mainContent: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    profileCardsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',

    },
    profileCard: {
        width: '30%',
        alignItems: 'center',
        marginBottom: 16,

    },
    profileImage: {
        width: 70,
        height: 70,
        borderRadius: 35,
        marginBottom: 8,
    },
    profileName: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },
    profileSurname: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
    },


    //------search-------------------

    searchContainer: {
        borderWidth: 1,
        borderRadius: 12,
        borderColor: '#D6D6D6',
        height: 42,
        marginTop: 10,
        overflow: 'hidden',
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
        backgroundColor: 'white'
    },

    searchInput: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: 'transparent',
        height: '100%',
        fontSize: 14,
        color: '#878787',
    },

    seachtext: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    insideseach: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
    },

    filterIconImage: {
        height: 18,
        width: 18,
        marginHorizontal: 10,
    },

    filterIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Categorylist;