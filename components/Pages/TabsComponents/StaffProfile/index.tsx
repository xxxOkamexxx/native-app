import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router';
import *as ImagePicker from 'expo-image-picker'
import { useToast } from "react-native-toast-notifications";

import { IExperience, IUser } from '@/types/UserTypes'
import { IPost } from '@/types/PostTypes'
import { Avatar, Divider, useTheme } from '@rneui/themed';
import { useTranslation } from 'react-i18next';
import { Fonts, Sizes, theme } from '@/constants/Theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import Information from './Information';
import About from './about';
import Activity from './activity';
import Experience from './experience';
import Education from './education';

import InfoModal from './Edit/infoModal';
import AboutModal from './Edit/aboutModal';
import { updateStaff } from '@/api/backend';
import { getBase64FromUri } from '@/utils/getBase64';
import AllEducation from './allEducation';
import pageStyle from '@/constants/Styles';
import AllExperience from './allExperience';
import AllActivity from './allActivity';

interface props {
  user: IUser;
  showEditButton: boolean;
  post: IPost[];
  refetch : () => void
}

interface ThemedContainerProps {
  title: string;
  children: React.ReactNode;
  showFooter: boolean;
  footerChildren?: React.ReactNode;
  btnChildren?: React.ReactNode;
}



const PerofileIndex = ({user, showEditButton, post, refetch}: props) => {
  const { theme } = useTheme()
  const { t } = useTranslation();
  const toast = useToast();
  const router = useRouter()

  const [expData, setExpData] = useState<IExperience>()

  const [openEditInfoDialog, setOpenEditInfoDialog] = useState<boolean>(false)
  const [openEditAboutDialog, setOpenEditAboutDialog] = useState<boolean>(false)
  
  const [openAddActivityDialog, setOpenAddActivityDialog] = useState<boolean>(false)
  const [openAllActivityDialog, setOpenAllActivityDialog] = useState<boolean>(false)

  const [openAddExperienceDialog, setOpenAddExperienceDialog] = useState<boolean>(false)
  const [openAllExperienceDialog, setOpenAllExperienceDialog] = useState<boolean>(false)

  const [openAddEducationDialog, setOpenAddEducationDialog] = useState<boolean>(false)
  const [openAllEducationDialog, setOpenAllEducationDialog] = useState<boolean>(false)

  const [openAddSkillsDialog, setOpenAddSkillsDialog] = useState<boolean>(false)

  const [openEditLanguageDialog, setOpenEditLanguageDialog] = useState<boolean>(false)
  const [openAddLanguageDialog, setOpenAddLanguageDialog] = useState<boolean>(false)

  const handleImageUpdate = async () => {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes:['images'],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      try {
        const selectedImageUri = result.assets[0].uri;
  
        const updatedUserData = { 
          ...user, 
          profileImage: selectedImageUri 
        };
  
        await updateStaff(updatedUserData);

        refetch();

        toast.show(`${t("success-update-message")}`, {
          type: "custom",
        });
       
      } catch (error) {
        toast.show(`${t("failed-update-message")}`, {
          type: "error",
        });
      } 
    }
  }

  const ItemContainer: React.FC<ThemedContainerProps> = (props) => {   
    return (
      <View
        style={{
          ...styles.itemContainer,
          backgroundColor: theme.colors.secondary
        }}
      >
        {/* Item Header */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingBottom: theme.spacing.md,
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              ...pageStyle.headline02,
              color: theme.colors.grey0,
            }}
          >
            {props.title}
          </Text>

          <View
            style={{
              flexDirection: 'row',
              gap: theme.spacing.sm,
            }}
          >
            {showEditButton &&
              <>
                {props.btnChildren}
              </>
            }
          </View>
        </View>
        
        <Divider color={theme.colors.greyOutline} />

        {/* Item */}
        <View
          style={{ paddingVertical: theme.spacing.md}}
        >
          {props.children}
        </View>

        {props.showFooter && 
          <Divider color={theme.colors.greyOutline} />
        }

        {/* Item Footer */}
        {props.showFooter && 
          <View
            style={{ 
              alignItems: 'center',
              justifyContent:'center',
              marginTop: theme.spacing.md,
            }}
          >
            <Text>
              {props.footerChildren}
            </Text>
          </View>
        }
      </View>
    )
  }

  
  return (
    <View
      style={{
        flexDirection:'column',
        gap: theme.spacing.md,
      }}
    >
      {/* header */}
      <View
        style={{...styles.headerContainer}}
      >

        <View
          style={{
            ...styles.headerTextContainer,
            backgroundColor: theme.colors.secondary
          }}
        >
          <Text
            style={{
              ...styles.headerText,
              ...Fonts.grayColor20Bold,
              color: theme.colors.grey0
            }}
          >
            {`${user?.firstName} ${user?.lastName}`}
          </Text>

          <Text
            style={{
              ...styles.headerText,
              ...Fonts.grayColor14Medium,
              color: theme.colors.grey0
            }}
          >
            {`${user?.title}`}
          </Text>

        </View>
      
        <View
          style={{
            ...styles.avatarContainer,
            backgroundColor: theme.colors.secondary
          }}
        >
          {user.profileImage  
            ? <Avatar size={80} rounded source={{uri: user?.profileImage}} />      
            :<Avatar size={80} rounded icon={{name: "account", type: "material-community"}} containerStyle={{ backgroundColor: theme.colors.grey3 }}  />
          }

          {showEditButton && (
            <TouchableOpacity
              style={{
                ...styles.imageEditButton,
                backgroundColor: theme.colors.background
              }}
              onPress={handleImageUpdate}
            >
              <MaterialCommunityIcons 
                name='pencil' 
                size={24}
                color={ theme.mode === 'light'
                  ? theme.colors.grey3
                  : theme.colors.white
                }
              />
            </TouchableOpacity>)}
        </View>
      </View>

      {/* Main */}
      <ItemContainer
        title={t("information")}
        children={<Information user={user} showEditButton={showEditButton}/>}
        showFooter={false}
        btnChildren={
          <TouchableOpacity
            style={{
              ...styles.itemEditButton,
              backgroundColor: theme.colors.background
            }}
            onPress={() => setOpenEditInfoDialog(!openEditInfoDialog)}
          >
            <MaterialCommunityIcons 
              name='pencil' 
              size={24} 
              color={ theme.mode === 'light'
                ? theme.colors.grey3
                : theme.colors.white
              }
            />
          </TouchableOpacity>
        }
      />

      <ItemContainer
        title={t("about")}
        children={<About user={user} showEditButton={showEditButton}/>}
        showFooter={false}
        btnChildren={
          <TouchableOpacity
            style={{
              ...styles.itemEditButton,
              backgroundColor: theme.colors.background
            }}
            onPress={() => setOpenEditAboutDialog(true)}
          >
            <MaterialCommunityIcons 
              name='pencil' 
              size={24} 
              color={ theme.mode === 'light'
                ? theme.colors.grey3
                : theme.colors.white
              }
            />
          </TouchableOpacity>
        }
      />

      <ItemContainer
        title={t("activity")}
        children={<Activity post={post} />}
        showFooter={true}
        btnChildren={
          <TouchableOpacity
            style={{
              borderRadius: theme.spacing.sm,
              borderColor: theme.colors.primary,
              borderWidth: 2,
              padding: theme.spacing.sm,
            }}
          >
            <Text
              style={{
                ...Fonts.primaryColor14Medium,
                color: theme.colors.primary
              }}
            >
              {`${t("create-post")}`}
            </Text>
          </TouchableOpacity>
        }
        footerChildren={
          <TouchableOpacity
            onPress={() => {
              setOpenAllActivityDialog(true)
            }}
          >
            <Text
              style={{
                ...Fonts.grayColor14Medium,
                color: theme.colors.grey0
              }}
            >
              {`${t("see-all-posts")}`}
            </Text>
          </TouchableOpacity>
        }
      />

      <ItemContainer
        title={t("experience")}
        children={
          <Experience 
            user={user} 
            showEditButton={showEditButton} 
          />
        }
        btnChildren={
          <TouchableOpacity
            style={{
              ...styles.itemEditButton,
              backgroundColor: theme.colors.background
            }}
            onPress={() => setOpenAddExperienceDialog(true)}
          >
            <MaterialCommunityIcons 
              name='plus' 
              size={24} 
              color={ theme.mode === 'light'
                ? theme.colors.grey3
                : theme.colors.white
              }
            />
          </TouchableOpacity>
        }
        showFooter={true}
        footerChildren={
          <TouchableOpacity
            onPress={() => setOpenAllExperienceDialog(true)}
          >
            <Text
              style={{
                ...Fonts.grayColor14Medium,
                color: theme.colors.grey0
              }}
            >
              {`${t("see-more")}`}
            </Text>
          </TouchableOpacity>
        }
      />  

      <ItemContainer
        title={t("education")}
        children={
          <Education 
            user={user} 
            showEditButton={showEditButton} 
          />
        }
        btnChildren={
          <TouchableOpacity
            style={{
              ...styles.itemEditButton,
              backgroundColor: theme.colors.background
            }}
            onPress={() => setOpenAddEducationDialog(true)}
          >
            <MaterialCommunityIcons 
              name='plus' 
              size={24} 
              color={ theme.mode === 'light'
                ? theme.colors.grey3
                : theme.colors.white
              }
            />
          </TouchableOpacity>
        }
        showFooter={true}
        footerChildren={
          <TouchableOpacity
            onPress={() => setOpenAllEducationDialog(true)}
          >
            <Text
              style={{
                ...Fonts.grayColor14Medium,
                color: theme.colors.grey0
              }}
            >
              {`${t("see-more")}`}
            </Text>
          </TouchableOpacity>
        }
      /> 

      <ItemContainer
        title={t("skills")}
        children={
          <View  
            style={{
              flexDirection:'row', 
              flexWrap:'wrap', 
              gap: theme.spacing.sm
            }}
          >
            {user?.skills && user.skills.map(skill => (
              <View 
                key={skill.id} 
                style={{
                  padding:theme.spacing.sm, 
                  backgroundColor: theme.colors.primary, 
                  borderRadius:8,
                  flexDirection: 'row',
                  gap: theme.spacing.sm
                }}
              >
                <Text 
                  style={{
                    ...Fonts.whiteColor14Medium,
                    color: theme.colors.white,
                  }}
                >
                  {skill.name}
                </Text>

                {showEditButton && 
                  <TouchableOpacity>
                    <MaterialCommunityIcons name='close-circle' color={theme.colors.white} size={16} />
                  </TouchableOpacity>
                }
              </View>
            ))}
          </View>
        }
        btnChildren={
          <TouchableOpacity
            style={{
              ...styles.itemEditButton,
              backgroundColor: theme.colors.background
            }}
            onPress={() => setOpenAddSkillsDialog(true)}
          >
            <MaterialCommunityIcons 
              name='plus' 
              size={24} 
              color={ theme.mode === 'light'
                ? theme.colors.grey3
                : theme.colors.white
              }
            />
          </TouchableOpacity>
        }
        showFooter={false}
      /> 

      <ItemContainer
        title={t("languages")}
        children={
          <View
            style={{
              flexDirection: 'column',
              gap: theme.spacing.sm
            }}
          >
            {user?.languages && user.languages.length > 0 ? (
              user.languages
                .slice()  // Create a shallow copy of the array
                .sort((a, b) => b.rating - a.rating)  // Sort the copied array
                .map((lang) => (
                  <View key={lang.id} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text
                      style={{
                        ...Fonts.grayColor16Regular,
                        color: theme.colors.grey0,
                      }}
                    >
                      {lang.name}
                    </Text>

                    <View style={{ flexDirection: 'row' }}>
                      {[...Array(5)].map((_, index) => (
                        <MaterialCommunityIcons
                          key={index}
                          name={index < lang.rating ? 'star' : 'star-outline'}
                          size={24}
                          color={index < lang.rating ? 'orange': theme.colors.grey3}
                        />
                      ))}
                    </View>
                  </View>
                ))
              ) : (
                <Text>{`${t("add-language-skills")}`}</Text> // Message when there are no languages
            )}
          </View>
        }
        btnChildren={
          <>
            <TouchableOpacity
              style={{
                ...styles.itemEditButton,
                backgroundColor: theme.colors.background
              }}
              onPress={() => setOpenAddLanguageDialog(true)}
            >
              <MaterialCommunityIcons 
                name='plus' 
                size={24} 
                color={ theme.mode === 'light'
                  ? theme.colors.grey3
                  : theme.colors.white
                }
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.itemEditButton,
                backgroundColor: theme.colors.background
              }}
              onPress={() => setOpenEditLanguageDialog(true)} 
            >
              <MaterialCommunityIcons 
                name='pencil' 
                size={24} 
                color={ theme.mode === 'light'
                  ? theme.colors.grey3
                  : theme.colors.white
                }
              />
            </TouchableOpacity>
          </>
        }
        showFooter={false}
      /> 

      {/* Dialog */}
      <InfoModal 
        visible={openEditInfoDialog}
        user={user}
        onClose={() => setOpenEditInfoDialog(!openEditInfoDialog)}
        handleSuccess={() => refetch()}
      />
      <AboutModal
        visible={openEditAboutDialog}
        user={user}
        onClose={() => setOpenEditAboutDialog(!openEditAboutDialog)}
        handleSuccess = {() => refetch()}
      />
      <AllExperience 
        visible={openAllExperienceDialog}
        id={user.id!}
        onClose={() => setOpenAllExperienceDialog(!openAllExperienceDialog)}
        handleSuccess={() => refetch()}
      />
      <AllEducation 
        visible={openAllEducationDialog}
        id={user.id}
        onClose={() => setOpenAllEducationDialog(!openAllEducationDialog)}
        handleSuccess={() => refetch()}
      /> 
      <AllActivity 
        visible={openAllActivityDialog}
        onClose={() => setOpenAllActivityDialog(!openAllActivityDialog)}
      />     
    </View>
  )
}

export default PerofileIndex

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 150,
    backgroundColor: "#D4AF35",
    position: 'relative'
  },
  avatarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 16,
    width: 96,
    height: 96,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerTextContainer: {
    position:'absolute',
    bottom: 0,
    width: '100%',
    height: 64,
  },
  headerText: {
    left: 128,
  },
  imageEditButton: {
    borderRadius: 100,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    bottom: 8,
  },
  itemContainer: {
    width: '100%',
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
  },
  itemEditButton: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  }
});

