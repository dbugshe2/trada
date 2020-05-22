import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import EmptyState from '../../components/EmptyState';
import FAB from '../../components/FAB';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import { useAuthContext } from '../../context/auth/AuthContext';
import { apiGet } from '../../utils/fetcher';
import { SIZES, LETTERSPACING } from '../../utils/theme';
import { Image, StyleSheet } from 'react-native';
import { Divider } from 'react-native-paper';
import Button from '../../components/primary/Button';
import { captureException } from '@sentry/react-native';

const Farmers = ({ navigation }) => {
  const { validateToken } = useAuthContext();
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  async function fetchFarmers() {
    const token = await validateToken();
    if (token) {
      const res = await apiGet('/farmers', { skip: 0, limit: 10 }, token, true)
        .unauthorized((err) => console.log('unauthorized', err))
        .notFound((err) => console.log('not found', err))
        .timeout((err) => console.log('timeout', err))
        .internalError((err) => console.log('server Error', err))
        .fetchError((err) => console.log('Network error', err))
        .json();

      if (res) {
        setFarmers(res.data);
      }
      setLoading(false);
    }
  }

  const RenderFarmers = ({ item }) => (
    <Button
      transparent
      height={58}
      onPress={() =>
        navigation.navigate('FarmerSummary', { farmer: JSON.stringify(item) })
      }
    >
      <Block
        row
        space="between"
        paddingTop={SIZES.padding}
        marginVertical={SIZES.base}
      >
        <Block center>
          <Image
            source={{
              uri:
                (item.farmerImage && item.farmerImage) ||
                'https://via.placeholder.com/40?text="No Image"',
            }}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ width: 44, height: 44, borderRadius: 44 }}
          />
        </Block>
        <Block flex={2}>
          <Text
            mtmedium
            body
            gray
          >{` ${item.firstName} ${item.lastName}`}</Text>
          <Text muted mtmedium small>{` ${item.lga} ${item.state}`}</Text>
        </Block>
        <Block center middle>
          <Text primary mtmedium body spacing={LETTERSPACING.point_4}>
            +10 point
          </Text>
        </Block>
      </Block>
      <Divider
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          alignSelf: 'center',
          width: '90%',
        }}
      />
    </Button>
  );

  useEffect(() => {
    fetchFarmers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onRefresh = React.useCallback(() => {
    try {
      setRefreshing(true);
      fetchFarmers();
    } catch (error) {
      captureException(error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshing]);

  return (
    <Block background>
      <Header backTitle="Farmer Activities" />
      {loading || farmers.length < 1 ? (
        <EmptyState
          text={`Onboard Farmers in your
             location and earn commissions`}
          icon="market"
          loading={loading}
        />
      ) : (
        <Block height={'100%'} flex={1}>
          <FlatList
            style={{ flex: 1, paddingHorizontal: SIZES.padding }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            data={farmers}
            keyExtractor={(item, index) => `item-${index}`}
            renderItem={RenderFarmers}
            showsVerticalScrollIndicator={false}
          />
        </Block>
      )}

      <FAB
        name="addFarmer"
        right={15}
        bottom={35}
        onPress={() => navigation.navigate('AddFarmer')}
      />
    </Block>
  );
};

export default Farmers;
