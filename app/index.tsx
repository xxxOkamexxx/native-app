import { View, TouchableOpacity, StyleSheet} from 'react-native'
import React, { useState } from 'react'
import { Switch, useTheme, useThemeMode, Text } from '@rneui/themed'
import { setItem } from "@/utils/asyncStorage";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from "react-i18next";
import Button from '@/components/UI/Button';
import { colors, commonStyles, Fonts, screenHeight, Sizes, theme } from '@/constants/Theme';
import {MaterialCommunityIcons } from "@expo/vector-icons";
import { size } from 'lodash';
import { useRouter } from 'expo-router';

const App = () => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const router = useRouter();
  const [ loading, setLoading ] = useState(false)

    //move to Setting-page later
    //--- from here ---
    const { mode, setMode } = useThemeMode();
      const handleSwitchTheme = async (value: boolean) => {
        // Call setMode to update the theme mode
        // console.log('value:', value); 
        
        setMode(value ? "dark" : "light");
  
        // Save the select theme mode in localStrage
        await setItem("theme", value ? "dark" : "light");
      }
      // console.log('mode:', mode);
    // ---- to here ----
  
    // console.log('theme:', theme.mode);
    const handleOnPress = () => {
      setLoading(true)
      router.push("/(auth)/login") 

      setLoading(false)
    }
    

  return (
    <View 
      style={{
        backgroundColor: theme.colors.background,
        flex:1,
      }}
    >
      <SafeAreaView 
        style={{
          height: '100%',
          alignContent: 'center', 
          alignItems: 'center', 
          justifyContent:'center',
          gap:theme.spacing.xl,
          padding: Sizes.fixPadding,
        }}
      >

        {/* insert image or animation later */}
        <View
          style= {{
            width:100, 
            height:100, 
            backgroundColor:'gray',
          }}
        />  

        <View
          style={{
            alignItems:'center',
            gap: theme.spacing.md,
          }}
        >
          <Text style={{...Fonts.grayColor20Bold}}>{`${t("start-message")}`}</Text>
          <Text style={{...Fonts.grayColor16Regular}}>{`${t("start-sub-text")}`}</Text>
        </View>

        <Button
          containerStyle={{width:'100%'}}
          buttonStyle={[commonStyles.buttonStyle, styles.buttonStyle]}
          title={`${t("start-button-text")}`}
          titleStyle={[Fonts.whiteColor20Medium,]}
          iconPosition='right'
          icon={
            <MaterialCommunityIcons 
              name='arrow-right' 
              color={colors.white} 
              size={24}
              style={{paddingLeft:24}}
            />
          }
          size='lg'
          loading={loading}
          onPress={handleOnPress}
        />


        {/* move to Setting-page later */}
        <TouchableOpacity>
          <Switch
            value={mode === "dark"}
            onValueChange={handleSwitchTheme}
          />
        </TouchableOpacity>

      </SafeAreaView>
    </View>
  )
}

export default App


const styles = StyleSheet.create({
  buttonStyle:{
    width:'100%',
    alignSelf: "center",
    justifyContent:'center'
  },
})