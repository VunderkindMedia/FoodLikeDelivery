import React, { useContext } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Styles } from "../../assets/Styles";
import { AppContext } from "../../context/app/AppContext";
import { Body } from "./childs/Body";
import { Footer } from "./childs/Footer";
import { Header } from "./childs/Header";

export const Profile = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header navigation={navigation} />
      <Body navigation={navigation} />
      <Footer navigation={navigation} />
    </SafeAreaView>
  );
};
