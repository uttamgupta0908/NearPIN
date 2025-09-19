import { useRouter } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Keyboard,
} from "react-native";
import { supabase } from "../../lib/supabase";

export default function Home() {
  const router = useRouter();
  const [pincode, setPincode] = useState("");
  const [radius, setRadius] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace("/(auth)/sign-in");
  };

  const handleSearch = async () => {
    if (!pincode) {
      Alert.alert("Error", "Please enter a pincode");
      return;
    }
    if (!radius) {
      Alert.alert("Error", "Please enter a radius");
      return;
    }
    setLoading(true);
    Keyboard.dismiss();
    setResults([]);
    try {
      const payload = {
        input_zipcode: pincode,
        radius_km: radius,
      };
      const { data, error } = await supabase.rpc(
        "pincodes_within_radius_from_zipcode",
        payload
      );

      if (error) throw error;

      if (!data || data.length === 0) {
        Alert.alert("No Results", "No nearby zipcodes found.");
      }

      setResults(data || []);
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong while searching");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white p-6">
      <Text className="text-2xl font-bold text-center mb-6">Welcome 🎉</Text>

      <TextInput
        placeholder="Enter Pincode"
        value={pincode}
        onChangeText={setPincode}
        keyboardType="numeric"
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      <TextInput
        placeholder="Enter Radius (km)"
        value={radius}
        onChangeText={setRadius}
        keyboardType="numeric"
        className="border border-gray-300 rounded-lg p-3 mb-4"
      />

      <TouchableOpacity
        className="bg-blue-500 p-4 rounded-xl mb-6"
        onPress={handleSearch}
        disabled={loading}
      >
        <Text className="text-white font-semibold text-center">
          {loading ? "Searching..." : "Search Nearby Pincodes"}
        </Text>
      </TouchableOpacity>

      <FlatList
        data={results}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text className="p-2 border-b border-gray-200">
            {item.zipcode} - {item.place}, {item.state} ({item.latitude},{" "}
            {item.longitude})
          </Text>
        )}
        ListEmptyComponent={
          loading ? null : (
            <Text className="text-gray-500 text-center">
              No results yet. Try a search.
            </Text>
          )
        }
      />

      <TouchableOpacity
        className="mt-6 bg-red-500 px-6 py-3 rounded-xl"
        onPress={handleSignOut}
      >
        <Text className="text-white font-semibold text-center">Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}
