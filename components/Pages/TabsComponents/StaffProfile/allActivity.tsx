import { View, Text, Modal, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import pageStyle from '@/constants/Styles';
import { Divider, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { useToast } from 'react-native-toast-notifications';
import { commonStyles, Fonts, Sizes, theme } from '@/constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useAuth } from '@/contexts/authContext';

interface props {
  visible: boolean;
  onClose: () => void
}


const AllActivity = ({visible, onClose}: props) => {
  const { theme } = useTheme()
    const { t } = useTranslation();
    const toast = useToast();
    const { 
      authState:{ 
        userData, 
        userId,
      } 
    } = useAuth();


  return (
    <Modal
      visible={visible}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: theme.colors.background,
        }}
      >
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-start',
            padding: Sizes.fixPadding,
            backgroundColor: theme.colors.secondary,
            gap: theme.spacing.md,
            alignItems: 'center',
            borderBottomWidth:1,
            borderBottomColor: theme.colors.greyOutline
          }}
        >
          <TouchableOpacity
            onPress={onClose}
          >
            <MaterialCommunityIcons name='chevron-left' size={24} color={theme.colors.grey0}/>
          </TouchableOpacity>
          <Text
            style={{
              ...Fonts.grayColor20Medium,
              color: theme.colors.grey0,
            }}
          >
            {t("activity")}
          </Text>
        </View>


        <View
          style={{
            ...pageStyle.pageComponent,
            justifyContent: 'center',
            backgroundColor: theme.colors.secondary
          }}
        >
          <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            showsVerticalScrollIndicator={false}
          >

            {/* 🚧 Insert post list */}
            <Text>Posts</Text>

          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default AllActivity