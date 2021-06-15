import React from "react";
import { Styles } from "../../../assets/Styles";
import { View, Text } from "react-native";
export const DiscountView = ({
  discountPrice,
  normalPrice,
  recomend = false,
}) => {
  return (
    <View
      style={
        recomend ? Styles.recomendLabelWrapper : Styles.discountLabelWrapper
      }
    >
      {recomend && <View style={Styles.tryangleLabelRecomend}></View>}
      <View style={recomend ? Styles.recomendLabel : Styles.discoundLabel}>
        {recomend ? (
          <Text style={Styles.discoundLabelTitle}>Рекомендуем</Text>
        ) : (
          <Text style={Styles.discoundLabelTitle}>
            -{(100 - (100 * discountPrice) / normalPrice).toFixed()} %
          </Text>
        )}
      </View>
      {!recomend && <View style={Styles.tryangleLabel}></View>}
    </View>
  );
};
