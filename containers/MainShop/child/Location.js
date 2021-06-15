import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Entypo } from "@expo/vector-icons";

export const Location = () => {
  return (
    <View style={styles.container}>
      <Entypo name="location-pin" size={24} color="#4C4F4D" />
      <Text style={styles.locationText}>Оха, Сахалин</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  locationText: {
    fontSize: 18,
    fontFamily: "Gilroy_SemiBold",
    marginHorizontal: 7,
  },
});
