import React, { useState, useEffect, useCallback } from 'react';
import { SIZES, COLORS, LINE_HEIGHTS, LETTERSPACING } from '../../utils/theme';
import { TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
// import {
//   useCommissionContext,
// } from "../../context/commission/CommissionContext";
import { CurrencyFormatter } from '../../utils/currency';
import { useFocusEffect } from '@react-navigation/native';
import Button from '../../components/primary/Button';
import ImageIcon from '../../components/primary/ImageIcon';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import CommissionItem from '../../components/CommissionItem';

const Commission = ({ navigation }) => {
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // const commission = useCommissionContext();
  // const {
  //   getCommissionWallet,
  //   getRecentCommissionHistory,
  //   history,
  //   commissionBalance,
  // } = commission;

  // useEffect(() => {
  //   (async () => {
  //     setLoadingBalance(true);
  //     await getCommissionWallet();
  //     setLoadingBalance(false);
  //   })();
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     async function fetchData() {
  //       setLoadingBalance(true);
  //       const response = await getCommissionWallet();
  //       setLoadingBalance(false);
  //     }
  //     fetchData();
  //   }, [])
  // );

  // useEffect(() => {
  //   (async () => {
  //     setLoadingHistory(true);
  //     await getRecentCommissionHistory(10);
  //     setLoadingHistory(false);
  //   })();
  //   return setLoadingHistory(true);
  // }, []);

  // useFocusEffect(
  //   useCallback(() => {
  //     async function fetchData() {
  //       setLoadingHistory(true);
  //       await getRecentCommissionHistory(10);
  //       setLoadingHistory(false);
  //     }
  //     fetchData();
  //   }, [])
  // );
  return (
    <Block background>
      <Header backTitle='Comission Activities' />
      <Block paddingHorizontal={SIZES.padding}>
        <Block flex={0} center middle>
          <Text small muted mtmedium>
            Commision Balance
          </Text>
          {loadingBalance ? (
            <ActivityIndicator size='large' animating color={COLORS.primary} />
          ) : (
            <Text gray height={LINE_HEIGHTS.fourty_1} h1 mtregular>
              {/* {CurrencyFormatter(commissionBalance)} */}
            </Text>
          )}
        </Block>

        <Block flex={0} marginVertical={30} center>
          <Button secondary width={138} height={35} onPress={() => navigation.navigate('CashOut')}>
            <Block center space='evenly' row>
              <Text middle body white>
                Cash out
              </Text>
              <ImageIcon name='cashout' />
            </Block>
          </Button>
        </Block>

        <Block flex={0} space='between' row>
          <Text muted mtmedium>
            Your Activity
          </Text>
          <TouchableOpacity
          // onPress={() => navigation.navigate("CommissionHistory")}
          >
            <Text secondary mtmedium>
              View All
            </Text>
          </TouchableOpacity>
        </Block>

        <Block>
          {loadingHistory ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              showsVerticalScrollIndicator={false}
              data={[]}
              keyExtractor={(item, index) => `item-${index}`}
              renderItem={({ item }) => {
                return <CommissionItem amount={item.commission} date={item.meta.createdAt} />;
              }}
            />
          )}
        </Block>
      </Block>
    </Block>
  );
};

export default Commission;
