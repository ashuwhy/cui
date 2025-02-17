import React, { useEffect, useRef, useState } from 'react';
import { Alert, Animated, Easing, SafeAreaView, StyleSheet, Text, TouchableOpacity, Dimensions, View, Image, Platform } from 'react-native';
import TrackPlayer, { Event, State, Capability } from 'react-native-track-player';
import { Heart } from 'react-feather';

// Add this interface above your playlist declaration
interface PlayList {
  name: string;
  writer: string;
  img: any;
  src: any;
  id: number;
}

// Setup the player
async function setupPlayer() {
  await TrackPlayer.setupPlayer();
  await TrackPlayer.add({
    id: 'romantic',
    url: require('./assets/concert.wav'), // You'll need to add your music file
    title: 'Tiny Desk Concert',
    artist: 'Justin Bieber',
    isLive: false // Add this new required field
  });
  await TrackPlayer.setVolume(0.5); // Set volume to 50%
  await TrackPlayer.play(); // Auto-start playback
  await TrackPlayer.updateOptions({
    stoppingAppPausesPlayback: false,
    capabilities: [
      Capability.Play,
      Capability.Pause,
      Capability.Stop
    ],
  });
}

// Then declare your playlist
const playList: PlayList[] = [
  {
    name: 'Tiny Desk Concert',
    writer: 'Justin Bieber',
    img: require('./assets/heart-icon.png'),
    src: require('./assets/concert.wav'),
    id: 1,
  },
];

