import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import ScalableText from "react-native-text";
import { main_color } from "../assets/Styles";

export const AppButton = ({
  title,
  secondValue,
  pressHandler,
  style,
  color = main_color,
  textColor = "#fff",
  iconComponent,
  disabled,
  offerta,
}) => {
  return (
    <View style={style}>
      <Text style={stylesLocal.offerta}>{offerta}</Text>
      <TouchableOpacity
        disabled={disabled}
        onPress={() => pressHandler()}
        activeOpacity={0.8}
        style={[
          {
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            height: 67,
            borderRadius: 19,
            backgroundColor: disabled ? "#e2e2e2" : color,
            paddingHorizontal: 30,
          },
        ]}
      >
        {iconComponent}
        <ScalableText
          style={{
            color: textColor,
            fontSize: 14.0,
            fontFamily: "Gilroy_SemiBold",
            width: "100%",
            textAlign: "center",
          }}
        >
          {title}
        </ScalableText>
        {secondValue && (
          <View
            style={{
              position: "absolute",
              right: 25,
              backgroundColor: disabled ? "#c7c7c7" : "#489E67",
              borderRadius: 4,
              paddingVertical: 2,
              paddingHorizontal: 5,
            }}
          >
            <ScalableText
              style={{
                fontFamily: "Gilroy_Bold",
                fontSize: 10,
                color: "#FCFCFC",
              }}
            >
              {secondValue}₽
            </ScalableText>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const stylesLocal = StyleSheet.create({
  offerta: {
    color: "#7c7c7c",
    fontFamily: "Gilroy_SemiBold",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 15,
  },
});
