import React, { useState, useEffect, useCallback } from 'react';
import { SIZES, COLORS, LINE_HEIGHTS, LETTERSPACING } from '../../utils/theme';
import {
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { CurrencyFormatter } from '../../utils/currency';
import { useFocusEffect } from '@react-navigation/native';
import Button from '../../components/primary/Button';
import ImageIcon from '../../components/primary/ImageIcon';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import CommissionItem from '../../components/CommissionItem';
import { apiGet } from '../../utils/fetcher';
import { captureException } from '@sentry/react-native';
import { useAuthContext } from '../../context/auth/AuthContext';
import { errorMessage } from '../../utils/toast';

const Commission = ({ navigation }) => {
  const { validateToken } = useAuthContext();

  const [loadingBalance, setLoadingBalance] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [history, setHistory] = useState([]);
  const [commissionBalance, setCommissionBalance] = useState(null);
  const [commissionWallet, setCommissionWallet] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     setLoadingBalance(true);
  //     await getCommissionWallet();
  //     setLoadingBalance(false);
  //   })();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        setLoadingBalance(true);
        const response = await getCommissionWallet();
        setLoadingBalance(false);
      }
      fetchData();
    }, [])
  );

  const getCommissionWallet = async () => {
    try {
      const token = await validateToken();
      if (token) {
        const data = await apiGet('/commissions/wallet', {}, token, true)
          .unauthorized((err) => console.log('unauthorized', err))
          .notFound((err) => console.log('not found', err))
          .timeout((err) => console.log('timeout', err))
          .internalError((err) => console.log('server Error', err))
          .fetchError((err) => console.log('Network error', err))
          .json();
        if (data) {
          setCommissionWallet(data.data);
          setCommissionBalance(data.data.balance);
        }
      }
    } catch (error) {
      errorMessage(error.message);
      captureException(error);
    }
  };

  const getRecentCommissionHistory = async (limit) => {
    try {
      const token = await validateToken();
      if (token) {
        const data = await apiGet(
          '/commissions/history',
          { skip: 0, limit: limit },
          token,
          true
        )
          .unauthorized((err) => console.log('unauthorized', err))
          .notFound((err) => console.log('not found', err))
          .timeout((err) => console.log('timeout', err))
          .internalError((err) => console.log('server Error', err))
          .fetchError((err) => console.log('Network error', err))
          .json();
        if (data) {
          setHistory(data.data);
        }
      }
    } catch (error) {
      errorMessage(error.message);
      captureException(error);
    }
  };

  // useEffect(() => {
  //   (async () => {
  //     setLoadingHistory(true);
  //     await getRecentCommissionHistory(10);
  //     setLoadingHistory(false);
  //   })();
  // }, []);

  useFocusEffect(
    useCallback(() => {
      async function fetchData() {
        setLoadingHistory(true);
        await getRecentCommissionHistory(10);
        setLoadingHistory(false);
      }
      fetchData();
    }, [])
  );
  const onRefresh = React.useCallback(() => {
    try {
      setRefreshing(true);
      getRecentCommissionHistory(15);
    } catch (error) {
      captureException(error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <Block background>
      <Header backTitle="Comission Activities" />
      <Block paddingHorizontal={SIZES.padding}>
        <Block flex={0} center middle>
          <Text small muted mtmedium>
            Commision Balance
          </Text>
          {loadingBalance ? (
            <ActivityIndicator size="large" animating color={COLORS.primary} />
          ) : (
            <Text gray height={LINE_HEIGHTS.fourty_1} h1 mtregular>
              {CurrencyFormatter(commissionBalance)}
            </Text>
          )}
        </Block>

        <Block flex={0} marginVertical={30} center>
          <Button
            secondary
            width={138}
            height={35}
            onPress={() => navigation.navigate('CashOut')}
          >
            <Block center space="evenly" row>
              <Text middle body white>
                Cash out
              </Text>
              <ImageIcon name="cashout" />
            </Block>
          </Button>
        </Block>

        <Block flex={0} space="between" row>
          <Text muted mtmedium>
            Your Activity
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('CommissionHistory')}
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
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              showsVerticalScrollIndicator={false}
              data={history}
              keyExtractor={(item, index) => `item-${index}`}
              renderItem={({ item }) => {
                return (
                  <CommissionItem
                    amount={item.commission}
                    date={item.meta.createdAt}
                  />
                );
              }}
            />
          )}
        </Block>
      </Block>
    </Block>
  );
};

export default Commission;
