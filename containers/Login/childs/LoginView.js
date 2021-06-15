import React, { useState } from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StatusBar,
  TouchableWithoutFeedback,
  View,
  ImageBackground,
  TouchableOpacity,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const LoginView = ({ children, navigation }) => {
  return (
    <View behavior={"height"} style={{ flex: 1, backgroundColor: "#fcfcfc" }}>
      <StatusBar barStyle="dark-content" />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ flex: 1 }}>
          <View style={{ height: "42%", marginBottom: 42 }}>
            <ImageBackground
              style={{ width: "100%", flex: 1 }}
              source={require("../../../assets/LoginImage.png")}
            >
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
                style={{
                  height: 100,
                  justifyContent: "flex-end",
                  paddingHorizontal: 25,
                }}
              >
                <MaterialIcons name="arrow-back-ios" size={24} color="black" />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
