import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import {
    StyleSheet, View, Text, Image, TouchableOpacity, StatusBar,
    SafeAreaView, FlatList, Modal, Dimensions
} from 'react-native';

const Favorites = () => {
    const navigation = useNavigation();
    const [favorites, setFavorites] = useState([
        { id: '1', name: 'Kerala Prawn', image: require("../../assets/images/Fishimage/splashimage.png"), price: 350, unit: '500gm', rating: 4.8, isFavorite: true },
        { id: '2', name: 'Kerala Fish', image: require("../../assets/images/Fishimage/splashimage.png"), price: 150, unit: '500gm', rating: 4.8, isFavorite: true },
        { id: '3', name: 'Kerala Fish', image: require("../../assets/images/Fishimage/splashimage.png"), price: 150, unit: '500gm', rating: 4.8, isFavorite: true },
        { id: '4', name: 'Kerala Prawn', image: require("../../assets/images/Fishimage/splashimage.png"), price: 350, unit: '500gm', rating: 4.8, isFavorite: true },
    ]);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    const handleFavoritePress = (id) => {
        setSelectedItemId(id);
        setModalVisible(true);
    };

    const cancelRemoval = () => {
        setModalVisible(false);
        setSelectedItemId(null);
    };

    const confirmRemoval = () => {
        if (selectedItemId) {
            setFavorites(favorites.map((item) =>
                item.id === selectedItemId ? { ...item, isFavorite: false } : item
            ));
        }
        setModalVisible(false);
        setSelectedItemId(null);
    };


    const [isMultiSelectMode, setMultiSelectMode] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    // Toggle multi-select mode
    const toggleMultiSelectMode = () => {
        setMultiSelectMode(!isMultiSelectMode);
        setSelectedItems([]); // Reset selection
    };

    // Toggle item selection
    const toggleSelection = (id) => {
        setSelectedItems(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    // Remove selected items
    const removeSelectedItems = () => {
        setFavorites(favorites.filter(item => !selectedItems.includes(item.id)));
        setMultiSelectMode(false);
        setSelectedItems([]);
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <View style={styles.card}>
                <View style={styles.imageContainer}>
                    <Image source={item.image} style={styles.image} />


                    {isMultiSelectMode ? (
                        <TouchableOpacity style={styles.favoriteButton} onPress={() => { toggleSelection(item.id) }}>
                            <Image
                                source={selectedItems.includes(item.id)
                                    ? require('../../assets/images/Fishimage/Tick.png')
                                    : require('../../assets/images/Fishimage/Untick.png')}
                                style={styles.heartIcon}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    ) : (

                        <TouchableOpacity style={styles.favoriteButton} onPress={() => { handleFavoritePress(item.id) }}>
                            <Image
                                source={item.isFavorite
                                    ? require('../../assets/images/Fishimage/favourtieheart.png')
                                    : require('../../assets/images/Fishimage/unfavourtie.png')}
                                style={styles.heartIcon}
                                resizeMode='contain'
                            />
                        </TouchableOpacity>
                    )}
                </View>
                <View >
                    <View style={styles.rownamerate}>
                        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                        <View style={styles.ratingContainer}>
                            <Image source={require('../../assets/images/Fishimage/star.png')} style={styles.starIcon} resizeMode='contain' />
                            <Text style={styles.rating}>{item.rating}</Text>
                        </View>
                    </View>
                    <View style={styles.priceContainer}>
                        <Text style={styles.price}>₹ {item.price}</Text>
                        <Text style={styles.unit}>/ {item.unit}</Text>
                    </View>
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>Add to Cart</Text>
                    </TouchableOpacity>

                </View>

            </View>

        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />



            {isMultiSelectMode ? (


                <View style={styles.header}>
                    <TouchableOpacity style={styles.searchButton} onPress={() => setMultiSelectMode(false)}>
                        <Image
                            source={require('../../assets/images/Fishimage/Close.png')}
                            style={styles.backButton}
                        />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Select Unfavorites</Text>
                        <Text style={styles.subtitle}>{selectedItems.length} items</Text>
                    </View>
                    <TouchableOpacity style={styles.menuButton} onPress={toggleMultiSelectMode}>
                        <Image source={require('../../assets/images/Fishimage/Menu.png')} style={styles.backButton} />
                    </TouchableOpacity>
                </View>
            ) : (
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Image source={require('../../assets/images/Fishimage/Back.png')} style={styles.backButton} />
                    </TouchableOpacity>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Favorites</Text>
                        <Text style={styles.subtitle}>{favorites.filter(item => item.isFavorite).length} items</Text>
                    </View>
                    <TouchableOpacity style={styles.menuButton} onPress={toggleMultiSelectMode}>
                        <Image source={require('../../assets/images/Fishimage/Menu.png')} style={styles.backButton} />
                    </TouchableOpacity>
                </View>
            )}





            <FlatList
                data={favorites.filter(item => item.isFavorite)}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                numColumns={2}
                columnWrapperStyle={styles.columnWrapper}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.listContainer}
            />


            {isMultiSelectMode && (
               <View style={styles.multiSelectActionsremove}>
               <TouchableOpacity
                   style={[styles.removeButtonSelected, selectedItems.length === 0 && styles.disabledButton]}
                   onPress={removeSelectedItems}
                   disabled={selectedItems.length === 0}  // Disable button if no items selected
               >
                   <Text style={styles.removeButtonSelectedtext}>Remove from favorites</Text>
               </TouchableOpacity>
           </View>
           
            )}
            {/* Unfavorite Confirmation Modal */}
            <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={cancelRemoval}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Remove from favorite list?</Text>
                        <View style={styles.modalButtonsContainer}>
                            <TouchableOpacity style={styles.cancelButton} onPress={cancelRemoval}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.removeButton} onPress={confirmRemoval}>
                                <Text style={styles.removeButtonText}>Yes, Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff', marginTop: 20 },
    header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#f0f0f0' },
    backButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    titleContainer: { flex: 1, paddingHorizontal: 12 },
    title: { fontSize: 18, fontWeight: 'bold' },
    subtitle: { fontSize: 14, color: '#666' },
    menuButton: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
    listContainer: { padding: 8 },
    columnWrapper: { justifyContent: 'space-between' },
    ratingContainer: { flexDirection: 'row', alignItems: 'center' },
    itemContainer: { width: '48.5%', marginVertical: 8 },
    card: { padding: 10, backgroundColor: '#fff', borderRadius: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 2 },
    imageContainer: { position: 'relative' },
    image: { width: '100%', height: 120, borderRadius: 10 },
    favoriteButton: { position: 'absolute', top: 8, right: 8, backgroundColor: 'rgba(255, 255, 255, 0.7)', borderRadius: 15, width: 30, height: 30, alignItems: 'center', justifyContent: 'center' },
    heartIcon: { width: 14, height: 12 },
    starIcon: {
        width: 20, height: 20
    },
    rownamerate:
    {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        marginTop: 5
    },
    priceContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
    price: { fontSize: 16, fontWeight: 'bold', color: '#2196F3' },
    unit: { fontSize: 14, color: '#666', marginLeft: 4 },
    addButton: { backgroundColor: '#2196F3', borderRadius: 4, paddingVertical: 8, alignItems: 'center' },
    addButtonText: { color: '#fff', fontWeight: '500', fontSize: 14 },
    //Multiple Selection 
    disabledButton: {
        backgroundColor: '#ccc',  // Change to a disabled look
        opacity: 0.6,
    },
    

    multiSelectActions: {

        marginHorizontal: 20,

    },
    multiSelectActionsremove: {
        alignItems: 'center',
        justifyContent: 'center' ,
        marginBottom: 40

    },

    removeButtonSelectedtext:{
        color:'white'
    },


    //modal---------------
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContainer: { width: width - 48, backgroundColor: 'white', borderRadius: 8, padding: 20, alignItems: 'center' },

    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        color: 'black'
    },
    modalButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    cancelButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: 'center',
        marginRight: 8,
    },
    cancelButtonText: {
        color: '#b71c1c',
        fontWeight: '500',
    },
    removeButton: {
        flex: 1,
        backgroundColor: '#b71c1c',
        borderRadius: 6,
        paddingVertical: 12,
        alignItems: 'center',
        marginLeft: 8,
    },
    removeButtonText: {
        color: 'white',
        fontWeight: '500',
    },

    removeButtonSelected: {
        backgroundColor: '#0C8CE9',
        marginHorizontal:20,
        width:'95%',
        paddingVertical: 10,
        justifyContent: 'center'
        ,
        alignItems: 'center',
        borderRadius: 5
    }
});

export default Favorites;
