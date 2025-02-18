import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import { useTranslation } from "react-i18next";
import { useAuth } from '@/contexts/authContext';
import { setItem } from "@/utils/asyncStorage";

import { Fonts, Sizes, theme } from "@/constants/Theme";
import { Avatar, Button, Overlay, Switch, useTheme, useThemeMode } from "@rneui/themed";
import pageStyle from '@/constants/Styles'


const setting = () => {
  const [showLogoutDialog, setshowLogoutDialog] = useState<boolean>(false);
  const [showTranslation, setShowTranslation] = useState<boolean>(false);
  
  const {
    authState: { userData },
    SignOut,
  } = useAuth();
  const { t } = useTranslation();
  const { mode, setMode } = useThemeMode();
  const { theme } = useTheme();

  const handleSwitchTheme = async (value: boolean) => {
    // Call setMode to update the theme mode
    // console.log('value:', value); 
    
    setMode(value ? "dark" : "light");

    // Save the select theme mode in localStrage
    await setItem("theme", value ? "dark" : "light");
  }

  return (
    <View
      style={{
        ...pageStyle.pageComponent, 
        backgroundColor: theme.colors.background
      }}
    >

      <View
        style={{
          ...styles.container
        }}
      >
        {/* Theme */}
        <View
          style={{...styles.itemWrapper}} 
        >
          <Text>Theme: </Text>
          <TouchableOpacity>
            <Switch
              value={mode === "dark"}
              onValueChange={handleSwitchTheme}
            />
          </TouchableOpacity>
        </View>

        {/* Theme */}
        <View
          style={{...styles.itemWrapper}} 
        >
          <Text>Logout: </Text>
          <Button
            onPress={SignOut}
            style={{width: '40%'}}
          >
            <Text>Sign out</Text>
          </Button>
        </View>
      </View>
    </View>
  )
}

export default setting

const styles = StyleSheet.create({
  container:{
    flexDirection: 'column',
    gap: Sizes.fixPadding,
  },
  itemWrapper: {
    flexDirection:'row', 
    gap: theme.spacing?.lg,
    alignItems: 'center'
  }
});
