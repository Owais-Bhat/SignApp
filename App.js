import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import Icon from "react-native-vector-icons/FontAwesome"; // Import vector icons
import TwitterSignIn from "./Twitter"; // Ensure you have your Twitter sign-in component
import { LinearGradient } from "expo-linear-gradient"; // Updated import for gradient

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  // Replace with your actual client IDs
  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "757320797298-rckag5s0a4asrqu914pel8l33a0v1c0n.apps.googleusercontent.com",
    webClientId:
      "757320797298-4ppa9ctgiu7ponbb8j2op8kj6fvmu0aa.apps.googleusercontent.com",
  });

  const [signedIn, setSignedIn] = useState(false);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      setSignedIn(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [response]);

  const signInButton = (
    <TouchableOpacity
      style={styles.buttonWrapper}
      disabled={!request}
      onPress={() => promptAsync()}
    >
      {/* Gradient Background */}
      <LinearGradient
        colors={["#34A853", "#4285F4"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.button}
      >
        <Icon name="google" size={24} color="#fff" style={styles.googleIcon} />
        <Text style={styles.buttonText}>Sign In with Google</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const tickOpacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // Animate opacity from 0 to 1
  });

  return (
    <View style={styles.container}>
      {signedIn ? (
        <View style={styles.successContainer}>
          <Text style={styles.signedInText}>Sign In Successful</Text>
          <Animated.View style={{ opacity: tickOpacity }}>
            <Icon
              name="check-circle"
              size={80}
              color="green"
              style={styles.tickIcon}
            />
          </Animated.View>
        </View>
      ) : (
        signInButton
      )}

      <TwitterSignIn />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5", // Light background
  },
  buttonWrapper: {
    borderRadius: 30,
    overflow: "hidden", // Ensure gradient stays within the button shape
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // For Android shadow effect
  },
  button: {
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  googleIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  successContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  signedInText: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#34A853",
  },
  tickIcon: {
    marginTop: 20,
  },
});
