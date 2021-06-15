import React, { useState, useEffect, useContext, useRef } from "react";
import {
  View,
  Text,
  Image,
  StatusBar,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { LoginView } from "./childs/LoginView";
import { TextInputMask } from "react-native-masked-text";
import { MaterialIcons } from "@expo/vector-icons";
import { AppContext } from "../../context/app/AppContext";
import { makeRandomeCode } from "../../helpers/funcs";
import useCountDown from "react-countdown-hook";
import { CommonActions } from "@react-navigation/native";

export const LoginStep2 = ({ navigation, route }) => {
  const initialTime = 30 * 1000; // 60 сек
  const interval = 1000; // интервал изменения значения таймера в разметке

  const {
    sendSMS,
    addClient,
    getClient,
    addPushClient,
    expoPushToken,
  } = useContext(AppContext);
  const [code, setCode] = useState("");
  const [timeLeft, { start }] = useCountDown(initialTime, interval);
  const codeInput = useRef(null);
  const [loading, setLoading] = useState(false);
  const [smsCode, setSmsCode] = useState("");
  const [codeValid, setCodeValid] = useState(null);
  const { setStoragePhone, findClient } = useContext(AppContext);

  useEffect(() => {
    setSmsCode(makeRandomeCode());
  }, []);

  useEffect(() => {
    if (smsCode) {
      if (timeLeft <= 0 || timeLeft == 30000) {
        sendSMS(smsCode, route.params.phone);
        start();
      }
    }
  }, [smsCode]);

  const checkCode = () => {
    if (codeInput.current.isValid()) {
      setCodeValid(true);
      if (code.replace(/\D/g, "") === smsCode) {
        setLoading(true);
        findClient({ phone: route.params.phone }).then((result) => {
          if (result.response.length > 0) {
            setStoragePhone(route.params.phone);
            addPushClient(route.params.phone);
            setLoading(false);
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: "MainTabs",
                  },
                ],
              })
            );
          } else {
            addClient({ phone: "+" + route.params.phone }).then(() => {
              setStoragePhone("+" + route.params.phone);
              if (result.response) {
                getClient(result.response).then((result) => {
                  if (result.response) {
                    addPushClient(route.params.phone);
                    setLoading(false);
                    navigation.dispatch(
                      CommonActions.reset({
                        index: 0,
                        routes: [
                          {
                            name: "MainTabs",
                          },
                        ],
                      })
                    );
                  } else {
                    //TODO Добавить обработку ошибок и заглушку
                  }
                });
              } else {
                //TODO Добавить обработку ошибок и заглушку
              }
            });
          }
        });
      }
    } else {
      setCodeValid(false);
    }
  };

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
          Введите код, полученный в SMS:
        </Text>
        <Text
          style={{
            fontFamily: "Gilroy_Medium",
            fontSize: 16,
            marginBottom: 25,
            color: "#7c7c7c",
          }}
        >
          Проверочный код:
        </Text>
        <TextInputMask
          ref={codeInput}
          style={{
            paddingBottom: 15,
            borderBottomWidth: 1,
            borderColor: codeValid !== false ? "#e2e2e2" : "red",
            fontFamily: "Gilroy_Medium",
            fontSize: 18,
          }}
          type={"custom"}
          options={{
            mask: "9-9-9-9",
            validator: (value, settings) => {
              if (value.length === 7) {
                return true;
              }
            },
          }}
          value={code}
          placeholder={"- - - -"}
          includeRawValueInChangeText={true}
          onChangeText={(code) => {
            setCode(code);
          }}
        />
        <View style={{ flex: 1, justifyContent: "flex-end" }}>
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <TouchableOpacity
              disabled={timeLeft > 0}
              activeOpacity={0.8}
              style={{}}
              onPress={() => setSmsCode(makeRandomeCode())}
            >
              <Text style={{ color: "#53B175" }}>
                Отправить заного
                {timeLeft / 1000 !== 0 && ": " + timeLeft / 1000 + " сек"}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                checkCode();
              }}
              activeOpacity={0.8}
              style={{
                // alignSelf: "flex-end",
                height: 67,
                width: 67,
                backgroundColor: "#53B175",
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
              }}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color={"white"} size={"large"} />
              ) : (
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={24}
                  color="white"
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </LoginView>
  );
};
