import React from "react";
import { MainShop } from "../../containers/MainShop";
import { Categories } from "../../containers/Products/Categories";
import { HeaderButton } from "../childs/HeaderButton";
import { Products } from "../../containers/Products/Products";
import { Product } from "../../containers/Products/Product";
import { Favorites } from "../../containers/Products/Favorites";
import { createStackNavigator } from "@react-navigation/stack";
import { forFade } from "../childs/Animations";
import { Search } from "../../containers/Products/Search";

export const ProductStack = ({ route }) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        cardStyle: {
          backgroundColor: "#fff",
        },
      }}
      initialRouteName={(route.params && route.params.screen) || "Categories"}
    >
      <Stack.Screen
        name={"Categories"}
        options={{
          headerShown: true,
          headerLeft: null,
          title: "Список категорий",
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
        component={Categories}
      />
      <Stack.Screen
        name={"Products"}
        options={{
          headerShown: true,
          title: "",
          cardStyleInterpolator: forFade,
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
          headerLeft: (props) => <HeaderButton {...props} />,
        }}
        component={Products}
      />
      <Stack.Screen
        name={"Product"}
        options={{
          headerShown: false,
          title: "",
          cardStyleInterpolator: forFade,
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
        component={Product}
      />
      <Stack.Screen
        name={"Favorites"}
        options={{
          headerShown: true,
          title: "Избранные товары",
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
          headerLeft: null,
        }}
        component={Favorites}
      />
      <Stack.Screen
        name={"Search"}
        options={{
          headerShown: true,
          title: "Поиск",
          cardStyleInterpolator: forFade,
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
          headerLeft: (props) => <HeaderButton {...props} />,
        }}
        component={Search}
      />
      <Stack.Screen
        name={"MainShop"}
        options={{
          headerShown: false,
          cardStyleInterpolator: forFade,
          headerStyle: {
            shadowRadius: 0,
            shadowOffset: {
              height: 0,
            },
            elevation: 0,
          },
          headerLeft: null,
        }}
        component={MainShop}
      />
    </Stack.Navigator>
  );
};
