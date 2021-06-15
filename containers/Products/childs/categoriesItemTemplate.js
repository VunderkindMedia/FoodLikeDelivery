import { Styles } from "../../../assets/Styles";
import { colourNameToHex } from "../../../dist/colors";
import { Image, Text, TouchableOpacity } from "react-native";
import { BASE_URL } from "../../../dist/consts";
import React from "react";

export const categoriesItemTemplate = (item, navigation, categories) => {
  let touched = false;
  const navigateHandler = (id) => {
    if (!touched) {
      touched = true;
      if (categories.filter((cat) => cat.parent_category == id).length > 0) {
        navigation.push("Categories", {
          parent_id: id,
        });
      } else {
        navigation.push("Products", {
          title: item.category_name,
          category_id: item.category_id,
        });
      }
    }
  };
  return (
    // !loading ?
    <TouchableOpacity
      onPress={() => navigateHandler(item.category_id)}
      activeOpacity={0.8}
      style={[
        Styles.categories__container,
        {
          backgroundColor: colourNameToHex(item.category_color) + "25",
          borderColor: colourNameToHex(item.category_color) + "75",
        },
      ]}
    >
      <Image
        style={Styles.categories__item_image}
        source={
          item.category_photo_origin
            ? { uri: BASE_URL + item.category_photo_origin }
            : require("../../../assets/no-photo.png")
        }
      />
      <Text numberOfLines={2} style={Styles.categories__item_title}>
        {item.category_name}
      </Text>
    </TouchableOpacity>
  );
};
