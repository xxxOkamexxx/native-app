import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { IPost } from '@/types/PostTypes';
import { Fonts, theme } from '@/constants/Theme';
import { Divider, Image, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface props {
  post: IPost[];
}

const Activity = ({post}: props) => {
  const { theme } = useTheme()
    const { t } = useTranslation();
    const router = useRouter()

    
  return (
    <View 
      style={{
        ...styles.postsContainer
      }}
    >
      { post?.length !== 0 && post
        .sort((a, b) => (
          new Date (b.createdAt).getTime() - new Date(a.createdAt).getTime())
        ).slice(0, 2)
        .map((p, index, array) => (
          <TouchableOpacity
            key={p.postId}
          >
            <View
              style={{
                ...styles.postItemContainer
              }}
            >
              <View
                style={{
                  flex: 2, 
                  flexDirection: 'column',
                  gap: theme.spacing.md
                }}
              >

                <Text
                  ellipsizeMode='clip'
                  numberOfLines={2}
                  style={{ 
                    ...Fonts.grayColor14Regular,
                    color: theme.colors.grey0,
                  }}
                >
                  {p.content}
                </Text>

                <TouchableOpacity>
                  <Text
                    style={{
                      ...Fonts.grayColor14Regular,
                      color: theme.colors.primary,
                    }}
                  >
                    {`${t("read-more")}...`}
                  </Text>
                </TouchableOpacity>
              </View>


              {p.image 
                ? <Image
                    source={{uri: p.image}} 
                    containerStyle={{ 
                      ...styles.imageSize,
                      backgroundColor: theme.colors.secondary
                    }}
                  />
                : <View 
                    style={{
                      ...styles.imageSize,
                      backgroundColor: theme.colors.secondary,
                      alignItems: 'center',
                      justifyContent: 'center'
                    }} 
                  />
              }
       
            </View>
            {index < array.length - 1 && 
              <Divider color={theme.colors.greyOutline} />
            }
          </TouchableOpacity>
        ))
      }
    </View>
  )
}

export default Activity

const styles = StyleSheet.create({
  postsContainer: {
    flex: 1,
    flexDirection: 'column',
    gap: theme.spacing?.md,
  },
  postItemContainer: {
    flexDirection: 'row',
    gap: theme.spacing?.md,
  },
  imageSize: {
    width: 100,
    height: 100
  }
})