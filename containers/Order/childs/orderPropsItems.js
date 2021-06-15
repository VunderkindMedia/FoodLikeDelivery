import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {} from "react-native-gesture-handler";

export const orderPropsItems = ({ item, index }) => {
  return (
    <TouchableOpacity
      onPress={() => item.onClick()}
      activeOpacity={0.8}
      style={styles.item}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
      <View style={styles.itemRight}>
        <Text
          style={[
            styles.itemValue,
            {
              fontFamily: index === 4 ? "Gilroy_SemiBold" : "Gilroy_Regular",
              color: index === 4 ? "#030303" : "#7c7c7c",
            },
            { color: item.error ? "#fe6666" : "#7c7c7c" },
          ]}
        >
          {item.value}
        </Text>
        <Ionicons name="chevron-forward-outline" size={24} color="black" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    height: 60,
    paddingHorizontal: 25,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#e2e2e2",
    borderBottomWidth: 1,
  },
  itemTitle: {
    color: "#7c7c7c",
    fontSize: 18,
    fontFamily: "Gilroy_Bold",
  },
  itemValue: {
    color: "#7c7c7c",
    fontSize: 16,
  },
  itemRight: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
