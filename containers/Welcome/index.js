import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StatusBar,
  ImageBackground,
} from "react-native";
import { Styles } from "../../assets/Styles";
import { WELCOME_BUTTON_TITLE } from "../../dist/strings";

export const Welcome = ({ navigation }) => {
  return (
    <View style={{ flex: 1 }}>
      <StatusBar
        barStyle="light-content"
        style={{ backgroundColor: "transparent" }}
      />
      <ImageBackground
        style={Styles.welcome__image}
        source={require("../../assets/welcome_image.png")}
      >
        <View style={Styles.welcome__content_wrapper}>
          <Image
            style={Styles.welcome__mini_logo}
            source={require("../../assets/splash.png")}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={Styles.welcome__btn}
            onPress={() => navigation.push("Login")}
          >
            <Text style={Styles.welcome__btn_title}>
              {WELCOME_BUTTON_TITLE}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};
