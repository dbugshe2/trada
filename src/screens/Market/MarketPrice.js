import React, { useState, useEffect } from 'react';

import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import Header from '../../components/Header';
import ImageIcon from '../../components/primary/ImageIcon';
import FAB from '../../components/FAB';
import EmptyState from '../../components/EmptyState';
import { ActivityIndicator, FlatList, RefreshControl } from 'react-native';
import { SIZES, COLORS } from '../../utils/theme';
import { errorMessage } from '../../utils/toast';
import { apiGet } from '../../utils/fetcher';
import { useAuthContext } from '../../context/auth/AuthContext';
import { Divider } from 'react-native-paper';
import { CurrencyFormatter } from '../../utils/currency';
import { captureException } from '@sentry/react-native';

const MarketPrice = ({ navigation }) => {
  // context
  const { validateToken } = useAuthContext();

  const [marketPrices, setMarketPrices] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const renderMarketPrice = ({ item, index }) => (
    <Block
      height={88}
      radius={8}
      white
      shadow
      elevation={8}
      marginHorizontal={SIZES.padding}
      marginVertical={SIZES.padding}
    >
      <Block paddingHorizontal={SIZES.padding} paddingVertical={SIZES.base}>
        <Text h4 mtmedium gray>
          {item.output.outputName}
        </Text>
      </Block>
      <Divider />
      <Block
        row
        space="between"
        paddingHorizontal={SIZES.padding}
        paddingVertical={SIZES.base * 2}
      >
        <Block>
          <Text muted small mtmedium>
            Price Range
          </Text>
          <Text body gray mtmedium>{`${CurrencyFormatter(
            item.minPrice
          )} - ${CurrencyFormatter(item.maxPrice)}`}</Text>
        </Block>
        <Block>
          <Text muted small mtmedium right>
            Location
          </Text>
          <Text right>{`${item.lga}, ${item.state}`}</Text>
        </Block>
      </Block>
    </Block>
  );
  const fetchAllMarketPrices = async () => {
    try {
      const token = await validateToken();
      if (token) {
        const res = await apiGet(
          '/outputs/marketWatch',
          { limit: 30 },
          token,
          true
        )
          .badRequest((err) => {
            console.log(err.status);
          })
          .unauthorized((err) => {
            console.log(err);
          })
          .forbidden((err) => {
            console.log(err.status);
          })
          .notFound((err) => {
            console.log(err.status);
          })
          .timeout((err) => {
            console.log(err.status);
          })
          .internalError((err) => {
            console.log(err);
            errorMessage("Something went wrong, couldn't fetch user detials");
          })
          .fetchError((err) => {
            console.log(err);
            errorMessage('Network Error');
          })
          .json();
        if (res) {
          console.log(res);
          setMarketPrices(res.data);
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllMarketPrices();
  }, []);

  const onRefresh = React.useCallback(() => {
    try {
      setRefreshing(true);
      fetchAllMarketPrices();
    } catch (error) {
      captureException(error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <Block background>
      <Header title="Market Price" />

      {loading ? (
        <Block background center middle>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </Block>
      ) : (
        <Block>
          {marketPrices.length === 0 ? (
            <EmptyState
              icon="market"
              text="Update Daily Market Price & Earn credit points"
            />
          ) : (
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              keyExtractor={(item, index) => `item-${index}`}
              data={marketPrices}
              renderItem={renderMarketPrice}
            />
          )}
        </Block>
      )}

      <FAB
        right={15}
        bottom={35}
        onPress={() => navigation.navigate('PriceUpdate')}
      />
    </Block>
  );
};

export default MarketPrice;
