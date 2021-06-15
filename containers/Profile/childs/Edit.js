import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import { main_color } from "../../../assets/Styles";
import { AppButton } from "../../../components/AppButton";
import ToggleButton from "../../../components/ToggleButton";
import { AppContext } from "../../../context/app/AppContext";
import { CANCEL } from "../../../dist/strings";
import {
  formatDate,
  stringToDate,
  twoButtonAlert,
} from "../../../helpers/funcs";
import SwitchButton from "./SwitchButton";
import { TextField } from "./TextField";
import RNDateTimePicker from "@react-native-community/datetimepicker";

export const Edit = ({ navigation }) => {
  const { client, setClient, saveClient } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [dateShow, setDateShow] = useState(false);

  const textChangeHandler = (field, value) => {
    setClient({ ...client, [field]: value });
  };

  const submitHandler = () => {
    setLoading(true);
    saveClient(client).then(() => {
      setLoading(false);
      navigation.goBack();
    });
  };

  const onDateChange = (event, selectedDate) => {
    setDateShow(false);
    setClient({ ...client, birthday: formatDate(selectedDate, false, true) });
  };

  return (
    <SafeAreaView style={{ flex: 1, zIndex: 100 }}>
      {loading && (
        <View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            flex: 1,
            zIndex: 200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={main_color} size={"large"} />
        </View>
      )}
      <ScrollView style={styles.wrapper}>
        <TextField
          title={"Фамилия"}
          placeholder={"Введите фамилию"}
          name={"FirstName"}
          value={client.lastname}
          onChange={(val) => textChangeHandler("lastname", val)}
          textContentType={"familyName"}
        />
        <TextField
          title={"Имя"}
          placeholder={"Введите имя"}
          value={client.firstname}
          onChange={(val) => textChangeHandler("firstname", val)}
          textContentType={"name"}
        />
        <TextField
          textContentType={"emailAddress"}
          title={"Эл. почта"}
          placeholder={"Введите эл. адрес"}
          name={"Email"}
          onChange={(val) => textChangeHandler("email", val)}
          value={client.email}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          style={{
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderColor: "#e2e2e2",
          }}
          onPress={() => setDateShow(true)}
        >
          <Text style={styles.title}>Дата рождения</Text>
          <Text style={styles.dateWrapper}>
            {formatDate(stringToDate(client.birthday, "yyyy-mm-dd", "-"), true)}
          </Text>
        </TouchableOpacity>

        {dateShow && (
          <RNDateTimePicker
            testID="dateTimePicker"
            value={
              stringToDate(client.birthday, "yyyy-mm-dd", "-") || new Date()
            }
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={onDateChange}
          />
        )}
        <View style={{ paddingBottom: 120 }}>
          <ToggleButton
            value={+client.client_sex === 1 ? false : true}
            leftText="Мужской"
            rightText="Женский"
            leftColor={"#030303"}
            rightColor={"#030303"}
            buttonWidth={250}
            buttonHeight={50}
            sliderHeight={40}
            buttonRadius={5}
            buttonOffColor={"#e2e2e2"}
            buttonOnColor={"#e2e2e2"}
            sliderOnColor={"#fff"}
            sliderOffColor={"#fff"}
            sliderRadius={8}
            sliderWidth={125}
            onToggle={(val) =>
              setClient({ ...client, client_sex: val ? 2 : 1 })
            }
          />
        </View>
      </ScrollView>
      <AppButton
        disabled={loading}
        title={"Сохранить"}
        style={{ left: 20, right: 20, bottom: 20, position: "absolute" }}
        pressHandler={() =>
          twoButtonAlert(
            "Сохранить",
            "Сохранить данные профиля?",
            CANCEL,
            "Сохранить",
            submitHandler
          )
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  dateWrapper: {
    backgroundColor: "#e2e2e2",
    borderRadius: 10,
    padding: 10,
    alignSelf: "flex-start",
    fontFamily: "Gilroy_Medium",
    fontSize: 18,
    color: "#030303",
  },
  title: {
    fontFamily: "Gilroy_SemiBold",
    fontSize: 16,
    color: "#7c7c7c",
    marginBottom: 15,
  },
});
