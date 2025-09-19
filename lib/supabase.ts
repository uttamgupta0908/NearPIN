import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  createClient,
  processLock,
  SupabaseClient,
} from "@supabase/supabase-js";
import { AppState, Platform } from "react-native";
import "react-native-url-polyfill/auto";

const supabaseUrl = "https://uwbzhbmacywrkypgpowa.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV3YnpoYm1hY3l3cmt5cGdwb3dhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMjQ3NTYsImV4cCI6MjA3MzgwMDc1Nn0.SFcpO67i1h7em4A9JBJ1i4X6x-6NyegnWhW7Ee3nbj0";

// Strongly typed client
export const supabase: SupabaseClient = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      ...(Platform.OS !== "web" ? { storage: AsyncStorage } : {}),
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
      lock: processLock,
    },
  }
);

// 🔄 Automatically refresh auth when app is in foreground
if (Platform.OS !== "web") {
  AppState.addEventListener("change", (state) => {
    if (state === "active") {
      supabase.auth.startAutoRefresh();
    } else {
      supabase.auth.stopAutoRefresh();
    }
  });
}
