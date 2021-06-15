import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Styles } from "../../../assets/Styles";
import { CommonActions } from "@react-navigation/native";

export const Search = ({ navigation, style }) => {
  return (
    <View style={style}>
      <View style={Styles.categories__search_wrapper}>
        <Ionicons
          name="ios-search-outline"
          size={24}
          color="#181B19"
          style={Styles.categories__search_icon}
        />
        <TouchableOpacity
          style={[
            Styles.categories__search_input,
            { justifyContent: "center" },
          ]}
          containerStyle={{ width: "100%", justifyContent: "center" }}
          activeOpacity={0.8}
          onPress={(val) => {
            // navigation.push("ProductsStack", { screen: "Search" });
            navigation.push("Search");
          }}
        >
          <Text style={{ color: "#7c7c7c" }}>Поиск в доДома</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
