import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { theme } from '@/constants/Theme'
import { useTheme } from '@rneui/themed'

const _layout = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{flex: 1, backgroundColor: theme.colors.background}}
    >
      <Tabs
        screenOptions={{
          headerShown:true,
        }}

      >
        <Tabs.Screen 
          name='home' 
          options={{
            tabBarShowLabel: true,
          }} 
        />
        <Tabs.Screen 
          name='profile'
          options={{
            tabBarShowLabel: true,
          }} 
        />
        <Tabs.Screen 
          name='jobs'
          options={{
            tabBarShowLabel: true,
          }} 
        />
        <Tabs.Screen 
          name='community'
          options={{
            tabBarShowLabel: true,
          }} 
        />
      </Tabs>
    </View>
  )
}

export default _layout