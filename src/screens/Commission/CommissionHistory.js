import React, { useState, useEffect } from 'react';
import { SIZES, COLORS } from '../../utils/theme';
import { useCommissionContext } from '../../context/commission/CommissionContext';
import { ActivityIndicator, FlatList } from 'react-native';
import Header from '../../components/Header';
import CommissionItem from '../../components/CommissionItem';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import { useFocusEffect } from '@react-navigation/native';

const CommissionHistory = () => {
  const [loading, setLoading] = useState(true);
  const [full, setFull] = useState(false);

  const {
    getCommissionHistory,
    fullHistory,
    historyCount,
  } = useCommissionContext();

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
