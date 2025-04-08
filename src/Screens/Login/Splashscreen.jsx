import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    StatusBar,
    SafeAreaView,
    ImageBackground,
    Image,
    TouchableOpacity
} from 'react-native';


const Splashscreen = () => {
    // useEffect(() => {
    //     // Hide splash screen after loading
    //     const timer = setTimeout(() => {
    //         SplashScreen.hide();
    //     }, 2000); // Adjust timeout as needed

    //     return () => clearTimeout(timer);
    // }, []);

    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Login');
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar hidden={true} />
            <ImageBackground
                source={require('../../assets/images/Fishimage/splashimage.png')}
                style={styles.backgroundImage}
                resizeMode="cover"
            >
                <View style={styles.contentOverlay}>
                    {/* <Text style={styles.titleText}>Fresh Fish & Groceries, One Click Away!</Text>
          <Text style={styles.subtitleText}>
            Quality seafood and daily essentials, delivered straight to your home!
          </Text> */}
                    <Image
                        source={require('../../assets/images/Fishimage/Quotes.png')}
                        style={styles.fishImage}
                        resizeMode="contain"
                    />
                    <View style={styles.buttonmain}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={handlePress} // Navigate on press
                        >
                            <Text style={styles.buttonText}>Go Ahead</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    backgroundImage: {
        position: 'absolute',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,

    },
    contentOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        marginHorizontal: 20,
        paddingBottom: 40,
    },
    titleText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: "poppins",
        marginBottom: 5,
        textAlign: 'left',
        zIndex: 9999
    },
    subtitleText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'left',

    },
    fishImage: {
        width: '100%',
        height: 100
    },
    // Button Styling

    button: {
        borderWidth: 0.5,
        alignSelf: 'flex-end',
        borderColor: 'white',
        borderRadius: 80,
        paddingVertical: 15,
        width: '35%',
        backgroundColor: 'transparent',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '500',
        textAlign: 'center',
    },
});

export default Splashscreen;
