import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { Styles } from "../../../assets/Styles";
import { BASE_URL } from "../../../dist/consts";

export const searchCategoryItem = (item, navigation, categories) => {
  console.log(item);
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={styles.wrapper}
      onPress={() => {
        if (
          categories.filter((cat) => cat.parent_category == item.category_id)
            .length > 0
        ) {
          navigation.push("Categories", {
            parent_id: item.category_id,
          });
        } else {
          navigation.push("Products", {
            title: item.category_name,
            category_id: item.category_id,
          });
        }
        // navigation.push("Products", {
        //   title: item.category_name,
        //   category_id: item.category_id,
        // });
      }}
    >
      <Image
        style={styles.image}
        source={{ uri: BASE_URL + item.category_photo }}
      />
      <Text style={styles.text}>{item.category_name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Gilroy_SemiBold",
    fontSize: 18,
    marginVertical: 10,
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 20,
    width: 20,
    borderRadius: 50,
    marginRight: 10,
  },
});
