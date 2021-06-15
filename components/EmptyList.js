import {Text, View} from 'react-native';
import React from 'react';

export const EmptyList = ({title}) => {
  return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}><Text>{title}</Text></View>
  )
}
