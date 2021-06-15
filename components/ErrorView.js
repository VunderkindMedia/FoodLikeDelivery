import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  ActivityIndicator,
} from "react-native";
import { main_color } from "../assets/Styles";
import { AppContext } from "../context/app/AppContext";
import { AppButton } from "./AppButton";

export const ErrorView = ({ navigation, clickHandler }) => {
  const { fontsReady } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  return fontsReady ? (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBack}
        source={require("../assets/order_accepted.png")}
        imageStyle={{ width: "100%" }}
      >
        <Image
          source={require("../assets/error_logo.png")}
          style={styles.image}
        />
        <View style={styles.body}>
          <Text style={styles.title}>Произошла ошибка</Text>
          <Text style={styles.subtitle}>
            Возможно проблемы с сетью или на сервере ведутся технические работы
          </Text>
          {loading && <ActivityIndicator size={"large"} color={main_color} />}
        </View>

        <AppButton
          title={"Попробывать еще раз"}
          style={[styles.btns, styles.mainBtn]}
          pressHandler={() => {
            setLoading(true);
            clickHandler();
          }}
        />
      </ImageBackground>
    </View>
  ) : (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <ActivityIndicator size={"large"} color={main_color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: 200,
    resizeMode: "contain",
    marginLeft: 0,
    marginTop: "50%",
  },
  title: {
    // fontFamily: "Gilroy_SemiBold",
    fontSize: 28,
  },
  subtitle: {
    // fontFamily: "Gilroy_Medium",
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 40,
    marginVertical: 20,
  },
  imageBack: { flex: 1, alignItems: "center" },
  btns: {
    marginHorizontal: 20,
  },
  mainBtn: {
    marginBottom: 60,
  },
  body: {
    flex: 1,
    alignItems: "center",
  },
});
