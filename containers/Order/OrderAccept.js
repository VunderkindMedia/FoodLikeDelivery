import { StackActions } from "@react-navigation/native";
import React, { useContext } from "react";
import { View, Text, ImageBackground, StyleSheet, Image } from "react-native";
import { AppButton } from "../../components/AppButton";
import { AppContext } from "../../context/app/AppContext";

export const OrderAccept = ({ navigation }) => {
  const goToMain = () => {
    navigation.popToTop();
    navigation.navigate("MainShop");
  };
  const goToOrders = () => {
    navigation.popToTop();
    navigation.navigate("Orders");
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBack}
        source={require("../../assets/order_accepted.png")}
        imageStyle={{ width: "100%" }}
      >
        <Image
          source={require("../../assets/acceptLogo.png")}
          style={styles.image}
        />
        <View style={styles.body}>
          <Text style={styles.title}>Ваш заказ успешно создан</Text>
          <Text style={styles.subtitle}>
            Ожидайте уведомления или проверьте статус заказа в списке заказов
            вашего профиля
          </Text>
        </View>
        <AppButton
          title={"Проверить список заказов"}
          style={[styles.btns]}
          pressHandler={goToOrders}
        />
        <AppButton
          color={"transparent"}
          textColor={"#000"}
          title={"Вернуться на главную"}
          style={[styles.btns, styles.mainBtn]}
          pressHandler={goToMain}
        />
      </ImageBackground>
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
    marginLeft: -40,
    marginTop: 100,
  },
  title: {
    fontFamily: "Gilroy_SemiBold",
    fontSize: 28,
  },
  subtitle: {
    fontFamily: "Gilroy_Medium",
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
    marginBottom: 20,
  },
  body: {
    flex: 1,
    alignItems: "center",
  },
});
