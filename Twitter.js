import React, { useState } from "react";
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import * as AuthSession from "expo-auth-session";
import { Ionicons } from "@expo/vector-icons"; // Using Ionicons for the Twitter logo
import * as Animatable from "react-native-animatable";

const clientId = "V3RLLURuLW15ZEM1a2Y0dUtVY086MTpjaQ";
const redirectUri = AuthSession.makeRedirectUri({ useProxy: true });
const twitterAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=tweet.read%20tweet.write%20users.read%20offline.access&state=state&code_challenge=challenge&code_challenge_method=plain`;

export default function TwitterSignIn() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const authResult = await AuthSession.startAsync({
      authUrl: twitterAuthUrl,
    });
    setLoading(false);
    setResult(authResult);
  };

  return (
    <View style={styles.container}>
      {/* Animated View for the Button */}
      <Animatable.View
        animation="pulse"
        iterationCount="infinite"
        duration={2000}
      >
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          {/* Icon and Text in the Button */}
          <Ionicons
            name="logo-twitter"
            size={24}
            color="white"
            style={styles.icon}
          />
          <Text style={styles.buttonText}>Sign in with Twitter</Text>
        </TouchableOpacity>
      </Animatable.View>

      {/* Loading Animation */}
      {loading && (
        <ActivityIndicator
          size="large"
          color="#1DA1F2"
          style={styles.loading}
        />
      )}

      {/* Show OAuth Result */}
      {result && <Text>{JSON.stringify(result)}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  button: {
    flexDirection: "row",
    backgroundColor: "#1DA1F2", // Twitter Blue
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5, // for Android
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
  },
  loading: {
    marginTop: 20,
  },
});
