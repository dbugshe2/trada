import React, { useState, useCallback, useEffect } from 'react';
import { SIZES, COLORS, LINE_HEIGHTS, LETTERSPACING } from '../../utils/theme';
import { useAuthContext } from '../../context/auth/AuthContext';
import { ActivityIndicator, RefreshControl } from 'react-native';
import { CurrencyFormatter } from '../../utils/currency';
import Swiper from '../../components/Swiper';
import Button from '../../components/primary/Button';
import ImageIcon from '../../components/primary/ImageIcon';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import { saveToClipboard } from '../../utils/clipboard';
import { useFocusEffect } from '@react-navigation/native';
import { captureException } from '@sentry/react-native';
import { apiGet } from '../../utils/fetcher';
import { errorMessage, successMessage } from '../../utils/toast';

const Home = ({ navigation }) => {
  const { validateToken, logout } = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefeshing] = useState(false);
  const [user, setUser] = useState(null);

  const handleCopy = async () => {
    await saveToClipboard(user.data.wallet.accountNumber);
    successMessage(`${user.data.wallet.accountNumber} copied`);
  };

  const refreshUserDetails = async () => {
    try {
      setLoading(true);
      const token = await validateToken();
      if (token) {
        const res = await apiGet('/users/find', {}, token, true)
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
          setUser(res);
        } else {
          console.log('failed to update user details');
        }
      }
    } catch (error) {
      captureException(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUserDetails();
  }, []);

  const onRefresh = React.useCallback(() => {
    try {
      setRefeshing(true);
      refreshUserDetails();
    } catch (error) {
      console.log(error);
      captureException(error);
    } finally {
      setRefeshing(false);
    }
  }, [refreshing]);

  return (
    <Block background>
      <Header main shadow />
      {loading ? (
        <Block center middle>
          <ActivityIndicator color={COLORS.primary} size="large" />
        </Block>
      ) : (
        <Block
          flex={1}
          scroll
          horizontal={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          <Block paddingTop={SIZES.padding} paddingBottom={SIZES.padding * 2}>
            {user !== null && typeof user !== 'undefined' ? (
              <Swiper showPagination>
                {/* one */}
                <Block center middle width={SIZES.width}>
                  <Text small muted mtmedium>
                    Tmoni Wallet Balance
                  </Text>
                  <Text gray height={LINE_HEIGHTS.fourty_1} h1 mtregular>
                    {CurrencyFormatter(user.data.wallet.balance)}
                  </Text>

                  <Block
                    marginTop={SIZES.padding}
                    lightgray
                    center
                    radius={5}
                    height={30}
                    paddingHorizontal={SIZES.padding}
                    row
                  >
                    <Text primary mtlight small marginHorizontal={SIZES.base}>
                      {user.data.wallet.bankName}
                    </Text>
                    <Text
                      muted
                      mtlight
                      small
                      spacing={LETTERSPACING.two_point_4}
                    >
                      {user.data.wallet.accountNumber}
                    </Text>

                    <Button
                      onPress={() => handleCopy()}
                      transparent
                      paddingHorizontal={SIZES.padding}
                    >
                      <ImageIcon name="copy" />
                    </Button>
                  </Block>
                </Block>

                <Block center middle width={SIZES.width}>
                  <Text small muted mtmedium>
                    Commission Balance
                  </Text>
                  <Text gray height={LINE_HEIGHTS.fourty_1} h1 mtregular>
                    {CurrencyFormatter(user.data.commissionWallet.balance)}
                  </Text>
                  <Block
                    marginTop={SIZES.padding}
                    lightgray
                    center
                    radius={5}
                    height={30}
                    paddingHorizontal={SIZES.padding}
                    row
                  >
                    <Text primary mtlight small marginHorizontal={SIZES.base}>
                      {user.data.wallet.bankName}
                    </Text>
                    <Text
                      muted
                      mtlight
                      small
                      spacing={LETTERSPACING.two_point_4}
                    >
                      {user.data.wallet.accountNumber}
                    </Text>

                    <Button
                      onPress={() => handleCopy()}
                      transparent
                      paddingHorizontal={SIZES.padding}
                    >
                      <ImageIcon name="copy" />
                    </Button>
                  </Block>
                </Block>
              </Swiper>
            ) : (
              <Text center mtmedium grey>
                Unable to fetch Wallet, pull down to retry
              </Text>
            )}
          </Block>
          <Block flex={3} paddingHorizontal={SIZES.padding}>
            {/* two */}
            <Block>
              <Block
                space="evenly"
                row
                center
                paddingTop={30}
                paddingHorizontal={SIZES.padding * 2}
              >
                <Button
                  center
                  middle
                  height={50}
                  width={100}
                  odd
                  onPress={() => navigation.navigate('TransferOptions')}
                >
                  <Block middle center row>
                    <ImageIcon style={{}} name="sentAlt" />

                    <Text mtmedium gray marginLeft={8}>
                      Send
                    </Text>
                  </Block>
                </Button>

                <Button
                  center
                  middle
                  height={50}
                  width={100}
                  odd
                  onPress={() => navigation.navigate('AddCash')}
                >
                  <Block middle center row>
                    <ImageIcon name="recievedAlt" />

                    <Text mtmedium gray marginLeft={8}>
                      Recieve
                    </Text>
                  </Block>
                </Button>
              </Block>
            </Block>

            {/* three */}
            <Block marginVertical={35}>
              <Button
                center
                middle
                radius={8}
                white
                shadow
                elevation={10}
                row
                height={150}
                onPress={() =>
                  navigation.navigate('Store', { screen: 'MyInputs' })
                }
              >
                <Block
                  paddingHorizontal={SIZES.padding}
                  paddingVertical={SIZES.padding * 2}
                  middle
                  row
                  center
                >
                  <Block column>
                    <Text gray mtregular h2>
                      Buy your inputs
                    </Text>
                    <Text left muted body>
                      Get inputs from leading agro companies Across the world at
                      guaranteed lowest price
                    </Text>
                  </Block>
                  <ImageIcon name="cart" />
                </Block>
              </Button>

              <Button
                marginVertical={25}
                center
                middle
                radius={8}
                white
                shadow
                elevation={10}
                row
                height={150}
                onPress={() =>
                  navigation.navigate('Store', { screen: 'MyOutputs' })
                }
              >
                <Block
                  paddingHorizontal={SIZES.padding}
                  paddingVertical={SIZES.padding * 2}
                  middle
                  row
                  center
                >
                  <Block column>
                    <Text gray mtregular h2>
                      Sell your Outputs
                    </Text>
                    <Text left muted body>
                      Get inputs from leading agro companies Across the world at
                      guaranteed lowest price
                    </Text>
                  </Block>
                  <ImageIcon name="basket" />
                </Block>
              </Button>
            </Block>
          </Block>
        </Block>
      )}
    </Block>
  );
};

export default Home;
