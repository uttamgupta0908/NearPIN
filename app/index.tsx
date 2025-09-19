import { Redirect } from "expo-router";
import { useAuth } from "../context/AuthContext";
import "../global.css";
import { ActivityIndicator } from "react-native";
export default function Index() {
  const { session, loading } = useAuth();
  if (loading) return <ActivityIndicator />; // could show splash screen

  return session ? (
    <Redirect href="/(app)/home" />
  ) : (
    <Redirect href="/(auth)/sign-in" />
  );
}
