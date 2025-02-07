import { View, Text } from 'react-native'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { GetUserById } from '@/api/backend'
import { useTheme } from '@rneui/themed'

const LoginPage = () => {
  const { theme } = useTheme()

  return (
    <View 
    >
      <Text style={{color:theme.colors.white}}>Login Page</Text>
    </View>
  )
}

export default LoginPage