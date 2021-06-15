import { MaterialIcons } from "@expo/vector-icons";
import { StackActions } from "@react-navigation/native";
import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Linking,
  Clipboard,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import { main_color } from "../../../assets/Styles";
import { AppButton } from "../../../components/AppButton";
import { AppContext } from "../../../context/app/AppContext";
import { CANCEL } from "../../../dist/strings";
import { twoButtonAlert } from "../../../helpers/funcs";

export const Footer = ({ route, navigation }) => {
  const { logOut, navRef } = useContext(AppContext);

  const handlePhone = () => {
    // Linking.openURL("tel:+79147778899");
    // this.props.onPress && this.props.onPress();
    Clipboard.setString("+79147778899");
    Toast.show({
      text1: `Номер скопирован`,
      type: "success",
      visibilityTime: 2000,
      autoHide: true,
      topOffset: 60,
    });
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.contactsWrapper}
        activeOpacity={0.8}
        onPress={handlePhone}
      >
        <Text style={styles.feedBack}>Связаться с нами</Text>
        <Text style={styles.phone}>+ 7 (914) 777-88-99</Text>
      </TouchableOpacity>
      <AppButton
        title={"Выйти"}
        pressHandler={() => {
          twoButtonAlert(
            "Выход из профиля",
            "Вы действительно хотите выйти из профиля?",
            CANCEL,
            "Выйти",
            () => logOut()
          );
        }}
        color="#e2e2e2"
        textColor={main_color}
        iconComponent={
          <MaterialIcons name="logout" size={18} color={main_color} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 20,
  },
  phone: {
    fontFamily: "Gilroy_SemiBold",
    fontSize: 16,
    color: main_color,
  },
  feedBack: {
    fontFamily: "Gilroy_SemiBold",
    fontSize: 16,
    color: "#c7c7c7",
    marginBottom: 7,
  },
  contactsWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 20,
  },
});
