import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Switch, useTheme, useThemeMode } from '@rneui/themed'
import { setItem } from "@/utils/asyncStorage";
import { SafeAreaView } from 'react-native-safe-area-context';


const App = () => {
  const { theme } = useTheme()

  // These code move to Setting-page later
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
    

  return (
    <SafeAreaView 
      style={{
        alignContent: 'center', 
        alignItems: 'center', 
        backgroundColor: theme.colors.background,
        flex:1
      }}
    >
      <Text style={{color:'#555'}}>Staffin</Text>

      <TouchableOpacity>
        <Switch
          value={mode === "dark"}
          onValueChange={handleSwitchTheme}
        />
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default App