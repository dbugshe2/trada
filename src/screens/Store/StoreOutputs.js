import React, { useEffect, useState } from 'react';
import { SIZES, COLORS, LINE_HEIGHTS } from '../../utils/theme';
import { Divider } from 'react-native-paper';
import FAB from '../../components/FAB';
import Button from '../../components/primary/Button';
import ImageIcon from '../../components/primary/ImageIcon';
import Text from '../../components/primary/Text';
import Block from '../../components/primary/Block';
import { useAuthContext } from '../../context/auth/AuthContext';
import { apiGet } from '../../utils/fetcher';
import { captureException } from '@sentry/react-native';
import { errorMessage } from '../../utils/toast';
import {
  ActivityIndicator,
  RefreshControl,
  Image,
  FlatList,
} from 'react-native';
import { CurrencyFormatter } from '../../utils/currency';
import moment from 'moment';
import EmptyState from '../../components/EmptyState';
const StoreOutputs = ({ navigation }) => {
  // context
  const { validateToken } = useAuthContext();

  // state
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // handlers
  const filterOutput = () => {};

  // render functions
  const renderOutput = ({ item, index }) => (
    <Button
      center
      middle
      radius={8}
      white
      shadow
      elevation={8}
      row
      height={134}
      marginVertical={SIZES.padding}
      marginHorizontal={SIZES.padding}
      onPress={() =>
        navigation.navigate('StoreItemSummary', {
          outputItem: JSON.stringify(item),
        })
      }
    >
      <Block
        column
        paddingHorizontal={SIZES.padding}
        paddingVertical={SIZES.base}
      >
        <Block marginBottom={25} middle row>
          <Block space="between">
            <Text mtregular black h2>
              {CurrencyFormatter(item.amount)}
            </Text>
            <Text mtmedium gray h4>
              {item.outputName && item.outputName}
            </Text>
          </Block>
          <Image
            source={{ uri: item.outputImageUrl }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ height: 60, width: 67 }}
            name="riceBag"
          />
        </Block>
        <Divider />
        <Block marginVertical={10} space="between" column>
          <Text mtmedium muted small height={LINE_HEIGHTS.twenty}>
            Delivery Status
          </Text>
          <Text mtmedium gray body height={LINE_HEIGHTS.twenty}>
            {`${item.lga}, ${item.state}, ${moment(item.initiatedAt).format(
              'Do MMM YYYY'
            )}`}
          </Text>
        </Block>
      </Block>
    </Button>
  );
  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const token = await validateToken();

      const res = await apiGet(
        '/transactions/query',
        { serviceType: 'output' },
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
          errorMessage('Something went wrong, try again later');
        })
        .fetchError((err) => {
          console.log(err);
          errorMessage('Network Error');
        })
        .json();
      if (res) {
        setTransactions(res.data);
        filterOutput();
      }
    } catch (error) {
      captureException(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTransactions();
  }, []);

  const onRefresh = React.useCallback(() => {
    try {
      setRefreshing(true);
      fetchTransactions();
    } catch (error) {
      captureException(error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshing]);

  if (loading) {
    return (
      <Block center middle>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </Block>
    );
  }

  return (
    <Block background>
      {transactions.lenght === 0 ? (
        <EmptyState icon="market" text="Sell your Farm Output" />
      ) : (
        <Block background>
          <Block flex={2}>
            <FlatList
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              keyExtractor={(item, index) => `item-${index}`}
              data={transactions}
              renderItem={renderOutput}
            />
          </Block>
        </Block>
      )}
      <FAB
        right={15}
        bottom={35}
        onPress={() => navigation.navigate('SellOutput')}
      />
    </Block>
  );
};

export default StoreOutputs;
