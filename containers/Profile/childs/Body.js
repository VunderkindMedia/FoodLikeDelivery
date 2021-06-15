import React from "react";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { listItemsTemplate } from "./listItemsTemplate";

export const Body = ({ route, navigation }) => {
  const listItems = [
    {
      key: 0,
      title: "Мои заказы",
      icon: <FontAwesome name="shopping-bag" size={20} color="black" />,
      handler: () => navigation.navigate("Orders"),
    },
    {
      key: 1,
      title: "Адреса",
      icon: <Ionicons name="location-outline" size={20} color="black" />,
      handler: () => navigation.navigate("Addresses"),
    },
    // {
    //   key: 2,
    //   title: "О нас",
    //   icon: <AntDesign name="exclamationcircleo" size={20} color="black" />,
    //   handler: () => console.log("О нас"),
    // },
  ];
  return (
    <FlatList
      style={styles.list}
      data={listItems}
      renderItem={({ item }) => listItemsTemplate(item)}
      keyExtractor={(item) => item.key.toString()}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});