export default function App() {
  const heartAnim = useRef(new Animated.Value(1)).current;
  const noButtonAnim = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
  // New animated values for extra effects:
  const rotationAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));

  // Add padding to keep button away from edges
  const BUTTON_PADDING = 0;
  const BUTTON_WIDTH = 100; // Approximate width of the button
  const BUTTON_HEIGHT = 50; // Approximate height of the button

  // Add music control state
  const [isPlaying, setIsPlaying] = useState(false);

  // Initialize music player
  useEffect(() => {
    const setup = async () => {
      await setupPlayer();
      await TrackPlayer.play();
      setIsPlaying(true);
    };

    // Add event listeners
    const events = [
      TrackPlayer.addEventListener(Event.PlaybackState, () => {}),
      TrackPlayer.addEventListener(Event.PlaybackTrackChanged, () => {}),
      TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, () => {})
    ];

    setup();
    
    return () => {
      // Cleanup event listeners
      events.forEach(event => event.remove());
      TrackPlayer.reset();
    };
  }, []);

  const toggleMusic = async () => {
    const state = await TrackPlayer.getState();
    if (state === State.Playing) {
      await TrackPlayer.pause();
      setIsPlaying(false);
    } else {
      await TrackPlayer.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    // Heart animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(heartAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(heartAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [heartAnim]);

  const moveNoButton = () => {
    // Add more padding to keep button away from edges
    const SAFE_PADDING = 20;
    
    // Calculate safe boundaries within the screen.
    // We subtract the button width/height plus padding from both sides
    const safeWidth = windowDimensions.width - BUTTON_WIDTH - (2 * SAFE_PADDING);
    const safeHeight = windowDimensions.height - BUTTON_HEIGHT - (2 * SAFE_PADDING);
    
    // Generate random positions within safe area
    // Add SAFE_PADDING to ensure button doesn't touch screen edges
    const randomX = Math.random() * safeWidth + SAFE_PADDING;
    const randomY = Math.random() * safeHeight + SAFE_PADDING;

    // Convert to center-relative coordinates
    const centerOffsetX = randomX - (windowDimensions.width / 2);
    const centerOffsetY = randomY - (windowDimensions.height / 2);

    // Clamp the values to ensure they stay within bounds
    const clampedX = Math.max(
      -(windowDimensions.width / 2) + SAFE_PADDING,
      Math.min(centerOffsetX, (windowDimensions.width / 2) - BUTTON_WIDTH - SAFE_PADDING)
    );
    const clampedY = Math.max(
      -(windowDimensions.height / 2) + SAFE_PADDING,
      Math.min(centerOffsetY, (windowDimensions.height / 2) - BUTTON_HEIGHT - SAFE_PADDING)
    );

    // Animate to the clamped position
    Animated.parallel([
      Animated.spring(noButtonAnim, {
        toValue: { x: clampedX, y: clampedY },
        useNativeDriver: true,
        friction: 5,
        overshootClamping: true,
      }),
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]),
      Animated.sequence([
        Animated.timing(rotationAnim, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(rotationAnim, {
          toValue: -1,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(rotationAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
      ])
    ]).start();
  };

  // Set initial position of No button
  useEffect(() => {
    // Position it next to the Yes button initially
    noButtonAnim.setValue({ 
      x: BUTTON_PADDING, 
      y: 0 
    });
  }, []);

  const onYesPress = () => {
    Alert.alert(
      "yay!",
      "you just made my day! can't wait to create memories with you.",
      [{ text: "wonderful", onPress: () => console.log("Proposal accepted!") }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Animated.Text style={[styles.heart, { transform: [{ scale: heartAnim }] }]}>
          ❤️
        </Animated.Text>
        <Text style={styles.title}>Will You Be My Girlfriend?</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={onYesPress} style={styles.button}>
            <Text style={styles.buttonText}>yes</Text>
          </TouchableOpacity>
          
          <Animated.View
            style={{
              transform: [
                { translateX: noButtonAnim.x },
                { translateY: noButtonAnim.y },
                {
                  // Interpolate rotation value: from -1 to 1 mapped to -10deg to 10deg
                  rotate: rotationAnim.interpolate({
                    inputRange: [-1, 1],
                    outputRange: ['-10deg', '10deg']
                  })
                },
                { scale: scaleAnim }
              ],
            }}
          >
            <TouchableOpacity onPress={moveNoButton} style={[styles.button, styles.noButton]}>
              <Text style={styles.buttonText}>no</Text>
            </TouchableOpacity>
          </Animated.View>
        </View>

        {/* Music Player Control */}
        <TouchableOpacity 
          onPress={toggleMusic} 
          style={styles.musicButton}
        >
          <Text style={styles.musicButtonText}>
            {isPlaying ? '⏸' : '❤️'} 
          </Text>
        </TouchableOpacity>
      </View>
      
      <Image 
        source={require('./assets/rose2.png')} 
        style={styles.roseImage}
      />
      <Image 
        source={require('./assets/rose1.png')} 
        style={styles.roseImageBottom}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF2F7', // Very light pink background
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  heart: {
    fontFamily: Platform.select({
      ios: 'Noto Color Emoji',
      android: 'NotoColorEmoji',
    }),
    fontSize: 120,
    marginBottom: 55,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 3,
  },
  title: {
    fontFamily: 'Kugile',
    textTransform: 'lowercase',
    fontSize: 34,
    fontWeight: '700',
    color: '#FF2D55',
    textAlign: 'center',
    marginBottom: 40,
    textShadowColor: 'rgba(255, 45, 85, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    zIndex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    backgroundColor: '#FF2D55', // iOS pink for primary button
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 100, // More rounded for a softer look
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 3,
    // Add subtle gradient effect through opacity
    opacity: 1,
  },
  noButton: {
    backgroundColor: '#0091ff', // iOS gray, less aggressive than red
  },
  buttonText: {
    fontFamily: 'Atkinson Hyperlegible Next',
    fontSize: 18,
    color: '#ffffff',
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  musicButton: {
    position: 'absolute',
    bottom: 40,
    backgroundColor: 'rgba(255, 45, 85, 0.1)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF2D55',
    zIndex: 2,
  },
  musicButtonText: {
    // fontFamily: 'Noto Color Emoji',
    color: '#FF2D55',
    fontSize: 14,
    fontWeight: '600',
  },
  roseImage: {
    position: 'absolute',
    top: -5,
    left: -60,
    width: 250,
    height: 250,
    resizeMode: 'contain',
    opacity: 1,
    zIndex: 1,
  },
  roseImageBottom: {
    position: 'absolute',
    bottom: -55,
    right: -40,
    width: 250,
    height: 250,
    resizeMode: 'contain',
    opacity: 1,
    zIndex: 0,
    transform: [{ scaleX: 1 }, { rotate: '180deg' }], // Mirror the rose horizontally
    
  },
  audioPlayerContainer: {
    backgroundColor: '#FF2D55',
    borderRadius: 20,
    padding: 10,
  },
});