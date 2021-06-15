import React from "react";
import { Image, StyleSheet } from "react-native";

export const sliderItems = (index, item, style, width) => {
  console.log(item);
  return (
    <Image key={item.title} style={styles.image} source={{ uri: item.src }} />
  );
};

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: "100%",
  },
});
