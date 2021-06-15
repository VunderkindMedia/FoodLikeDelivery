import React, { useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { main_color } from "../../../assets/Styles";
import { AppContext } from "../../../context/app/AppContext";

export const Header = ({ route, navigation }) => {
  const { client } = useContext(AppContext);
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <FontAwesome name="user" size={60} color={main_color} />
      </View>
      <TouchableOpacity
        activeOpacity={0.5}
        containerStyle={styles.namesWrapper}
        onPress={() => navigation.push("EditUser")}
      >
        <View style={styles.nameWrapper}>
          <Text style={styles.name}>
            {client.firstname || "Имя"} {client.lastname || "Фамилия"}
          </Text>
          <FontAwesome name="pencil" size={18} color={main_color} />
        </View>
        <Text style={styles.phone}>{client.phone}</Text>
      </TouchableOpacity>
      <View></View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 25,
    borderBottomWidth: 1,
    borderColor: "#c7c7c7",
  },
  name: {
    fontFamily: "Gilroy_SemiBold",
    fontSize: 18,
    marginRight: 10,
  },
  phone: {
    fontFamily: "Gilroy_Regular",
    fontSize: 16,
    color: "#7c7c7c",
  },
  namesWrapper: {
    justifyContent: "center",
    alignItems: "flex-start",
    flex: 1,
  },
  nameWrapper: {
    flexDirection: "row",
  },
  icon: {
    marginRight: 20,
  },
});
