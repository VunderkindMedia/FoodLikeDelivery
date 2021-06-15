import {ModalContainer} from '../../components/ModalContainer';
import React, { useContext, useState, useMemo, useEffect } from 'react';
import {StyleSheet, Text, useWindowDimensions} from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import {AppContext} from '../../context/app/AppContext';
import { TimesList } from './childs/TimesList';
import {CHECK_ADRESS, INPUT_TITLE_NAME} from '../../dist/strings';
import {renderTabBar} from './childs/tabBar';
import {AppButton} from '../../components/AppButton';

export const DateTimeDelivery = ({navigation}) => {
  const layout = useWindowDimensions();


  const { deliveryDates,deliveryTimeList, setCheckedTime, checked_time } = useContext(AppContext);
  const [index, setIndex] = useState(checked_time.date !== null && checked_time.date || 0);

  const sceneObject = useMemo(() => {
    const tempObject = {};
    deliveryDates.forEach((item, index) => {
      tempObject[item.key] = () => <TimesList dateIndex={index} onChangeValue={(date, time) => {
        setCheckedTime(date, time).then()
      }} />
    })
    return tempObject;
  }, [deliveryDates]);

  const renderScene = useMemo(() => {
    return SceneMap(sceneObject);
  }, [deliveryDates]);

  const routes = useMemo(() => {
    return deliveryDates;
  }, [deliveryDates])
  return (
      <ModalContainer
          topOffset={70}
          navigation={navigation}
          title={'Дата и время доставки'}
      >
        <Text style={styles.subtitle}>{'Выберите время для осуществления доставки'}</Text>

        <TabView
            lazy={true}
            lazyPreloadDistance={7}
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: layout.width }}
            renderTabBar={renderTabBar}
        />
        {checked_time.date !== null && <Text style={{
          fontFamily: 'Gilroy_Regular',
          fontSize: 16,
          textAlign: 'center',
          marginBottom: 10
        }}>Выбранная дата и время доставки:
            <Text style={{ fontFamily: 'Gilroy_SemiBold'}}>
            {' ' + deliveryDates[checked_time.date].title} {'(' + deliveryTimeList[checked_time.time].title + ')'}
            </Text>
        </Text>}
        <AppButton
          title={'Сохранить выбранное время'}
          style={{ position: 'relative', marginBottom: 15, marginHorizontal: 15}}
          pressHandler={() => {
            navigation.goBack()
          }}
        />

      </ModalContainer>
  )
}

const styles = StyleSheet.create({
  subtitle: {
    fontFamily: 'Gilroy_Regular',
    fontSize: 16,
    color: '#c7c7c7',
    marginHorizontal: 20,
    marginBottom: 15
  }
})

