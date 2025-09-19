import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { Link } from "expo-router";

export default function SignUp() {
  const [email, setEmail] = useState("uttamgupta0908@gmail.com");
  const [password, setPassword] = useState("123456");

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({ email, password });
    // console.log({ error });
    if (error) Alert.alert("Sign Up Error", error.message);
    else
      Alert.alert(
        `Check your email to confirm your account! ${JSON.stringify(error)}`
      );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <View className="flex-1 justify-center px-8">
        <Text className="text-4xl font-extrabold text-center text-indigo-600 mb-12">
          NearPIN
        </Text>

        <Text className="text-2xl font-bold text-gray-800 mb-6">
          Create Account
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-gray-300 rounded-xl px-4 py-4 mb-4 text-base bg-gray-50"
        />

        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-300 rounded-xl px-4 py-4 mb-6 text-base bg-gray-50"
        />

        <TouchableOpacity
          onPress={handleSignUp}
          className="bg-green-600 py-4 rounded-xl shadow-md"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Sign Up
          </Text>
        </TouchableOpacity>

        <View className="mt-8 flex-row justify-center">
          <Text className="text-gray-600">Already have an account?</Text>
          <Link href="/(auth)/sign-in">
            <Text className="text-indigo-600 font-semibold"> Sign In</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
