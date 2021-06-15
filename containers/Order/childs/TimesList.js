import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { main_color } from "../../../assets/Styles";
import React, { useContext, useMemo } from "react";
import { AppContext } from "../../../context/app/AppContext";
import { ScrollView } from "react-native-gesture-handler";
import { filterTimeFormat } from "../../../helpers/funcs";

export const TimesList = ({ dateIndex, onChangeValue }) => {
  const { deliveryTimeList, checked_time } = useContext(AppContext);

  const nowTime = useMemo(() => new Date().getHours(), []);
  const nowTimeWithMinutes = useMemo(
    () => `${new Date().getHours()}:${new Date().getMinutes()}`,
    []
  );

  return (
    <ScrollView
      style={{
        padding: 15,
      }}
    >
      {deliveryTimeList.map((item, index) => (
        <TouchableOpacity
          activeOpacity={0.6}
          disabled={
            dateIndex === 0 &&
            (item.timeTo < nowTime ||
              item.timeTo - filterTimeFormat(nowTimeWithMinutes) < 1.5)
          } //те же условия, что и ниже, но на кажлдый элемент
          //выключаю слушатель клика, если условия верны - время уже прошло, соответственно недоступно для нажатия
          key={dateIndex + item.title}
          onPress={() => {
            onChangeValue(dateIndex, index);
          }}
          style={styles.listItem}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              borderWidth: 1,
              marginVertical: 5,
              paddingVertical: 2,
              paddingHorizontal: 10,
              borderRadius: 15,
              borderColor:
                checked_time.time === index && checked_time.date === dateIndex
                  ? main_color
                  : "#c7c7c7",
            }}
          >
            <View
              style={{
                height: 15,
                marginVertical: 15,
              }}
            >
              <Text
                style={[
                  styles.selectedItem,
                  {
                    color:
                      dateIndex === 0 &&
                      (item.timeTo < nowTime ||
                        item.timeTo - filterTimeFormat(nowTimeWithMinutes) <
                          1.5)
                        ? "#7c7c7c"
                        : "#000", //те же условия, что и ниже, но на кажлдый элемент
                    //меняю цвет на серый, если условия верны - время уже прошло, соответственно недоступно для выбора
                  },
                ]}
              >
                {item.title}
              </Text>
            </View>

            {checked_time.time === index && checked_time.date === dateIndex && (
              <Ionicons name="checkmark-circle" size={30} color={main_color} />
            )}
          </View>
        </TouchableOpacity>
      ))}
      {dateIndex === 0 && //если индекс таб скрина 0, т.е. Сегодня
        (deliveryTimeList[deliveryTimeList.length - 1].timeTo < nowTime || //если последний элемент массива со временем меньше текущего времени
          deliveryTimeList[deliveryTimeList.length - 1].timeTo - nowTime <
            2) && ( //или если разница - текущее время минус время последнего элемента массива < 2
          //то покажу блок ниже (нет доступного времени для доставки, выберите другой день)
          <View>
            <Text
              style={{
                color: "red",
                textAlign: "center",
                marginTop: 10,
                fontFamily: "Gilroy_Regular",
                fontSize: 16,
              }}
            >
              {`Нет доступного времени для доставки. \nВы можете запланировать доставку на другой день.`}
            </Text>
          </View>
        )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  listItem: {},
  selectedItem: {
    fontFamily: "Gilroy_SemiBold",
    fontSize: 18,
  },
});
