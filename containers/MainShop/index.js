import React from "react";
import { Text, StyleSheet, View, SafeAreaView, StatusBar } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
// import { SafeAreaView } from "react-native-safe-area-context";
import { Styles } from "../../assets/Styles";
import { Header } from "./child/ Header";
import { Banners } from "./child/Banners";
import { Body } from "./child/Body";
import { Search } from "./child/Search";

export const MainShop = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"transparent"} barStyle="dark-content" />
      <Header style={styles.header} />

      <Search navigation={navigation} style={styles.header} />
      <ScrollView nestedScrollEnabled={true}>
        <Banners />
        <Body navigation={navigation} containerStyle={styles.body} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  body: { paddingHorizontal: 10, paddingBottom: 180 },
  header: {
    paddingHorizontal: 10,
  },
});
