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

const Experience = ({user, showEditButton}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const router = useRouter()

  return (
    <View 
      style={{
        ...styles.postsContainer
      }}
    >
      {user?.experience && user?.experience
        .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
        .slice(0, 2)
        .map((exp, index, array) => (
          <View key={exp.id}>
            <Text 
              style={{
                ...Fonts.grayColor14Bold,
                color: theme.colors.grey0,
              }}
            >
              {exp.position}                 
            </Text>

            <Text 
              style={{
                ...Fonts.grayColor14Regular,
                color: theme.colors.grey0,
              }}
            >
              {exp.companyName}
            </Text>

            <Text 
              style={{
                ...Fonts.grayColor14Regular,
                color: theme.colors.grey3,
              }}
            >
              {dayjs(exp.startDate).format('YYYY-MM-DD')} - {exp.endDate ? dayjs(exp.endDate).format('YYYY-MM-DD') : 'Ongoing'}
            </Text>
            
            <Text style={{
              ...Fonts.grayColor14Regular,
              color: theme.colors.grey0,
            }}
            >
              {exp.location}
            </Text>

            <Text 
              ellipsizeMode='clip'
              numberOfLines={2}
              style={{
                ...Fonts.grayColor14Regular,
                color: theme.colors.grey0,
              }}
            >
              {exp.description}
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

export default Experience

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