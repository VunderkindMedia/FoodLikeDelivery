import { LoginView } from "./childs/LoginView";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInputMask } from "react-native-masked-text";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";

export const LoginStep1 = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [phoneValid, setPhoneValid] = useState(null);
  const phoneInput = useRef(null);

  return (
    <LoginView navigation={navigation}>
      <View style={{ flex: 1, marginHorizontal: 25, paddingBottom: 30 }}>
        <Text
          style={{
            fontFamily: "Gilroy_Medium",
            fontSize: 26,
            marginBottom: 25,
          }}
        >
          Введите номер телефона:
        </Text>
        <Text
          style={{
            fontFamily: "Gilroy_Medium",
            fontSize: 16,
            marginBottom: 25,
            color: "#7c7c7c",
          }}
        >
          Номер телефона:
        </Text>
        <TextInputMask
          ref={phoneInput}
          style={{
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderColor: phoneValid !== false ? "#e2e2e2" : "red",
            fontFamily: "Gilroy_Medium",
            fontSize: 18,
          }}
          type={"custom"}
          options={{
            mask: "+7 (999) 999-99-99",
            validator: (value, settings) => {
              if (value.length === 18) {
                return true;
              }
            },
          }}
          value={phone}
          placeholder={"+7 (999) 999-99-99"}
          onChangeText={(text) => {
            setPhone(text);
          }}
        />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              alignSelf: "flex-end",
              height: 67,
              width: 67,
              backgroundColor: "#53B175",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              if (phoneInput.current.isValid()) {
                setPhoneValid(true);
                navigation.navigate("LoginStep2", {
                  phone: "+" + phone.toString().replace(/\D/g, ""),
                });
              } else {
                setPhoneValid(false);
              }
            }}
          >
            <MaterialIcons name="arrow-forward-ios" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </LoginView>
  );
};
