import React, { useEffect, useState } from "react";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
export { ErrorBoundary } from "expo-router"; // Catch any errors thrown by the Layout component.
import * as Updates from "expo-updates";

import { useFonts } from 'expo-font';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as SplashScreen from 'expo-splash-screen';

import { Switch, ThemeMode, ThemeProvider as ThemeProviderUI, useThemeMode } from "@rneui/themed";
import { theme } from "@/constants/Theme";

import { getItem, setItem } from "@/utils/asyncStorage";

import "@/i18n.config"



const RootLayout = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const [loaded, error] = useFonts({
    Poppins: require("@/assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("@/assets/fonts/Poppins-Bold.ttf"),
    PoppinsMedium: require("@/assets/fonts/Poppins-Medium.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (loaded && !error) {
      SplashScreen.hideAsync();
      const time = setTimeout(() => {
        setAppIsReady(true);
      }, 2000);
      return () => clearTimeout(time);
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (      
    <RootLayoutNav />
  );
};

export default RootLayout

const development = process.env.NODE_ENV === "development";



function RootLayoutNav() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
  });
  const { mode, setMode } = useThemeMode();
  const [themeMode, setThemeMode] = useState<ThemeMode>("light");

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!development) {
      onFetchUpdateAsync();
    }
  }, []);

  useEffect(() => {
    const fetchTheme = async () => {
      const theme = (await getItem("theme")) as ThemeMode;
      if (!theme) {
        await setItem("theme", "light");
      } else {
        setMode(theme)
      }
      
      setThemeMode(theme);
    };
    fetchTheme();
  }, []);

  
  theme.mode = themeMode;

  return (
    <ThemeProviderUI theme={theme} >
      <QueryClientProvider client={queryClient} >
        <Stack>
          <Stack.Screen name="index" options={{headerShown: false}}/>
          <Stack.Screen name="(auth)" />
        </Stack>
      </QueryClientProvider>
    </ThemeProviderUI>
  )}