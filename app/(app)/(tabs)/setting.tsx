import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import { useTranslation } from "react-i18next";
import { useAuth } from '@/contexts/authContext';

import { Fonts, Sizes } from "@/constants/Theme";
import { Avatar, Overlay, Switch, useTheme, useThemeMode } from "@rneui/themed";

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


  return (
    <View>
      <TouchableOpacity
        onPress={SignOut}
      >
        <Text>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default setting

const styles = StyleSheet.create({

});

