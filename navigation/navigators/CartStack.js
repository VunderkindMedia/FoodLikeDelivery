import React from "react";
import { Cart } from "../../containers/Cart";
import { createStackNavigator } from "@react-navigation/stack";
import { Order } from "../../containers/Order/Order";
import { OrderAccept } from "../../containers/Order/OrderAccept";
import { Orders } from "../../containers/Order/Orders";
import { Profile } from "../../containers/Profile";
import { Edit } from "../../containers/Profile/childs/Edit";
import { forFade, forSlideX, forSlideY } from "../childs/Animations";
import { OrderMain } from "../../containers/Order/OrderMain";
import { Addresses } from "../../containers/Order/Addresses";
import { AddAdress } from "../../containers/Order/AddAdress";
import { DateTimeDelivery } from "../../containers/Order/DateTimeDelivery";
import { Pay } from "../../containers/Order/Pay";

export const CartStack = ({ route }) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      detachPreviousScreen={true}
      screenOptions={{
        cardStyle: {
          backgroundColor: "#fff",
        },
      }}
      initialRouteName={(route.params && route.params.screen) || "Cart"}
    >
      <Stack.Screen
        name={"Cart"}
        options={{
          headerShown: true,
          headerLeft: null,
          title: "Корзина",
          cardStyleInterpolator: forFade,
          headerTitleStyle: {
            fontFamily: "Gilroy_Bold",
            fontSize: 20,
            alignSelf: "center",
          },
          headerStyle: {
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
            elevation: 0,
          },
        }}
        component={Cart}
      />
      <Stack.Screen
        name={"OrderMain"}
        options={{
          mode: "modal",
          headerMode: "screen",
          gestureResponseDistance: {
            vertical: 1000,
          },
          cardStyle: {
            backgroundColor: "transparent",
            opacity: 0.99,
          },
          gestureEnabled: true,
          gestureDirection: "vertical",
          headerShown: false,
          cardStyleInterpolator: forSlideY,
          headerTitleStyle: {
            fontFamily: "Gilroy_Bold",
            fontSize: 20,
            alignSelf: "center",
          },
        }}
        component={OrderMain}
      />
      <Stack.Screen
        name={"Addresses"}
        options={{
          mode: "modal",
          headerMode: "screen",
          // gestureResponseDistance: {
          //   vertical: 1000
          // },
          cardStyle: {
            backgroundColor: "transparent",
            opacity: 0.99,
          },
          gestureEnabled: true,
          gestureDirection: "vertical",
          headerShown: false,
          cardStyleInterpolator: forSlideY,
          headerTitleStyle: {
            fontFamily: "Gilroy_Bold",
            fontSize: 20,
            alignSelf: "center",
          },
        }}
        component={Addresses}
      />
      <Stack.Screen
        name={"AddAdress"}
        options={{
          mode: "modal",
          headerMode: "screen",
          gestureResponseDistance: {
            vertical: 1000,
          },
          keyboardHandlingEnabled: true,
          cardStyle: {
            backgroundColor: "transparent",
            opacity: 0.99,
          },
          // gestureEnabled: true,
          // gestureDirection: 'vertical',
          headerShown: false,
          cardStyleInterpolator: forSlideY,
          headerTitleStyle: {
            fontFamily: "Gilroy_Bold",
            fontSize: 20,
            alignSelf: "center",
          },
        }}
        component={AddAdress}
      />
      <Stack.Screen
        name={"DateTimeDelivery"}
        options={{
          mode: "modal",
          headerMode: "screen",
          gestureResponseDistance: {
            vertical: 1000,
          },
          keyboardHandlingEnabled: true,
          cardStyle: {
            backgroundColor: "transparent",
            opacity: 0.99,
          },
          // gestureEnabled: true,
          // gestureDirection: 'vertical',
          headerShown: false,
          cardStyleInterpolator: forSlideY,
          headerTitleStyle: {
            fontFamily: "Gilroy_Bold",
            fontSize: 20,
            alignSelf: "center",
          },
        }}
        component={DateTimeDelivery}
      />
      <Stack.Screen
        name={"Pay"}
        options={{
          headerMode: "screen",
          // gestureEnabled: true,
          // gestureDirection: 'vertical',
          headerShown: true,
          cardStyleInterpolator: forSlideY,
          headerTitleStyle: {
            fontFamily: "Gilroy_Bold",
            fontSize: 20,
            alignSelf: "center",
          },
        }}
        component={Pay}
      />
      <Stack.Screen
        name={"Profile"}
        options={{
          headerMode: "screen",
          headerShown: false,
          cardStyleInterpolator: forSlideY,
        }}
        component={Profile}
      />
      <Stack.Screen
        name={"EditUser"}
        options={{
          headerShown: true,
          title: "Редактирование профиля",
          cardStyleInterpolator: forSlideX,
          headerTitleStyle: {
            fontFamily: "Gilroy_Bold",
            fontSize: 20,
          },
          headerStyle: {
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
            elevation: 0,
          },
        }}
        component={Edit}
      />
      <Stack.Screen
        name={"OrderAccept"}
        options={{
          cardStyleInterpolator: forSlideX,
          headerShown: false,
        }}
        component={OrderAccept}
      />
      <Stack.Screen
        name={"Orders"}
        options={{
          headerShown: true,
          title: "Мои заказы",
          cardStyleInterpolator: forSlideX,
          headerTitleStyle: {
            fontFamily: "Gilroy_Bold",
            fontSize: 20,
          },
          headerStyle: {
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
            elevation: 0,
          },
        }}
        component={Orders}
      />
      <Stack.Screen
        name={"Order"}
        options={{
          headerShown: true,
          cardStyleInterpolator: forSlideX,
          headerTitleStyle: {
            fontFamily: "Gilroy_Bold",
            fontSize: 20,
          },
          headerStyle: {
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
            elevation: 0,
          },
        }}
        component={Order}
      />
    </Stack.Navigator>
  );
};
