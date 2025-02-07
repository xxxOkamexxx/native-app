import { View, Text } from 'react-native'
import React from 'react'
import { Slot, Stack } from 'expo-router'

const Layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='index' />
    </Stack>
  )
}

export default Layout