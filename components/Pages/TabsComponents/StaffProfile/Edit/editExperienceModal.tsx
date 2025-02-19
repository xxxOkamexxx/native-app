import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Modal, SafeAreaView, StyleSheet, ScrollView } from 'react-native'
import { useRouter } from 'expo-router';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useToast } from "react-native-toast-notifications";
import { Formik } from 'formik';

import { getExperience, updateExperience, updateStaff } from '@/api/backend';

import { IExperience, IUser } from '@/types/UserTypes';

import { useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import Button from '@/components/UI/Button'
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { TextField } from '@/components/UI/Input/TextField';
import pageStyle from '@/constants/Styles';

interface props {
  data: IExperience;
  visible: boolean;
  onClose: () => void;
  handleSuccess: () => void
}

const EditExperienceModal = ({data, visible, onClose, handleSuccess}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter()


  const mutation = useMutation({
    mutationFn: async (values:any) => {
      return await updateExperience(data.id, values);
    },
    onMutate: (variables) => {
      // Optionally, you can handle any state updates or optimistic updates here.
    },

    onSuccess: () => {
      toast.show(`${t("success-update-message")}`, {
        type: "custom",
      });
      handleSuccess();
      onClose();
    },
    onError: () => {
      toast.show(`${t("failed-update-message")}`, {
        type: "error",
      });
    },
  });


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
        <View
          style={{
            ...pageStyle.pageComponent,
            justifyContent: 'center',
          }}
        >
          <ScrollView
            automaticallyAdjustKeyboardInsets={true}
            showsVerticalScrollIndicator={false}
          >
            <Formik
              initialValues={{
                ...data,
                position: data?.position || "",
                description: data?.description || "",
                companyName: data?.companyName,
                location: data?.location || "",
                startDate: data?.startDate,
                endDate: data?.endDate || "",
              }}
              onSubmit={(values: IExperience) => {
                mutation.mutate(values);
              }}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors, setFieldValue }) => (
                <>
                  {/* 🚧 Add Edit form here */}
                            
                  <View
                    style={{
                      ...styles.buttonGroup
                    }}
                  >            
                    <Button
                      title={`${t("cancel")}`}
                      onPress={onClose}
                      size='md'
                      type='clear'
                      titleStyle={{ 
                        fontSize: 16, 
                      }}
                      radius={"sm"}
                      containerStyle={{
                        ...styles.buttonContainer,
                        borderColor: theme.colors.primary,
                        borderWidth: 2,
                      }}
                    />
                      

                    <Button
                      title={`${t("save")}`}
                      onPress={() => handleSubmit()}
                      size='md'
                      color='primary'
                      titleStyle={{ fontSize: 16 }}
                      radius={"sm"}
                      containerStyle={{
                        ...styles.buttonContainer,
                        borderColor: theme.colors.primary,                     
                        borderWidth: 2,
                        borderRadius:10
                      }}
                    />
                  </View>
                </>
              )}
            </Formik>

            
            <Button
              title={`${t("delete")}`}
              onPress={() => {}}
              size='md'
              color='error'
              titleStyle={{ fontSize: 16 }}
              radius={"sm"}
              containerStyle={{
                ...styles.buttonContainer,
                borderColor: theme.colors.error,                     
                borderWidth: 2,
                borderRadius:10
              }}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </Modal>
  )
}

export default EditExperienceModal

const styles = StyleSheet.create({
  formContiner: {
    width: "100%",
  },
  inputLabel: {
    marginBottom: theme.spacing?.xs,
    fontWeight: "bold",
    paddingHorizontal: theme.spacing?.xs,
  },
  buttonGroup:{
    flexDirection: 'row',
    gap: theme.spacing?.md,
    width: '100%',
    marginVertical: theme.spacing?.lg,
  },
  buttonContainer: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 0,
  },
})
