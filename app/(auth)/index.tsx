import { View, Text } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import LoginPage from '@/components/Pages/AuthPages/login'
import { useTheme } from '@rneui/themed'
import api from '@/api/backend/config'


const Page = () => {
  const { theme } = useTheme()
  

  return (
    <SafeAreaProvider>
      <View
        style={{
         backgroundColor: theme.colors.background
        }}
      >
        <LoginPage />
      </View>
    </SafeAreaProvider>
  )
}

export default Page