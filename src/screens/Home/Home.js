import React, { useState } from 'react';
import { SIZES, COLORS, LINE_HEIGHTS, LETTERSPACING } from '../../utils/theme';
// import AuthProvider, {
//   AuthContext,
//   CommissionContext,
//   useAuthContext
// } from "../../context";
import { ActivityIndicator } from 'react-native-paper';
import { CurrencyFormatter } from '../../utils/currency';
import Swiper from '../../components/Swiper';
import Button from '../../components/primary/Button';
import ImageIcon from '../../components/primary/ImageIcon';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import { decode } from '../../utils/token';
import { saveToClipboard } from '../../utils/clipboard';

const Home = ({ navigation }) => {
  // const auth = useAuthContext();

  // const { userDetails } = auth;

  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');

  const handleCopy = async () => {
    console.log('copy clicked');
    // await saveToClipboard(userDetails.wallet.accountNumber);
    console.log('copied');
    // setMessage(`${userDetails.wallet.accountNumber} copied!`);
  };

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
            <Text gray height={LINE_HEIGHTS.fourty_1} h1 mtregular>
              {/* {CurrencyFormatter(userDetails.wallet.balance)} */}
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
                {/* {userDetails.wallet.bankName} */}
              </Text>
              <Text muted mtlight small spacing={LETTERSPACING.two_point_4}>
                {/* {userDetails.wallet.accountNumber} */}
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
              {/* {CurrencyFormatter(userDetails.commissionWallet.balance)} */}
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
                {/* {userDetails.wallet.bankName} */}
              </Text>
              <Text muted mtlight small spacing={LETTERSPACING.two_point_4}>
                {/* {userDetails.wallet.accountNumber} */}
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
      </Block>
      {/* card */}
      <Text mtmedium secondary tiny center>
        {message}
      </Text>
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
