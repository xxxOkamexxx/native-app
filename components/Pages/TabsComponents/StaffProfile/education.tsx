import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

import { Fonts, theme } from '@/constants/Theme';
import { Divider, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs'

import { IUser } from '@/types/UserTypes';


interface props {
  user: IUser;
  showEditButton: boolean;
}

const Education = ({user, showEditButton}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const router = useRouter()

  return (
    <View 
      style={{
        ...styles.postsContainer
      }}
    >
      {user?.educations && user?.educations
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
        .slice(0, 2)
        .map((edu, index, array) => (
          <View key={edu.id}>
            <Text 
              style={{
                ...Fonts.grayColor14Bold,
                color: theme.colors.grey0,
              }}
            >
              {edu.institution}        
            </Text>

            <Text 
              style={{
                ...Fonts.grayColor14Regular,
                color: theme.colors.grey0,
              }}
            >
              {edu.name}
            </Text>

            <Text 
              style={{
                ...Fonts.grayColor14Regular,
                color: theme.colors.grey3,
              }}
            >
              {dayjs(edu.startDate).format('YYYY-MM-DD')} - {edu.endDate ? dayjs(edu.endDate).format('YYYY-MM-DD') : 'Ongoing'}
            </Text>

            {index < array.length - 1 && 
              <Divider color={theme.colors.greyOutline} />
            }

          </View>
        ))
      }
    </View>
  )
}

export default Education

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: theme.spacing?.md,
  },
  postItemContainer: {
    flexDirection: 'column',
    gap: theme.spacing?.md,
  },
})