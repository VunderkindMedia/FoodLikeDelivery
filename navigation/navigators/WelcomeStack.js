import React, { useContext, useEffect, useState } from "react";

import { Welcome } from "../../containers/Welcome";
import { Splash } from "../../containers/Splash";
import { LoginStack } from "../navigators/LoginStack";
import { TabsNavigator } from "../navigators/TabsNavigator";
import { forFade } from "../childs/Animations";
import { StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { AppContext } from "../../context/app/AppContext";

export const WelcomeStack = ({ navRef }) => {
  const {
    storage_phone,
    start_loading,
    findClient,
    addPushClient,
  } = useContext(AppContext);
  const Stack = createStackNavigator();
  useEffect(() => {
    if (!start_loading) {
      if (storage_phone !== undefined && storage_phone !== null) {
        findClient({ phone: storage_phone })
          .then((result) => {
            if (result.response.length > 0) {
              addPushClient(storage_phone);
              navRef.current?.dispatch(StackActions.replace("MainTabs"));
            } else {
              navRef.current?.dispatch(StackActions.replace("Welcome"));
            }
          })
          .catch((error) => console.log(error));
      } else {
        navRef.current?.dispatch(StackActions.replace("Welcome"));
      }
    }
  }, [start_loading]);

  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen
        name={"Splash"}
        component={Splash}
        options={{
          title: "",
          headerShown: false,
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen
        name={"Welcome"}
        component={Welcome}
        options={{
          title: "",
          headerShown: false,
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen
        name={"Login"}
        component={LoginStack}
        options={{
          title: "",
          headerShown: false,
          cardStyleInterpolator: forFade,
        }}
      />
      <Stack.Screen
        name={"MainTabs"}
        component={TabsNavigator}
        options={{
          headerShown: false,
          cardStyleInterpolator: forFade,
        }}
      />
    </Stack.Navigator>
  );
};
