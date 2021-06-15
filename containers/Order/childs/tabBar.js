import React from 'react';
import { Text, View } from 'react-native';
import {TabBar} from 'react-native-tab-view';
import {main_color} from '../../../assets/Styles';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export const renderTabBar = props => (
    <TabBar
        {...props}
        indicatorStyle={{ backgroundColor: main_color, bottom: -3, height: 1, width: 0.5}}
        style={{ backgroundColor: 'transparent', elevation: 0 }}
        tabStyle={{width: 'auto',paddingVertical: 0, paddingHorizontal: 0}}
        scrollEnabled={true}
        pressColor={'transparent'}
        activeColor={'green'}
        onTabPress={() => {
          console.log('press');
        }}
        renderLabel={({route, focused}) => {
          return (
              <View style={{
                position: 'relative',
                width: 180,
                height: 60,
                paddingHorizontal: 10,
                flex: 1,
                backgroundColor: focused ? main_color : 'transparent',
                justifyContent: 'center',
                alignItems: 'center',
                borderRightWidth: 1,
                borderColor: focused ? main_color : '#c2c2c2',
                borderTopWidth: 1,
                borderBottomWidth: 1,
                marginLeft: focused ? -1 : 0,
                marginRight: -2
              }}>
                {focused && <MaterialCommunityIcons name="triangle" size={16} color="#fff" style={{
                  position: 'absolute',
                  bottom: 0,
                  marginBottom: -5
                }} />}
                <Text style={{
                  color: focused ? '#fff' : '#000',
                  fontFamily: 'Gilroy_SemiBold',
                  fontSize: 16
                }}>{route.title}</Text>
              </View>
          )
        }}
    />
);
