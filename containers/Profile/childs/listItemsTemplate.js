import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

export const listItemsTemplate = (item) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.container}
      onPress={item.handler}
    >
      {item.icon}
      <Text style={styles.title}>{item.title}</Text>
      <Ionicons name="chevron-forward-outline" size={24} color="black" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderBottomWidth: 1,
    alignItems: "center",
    borderColor: "#e2e2e2",
    padding: 20,
  },
  title: {
    marginLeft: 20,
    fontFamily: "Gilroy_SemiBold",
    fontSize: 18,
    flex: 1,
    color: "#181725",
  },
});
