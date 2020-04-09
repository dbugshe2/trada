import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import EmptyState from '../../components/EmptyState';
import FAB from '../../components/FAB';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import { useAuthContext } from '../../context/auth/AuthContext';
import { apiGet } from '../../utils/fetcher';
import { SIZES } from '../../utils/theme';

const Farmers = ({ navigation }) => {
  const { validateToken, phone } = useAuthContext();
  const [farmers, setFarmers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchFamrers() {
      const phoneFormat = phone.replace('+234', '0');
      const token = await validateToken();
      if (token) {
        console.log(token);
        const res = await apiGet(
          '/farmers',
          { skip: 0, limit: 10, phone: phoneFormat },
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
          console.log(res);
          setFarmers(res.data);
        }
        setLoading(false);
      }
    }

    fetchFamrers();
  }, []);

  const RenderFarmers = ({ item }) => (
    <Block row space="between">
      <Block center>{/* // <Image source={} /> */}</Block>
      <Block flex={2}>
        <Text>name</Text>
        <Text>name</Text>
      </Block>
      <Block>
        <Text primary>name</Text>
      </Block>
    </Block>
  );

  return (
    <Block background>
      <Header backTitle="Farmer Activities" />
      {loading || farmers.length < 1 ? (
        <EmptyState
          text={`Onboard Farmers in your
             location and earn commissions`}
          icon="logo"
          loading={loading}
        />
      ) : (
        <Block paddingHorizontal={SIZES.padding}>
          <FlatList
            data={farmers}
            keyExtractor={(item, index) => `item-${index}`}
            renderItem={RenderFarmers}
          />
        </Block>
      )}

      <FAB
        right={15}
        bottom={35}
        onPress={() => navigation.navigate('AddFarmer')}
      />
    </Block>
  );
};

export default Farmers;
