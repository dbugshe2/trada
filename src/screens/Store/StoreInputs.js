import React, { useState, useEffect } from 'react';
import { SIZES, COLORS } from '../../utils/theme';
import { Divider, ActivityIndicator } from 'react-native-paper';
import FAB from '../../components/FAB';
import Button from '../../components/primary/Button';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import EmptyState from '../../components/EmptyState';
import { FlatList } from 'react-native';
import { useAuthContext } from '../../context/auth/AuthContext';
import { apiGet } from '../../utils/fetcher';
import { errorMessage } from '../../utils/toast';

const StoreInputs = ({ navigation }) => {
  const { validateToken, logout } = useAuthContext();

  const [myInputs, setMyInputs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyInput = async () => {
    try {
      const token = await validateToken();
      if (token) {
        const res = await apiGet(
          '/transactions/query',
          { serviceType: 'input' },
          token,
          true
        )
          .badRequest((err) => {
            console.log(err.status);
          })
          .unauthorized((err) => {
            console.log(err);
            logout();
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
          setMyInputs(res.data);
        }
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMyInput();
  }, []);

  const renderItem = (props) => (
    <Button
      center
      middle
      radius={4}
      white
      shadow
      marginVertical={SIZES.padding}
      marginHorizontal={SIZES.padding}
      elevation={3}
      row
      height={88}
    >
      <Block paddingHorizontal={SIZES.padding} paddingVertical={SIZES.base}>
        <Block space="between" center middle row>
          <Text mtmedium gray h4>
            Fertilizer NPK
          </Text>
          <Text black mtregular h2>
            N25, 000
          </Text>
        </Block>
        <Divider />
        <Block marginVertical={8} space="between" column>
          <Text mtmedium muted small>
            Pickup Status
          </Text>
          <Text mtmedium gray body>
            Panshi Jos, Monday Jan 09
          </Text>
        </Block>
      </Block>
    </Button>
  );
  if (loading) {
    return (
      <Block center middle>
        <ActivityIndicator color={COLORS.primary} />
      </Block>
    );
  }
  return (
    <Block background>
      {myInputs.length === 0 ? (
        <EmptyState icon="add" text="Buy your Premium Inputs" />
      ) : (
        <Block space="evenly" background>
          <FlatList data={myInputs} renderItem={renderItem} />
        </Block>
      )}

      <FAB
        right={15}
        bottom={35}
        onPress={() => navigation.navigate('BuyInput')}
      />
    </Block>
  );
};

export default StoreInputs;
