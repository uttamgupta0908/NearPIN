import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import { supabase } from "../../lib/supabase";
import { Link, useRouter } from "expo-router";
import { useAuth } from "@/context/AuthContext";

export default function SignIn() {
  const { setSession, setLoading } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [email, setEmail] = useState("uttamgupta0908@gmail.com");
  const [password, setPassword] = useState("123456");
  const handleSignIn = async () => {
    setLoading(true);
    const { error, data } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    setSession(data.session);
    router.replace("/(app)/home");
    // console.log({ error, data });
    if (error) Alert.alert("Sign In Error", JSON.stringify(error));
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

        <Text className="text-2xl font-bold text-gray-800 mb-6">Sign In</Text>

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
          onPress={handleSignIn}
          disabled={isLoading}
          className="bg-indigo-600 py-4 rounded-xl shadow-md"
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text className="text-white text-center font-semibold text-lg">
              Sign In
            </Text>
          )}
        </TouchableOpacity>

        <View className="mt-8 flex-row justify-center">
          <Text className="text-gray-600">Don’t have an account?</Text>
          <Link href="/(auth)/sign-up">
            <Text className="text-indigo-600 font-semibold"> Sign Up</Text>
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
