import React, { useContext, useMemo } from "react";
import { View, Text } from "react-native";
import { AppContext } from "../../../context/app/AppContext";
import { API_BACK_URL } from "../../../dist/consts";
import { Slider } from "./Slider";
import * as Linking from "expo-linking";

export const Banners = () => {
  const {
    settings: { bannerList },
  } = useContext(AppContext);
  // console.log(bannerList);
  return (
    <View>
      <Slider
        autoplay
        circleLoop
        paginationBoxVerticalPadding={20}
        images={bannerList.map((item) => `${API_BACK_URL}${item.src}`)}
        onCurrentImagePressed={(item) =>
          bannerList[item]?.adsURL
            ? Linking.openURL(bannerList[item].adsURL)
            : null
        }
        sliderBoxHeight={110}
        paginationDot={false}
        ImageComponentStyle={{
          borderRadius: 15,
          width: "85%",
          marginVertical: 5,
          resizeMode: "contain",
        }}
      />
    </View>
  );
};
