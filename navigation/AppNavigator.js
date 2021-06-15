import React, { useRef, useEffect, useContext } from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { ErrorView } from "../components/ErrorView";
import { AppContext } from "../context/app/AppContext";
import { WelcomeStack } from "./navigators/WelcomeStack";
import Toast, { BaseToast } from "react-native-toast-message";
import { icons } from "react-native-toast-message/src/assets";
import { ModalContainer } from "../components/ModalContainer";
import { main_color } from "../assets/Styles";

export const AppNav = ({}) => {
  const { setNavRef, error, getSettings } = useContext(AppContext);

  const toastConfig = {
    my_type: ({ text1, props, ...rest }) => (
      <View style={{ height: 60, width: "100%", backgroundColor: "tomato" }}>
        <Text>{text1}</Text>
      </View>
    ),
    success: ({ text1, topOffset, props, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: main_color }}
        contentContainerStyle={{ padding: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: "400",
          color: "#000",
        }}
        leadingIcon={icons.success}
        text1={text1}
        text2={props.uuid}
      />
    ),
    error: ({ text1, topOffset, props, ...rest }) => (
      <BaseToast
        {...rest}
        style={{ borderLeftColor: "red" }}
        contentContainerStyle={{ padding: 15 }}
        text1Style={{
          fontSize: 16,
          fontWeight: "400",
          color: "#000",
        }}
        leadingIcon={icons.error}
        text1={text1}
        text2={props.uuid}
      />
    ),
  };
  const navRef = useRef();

  useEffect(() => {
    setNavRef(navRef);
  }, []);

  return (
    <NavigationContainer ref={navRef}>
      {error ? (
        <ErrorView clickHandler={getSettings} />
      ) : (
        <WelcomeStack navRef={navRef} />
      )}
      <Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
    </NavigationContainer>
  );
};
