// InputField.tsx
import React from "react";
import { TextInput, StyleSheet, View, Platform } from "react-native";
import { useTheme } from "@rneui/themed";
import { Sizes, theme } from "@/constants/Theme"
import { Text } from "@rneui/base";
import { commonStyles, Fonts } from "@/constants/Theme";

interface Props {
  name?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onBlur?: (e: any) => void;
  onChangeText?: (text: string) => void;
  styles?: any;
  leftIcon?: any;
  rightIcon?: any;
  errorMessage?: string;
  disabled?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'number-pad' |'decimal-pad' | 'numeric' | 'email-address' | 'phone-pad' | 'url'
}

const TextField: React.FC<Props> = (props) => {
  const { theme } = useTheme();

  return (
    <View style={{ ...styles.container, borderColor: theme.colors.divider }}>
      <TextInput
        {...props}
        style={{
          ...styles.input,
          ...props.styles,
          ...Fonts.primaryColor14Medium,
          borderColor: theme.colors.divider,
          backgroundColor: theme.colors.secondary,
          width: "100%",
          color: theme.colors.grey0,
        }}
        secureTextEntry={props.secureTextEntry}
        placeholder={props.placeholder}
        value={props.value}
        placeholderTextColor={theme.colors.grey2}
        cursorColor={theme.colors.primary}
        selectionColor={theme.colors.primary}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        autoCapitalize="none"
      />
      {props.errorMessage ? (
        <Text
          style={{
            color: theme.colors.error,
            fontSize: 10,
            marginHorizontal: theme.spacing.xs,
          }}
        >
          {props.errorMessage}
        </Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  input: {
    paddingHorizontal: Sizes.fixPadding,
    paddingVertical: Sizes.fixPadding,
    borderRadius: theme.spacing?.sm,
    marginBottom: theme.spacing?.xs,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    width: "100%",
  },
});

export default TextField;
