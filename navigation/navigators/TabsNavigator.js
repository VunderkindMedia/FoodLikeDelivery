import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { MainShop } from "../../containers/MainShop";
import { Profile } from "../../containers/Profile";
import { ProductStack } from "./ProductStack";
import { CartStack } from "./CartStack";

import { AppContext } from "../../context/app/AppContext";
import { main_color } from "../../assets/Styles";
import {
  Entypo,
  FontAwesome5,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  TAB_NAME_MAIN_SHOP,
  TAB_NAME_CATALOG,
  TAB_NAME_CART,
  TAB_NAME_FAVORITES,
  TAB_NAME_PROFILE,
} from "../../dist/strings";

export const TabsNavigator = ({ route }) => {
  const Tab = createBottomTabNavigator();
  const { cartListCount } = useContext(AppContext);
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: main_color,
        inactiveTintColor: "gray",
        style: styles.tabs,
      }}
    >
      <Tab.Screen
        name="MainShop"
        component={ProductStack}
        initialParams={{ screen: "MainShop" }}
        options={{
          title: TAB_NAME_MAIN_SHOP,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="shop" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ProductsStack"
        component={ProductStack}
        options={{
          title: TAB_NAME_CATALOG,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="text-search"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStack}
        options={{
          title: TAB_NAME_CART,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="cart-outline"
              size={size}
              color={color}
            />
          ),
          tabBarBadge: cartListCount(),
          tabBarBadgeStyle: styles.cartTabStyle,
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={ProductStack}
        initialParams={{ screen: "Favorites" }}
        options={{
          title: TAB_NAME_FAVORITES,
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="cards-heart"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={CartStack}
        initialParams={{ screen: "Profile" }}
        options={{
          title: TAB_NAME_PROFILE,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome5 name="user" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  tabs: {
    paddingBottom: 18,
    paddingTop: 10,
    height: 70,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderColor: "#e2e2e2",
    borderWidth: 1,
    shadowColor: "#555E58",
    shadowOffset: {
      width: 2,
      height: -5,
    },
    shadowRadius: 10,
    shadowOpacity: 0.1,
    elevation: 0,
  },
  cartTabStyle: {
    backgroundColor: main_color,
    color: "#fff",
    fontSize: 11,
  },
});
