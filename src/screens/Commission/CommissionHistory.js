import React, { useState, useEffect } from 'react';
import { SIZES, COLORS } from '../../utils/theme';
import { ActivityIndicator, FlatList } from 'react-native';
import Header from '../../components/Header';
import CommissionItem from '../../components/CommissionItem';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import { useFocusEffect } from '@react-navigation/native';
import { useAuthContext } from '../../context/auth/AuthContext';
import { apiGet } from '../../utils/fetcher';
import { captureException } from '@sentry/react-native';

const CommissionHistory = () => {
  const { validateToken } = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [full, setFull] = useState(false);
  const [fullHistory, setFullHistory] = useState([]);
  const [historyCount, setHistoryCount] = useState(null);

  const getCommissionHistory = async (limit, skip) => {
    try {
      const token = await validateToken();
      if (token) {
        const res = await apiGet(
          '/commissions/history',
          { skip: skip, limit: limit },
          token,
          true
        )
          .unauthorized((err) => console.log('unauthorized', err))
          .notFound((err) => console.log('not found', err))
          .timeout((err) => console.log('timeout', err))
          .internalError((err) => console.log('server Error', err))
          .fetchError((err) => console.log('Netwrok error', err))
          .json();
        if (res) {
          setHistoryCount(res.totalDocumentCount);
          setFullHistory((prevState) => [...prevState, ...res.data]);
        }
      }
    } catch (error) {
      captureException(error);
    }
  };
  useFocusEffect(() => {
    (async () => {
      setLoading(true);
      if (fullHistory.length < 1) {
        await getCommissionHistory(10, 0);
      }
      setLoading(false);
    })();
  }, []);

  const handleEndReached = async () => {
    if (fullHistory.length < historyCount) {
      return await getCommissionHistory(10, fullHistory.length);
    }
  };
  return (
    <Block background>
      <Header backTitle="Your Activity" />
      <Block marginVertical={15} paddingHorizontal={SIZES.padding}>
        <Block>
          {loading ? (
            <ActivityIndicator animating size="large" color={COLORS.primary} />
          ) : (
            <FlatList
              data={fullHistory}
              keyExtractor={(item, index) => `item-${index}`}
              renderItem={({ item }) => {
                return (
                  <CommissionItem
                    amount={item.commission}
                    date={item.meta.createdAt}
                  />
                );
              }}
              onEndReached={() => handleEndReached()}
              onEndReachedThreshold={0.5}
            />
          )}
        </Block>
      </Block>
    </Block>
  );
};

export default CommissionHistory;
