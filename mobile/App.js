import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
} from "react-native";

import axios from "axios";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [result, setResult] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(
        "https://hadolinemlak-api.onrender.com/auth/login",
        {
          email,
          password,
        }
      );

      setResult(JSON.stringify(res.data, null, 2));
    } catch (err) {
      setResult(JSON.stringify(err.response?.data || err.message));
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        HADOLİN CRM
      </Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Şifre"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <Button title="Giriş Yap" onPress={login} />

      <Text style={styles.result}>
        {result}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: "center",
    backgroundColor: "#0B1020",
  },

  title: {
    color: "gold",
    fontSize: 28,
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "bold",
  },

  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },

  result: {
    color: "#fff",
    marginTop: 20,
  },
});
