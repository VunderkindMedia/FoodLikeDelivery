import React from "react";
import { TextInput, View, Text, StyleSheet } from "react-native";

export const TextField = ({
  title,
  titleStyle,
  inputStyle,
  placeholder,
  autoCapitalize,
  containerStyle,
  value,
  onChange,
  textContentType,
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      <TextInput
        autoCapitalize={autoCapitalize}
        style={[styles.input, inputStyle]}
        onChangeText={onChange}
        textContentType={textContentType}
        value={value}
        placeholder={placeholder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
    borderColor: "#e2e2e2",
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: "Gilroy_SemiBold",
    fontSize: 16,
    color: "#7c7c7c",
    marginBottom: 15,
  },

  input: {
    fontFamily: "Gilroy_Medium",
    fontSize: 18,
    color: "#030303",
  },
});
