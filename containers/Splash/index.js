import {Image, View} from 'react-native';
import React from 'react';
import {Styles} from '../../assets/Styles';

export const Splash = () => {
  return (
        <View style={Styles.splash}>
          <Image source={require('../../assets/splash.png')} style={Styles.splash__logo} />
        </View>
  )
}
