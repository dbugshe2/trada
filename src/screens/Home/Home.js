import React, { useState, useCallback, useEffect } from 'react';
import { SIZES, COLORS, LINE_HEIGHTS, LETTERSPACING } from '../../utils/theme';
import { useAuthContext } from '../../context/auth/AuthContext';
import { ActivityIndicator } from 'react-native-paper';
import { CurrencyFormatter } from '../../utils/currency';
import Swiper from '../../components/Swiper';
import Button from '../../components/primary/Button';
import ImageIcon from '../../components/primary/ImageIcon';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import { saveToClipboard } from '../../utils/clipboard';
import { useFocusEffect } from '@react-navigation/native';
import { captureException } from 'sentry-expo';
import { toast, errorMessage } from '../../utils/toast';
import { apiGet } from '../../utils/fetcher';
import { getUser } from '../../utils/asyncstorage';

const Home = ({ navigation }) => {
  const { validateToken } = useAuthContext();

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const handleCopy = async () => {
    await saveToClipboard(user.data.wallet.accountNumber);
    toast(`${user.data.wallet.accountNumber} copied`);
  };

  useEffect(() => {
    const refreshUserDetails = async () => {
      setLoading(true);
      const token = await validateToken();
      if (token) {
        const userRes = await apiGet('/users/find', {}, token, true).json();
        if (userRes !== null) {
          console.log(userRes);
          setUser(userRes);
        } else {
          errorMessage('unable to fetch user details');
        }
        setLoading(false);
      }
    };
    refreshUserDetails();
  }, [validateToken]);

  return (
    <Block scroll background>
      <Header main shadow />
      <Block paddingTop={SIZES.padding} paddingBottom={SIZES.padding * 2}>
        <Swiper showPagination>
          {/* one */}
          <Block center middle width={SIZES.width}>
            <Text small muted mtmedium>
              Tmoni Wallet Balance
            </Text>
            {loading ? (
              <ActivityIndicator color={COLORS.primary} size="small" />
            ) : (
              <>
                <Text gray height={LINE_HEIGHTS.fourty_1} h1 mtregular>
                  {CurrencyFormatter(user.data.wallet.balance)}
                </Text>
              </>
            )}

            <Block
              marginTop={SIZES.padding}
              lightgray
              center
              radius={5}
              height={30}
              paddingHorizontal={SIZES.padding}
              row
            >
              {loading ? (
                <ActivityIndicator color={COLORS.primary} size="small" />
              ) : (
                <>
                  <Text primary mtlight small marginHorizontal={SIZES.base}>
                    {user.data.wallet.bankName}
                  </Text>
                  <Text muted mtlight small spacing={LETTERSPACING.two_point_4}>
                    {user.data.wallet.accountNumber}
                  </Text>
                  <Button
                    onPress={() => handleCopy()}
                    transparent
                    paddingHorizontal={SIZES.padding}
                  >
                    <ImageIcon name="copy" />
                  </Button>
                </>
              )}
            </Block>
          </Block>

          <Block center middle width={SIZES.width}>
            <Text small muted mtmedium>
              Commission Balance
            </Text>
            {loading ? (
              <ActivityIndicator color={COLORS.primary} size="small" />
            ) : (
              <>
                <Text gray height={LINE_HEIGHTS.fourty_1} h1 mtregular>
                  {CurrencyFormatter(user.data.commissionWallet.balance)}
                </Text>
              </>
            )}
            <Block
              marginTop={SIZES.padding}
              lightgray
              center
              radius={5}
              height={30}
              paddingHorizontal={SIZES.padding}
              row
            >
              {loading ? (
                <ActivityIndicator color={COLORS.primary} size="small" />
              ) : (
                <>
                  <Text primary mtlight small marginHorizontal={SIZES.base}>
                    {user.data.wallet.bankName}
                  </Text>
                  <Text muted mtlight small spacing={LETTERSPACING.two_point_4}>
                    {user.data.wallet.accountNumber}
                  </Text>
                  <Button
                    onPress={() => handleCopy()}
                    transparent
                    paddingHorizontal={SIZES.padding}
                  >
                    <ImageIcon name="copy" />
                  </Button>
                </>
              )}
            </Block>
          </Block>
        </Swiper>
      </Block>
      {/* card */}
      <Block space="evenly" paddingHorizontal={SIZES.padding}>
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
              navigation.navigate('Store', { screen: 'BuyInputs' })
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
              navigation.navigate('Store', { screen: 'SellOutputs' })
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
  );
};

export default Home;
