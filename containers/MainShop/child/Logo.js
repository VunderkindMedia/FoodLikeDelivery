import React from "react";
import { View, Image, StyleSheet } from "react-native";

export const Logo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/logo_mini.png")}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 7,
  },
  image: {
    height: 30,
    resizeMode: "contain",
  },
});
