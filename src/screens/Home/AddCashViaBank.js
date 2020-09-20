import React, { useState } from 'react';
import { SIZES, COLORS } from '../../utils/theme';
import { useAuthContext } from '../../context/auth/AuthContext';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import { ActivityIndicator } from 'react-native';
import { getUser } from '../../utils/asyncstorage';

const AddCashViaBank = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    const res = await getUser();
    console.log(res);
    setUserDetails(await JSON.parse(res));
  };
  React.useEffect(() => {
    setLoading(true);
    fetchUser();
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <Block background middle center>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </Block>
    );
  }

  return (
    <Block background>
      <Block
        scroll
        marginVertical={60}
        marginHorizontal={30}
        paddingHorizontal={SIZES.padding}
      >
        <Text muted>
          Make a bank transfer into the following account to fund your Trada
          wallet
        </Text>
        {userDetails ? (
          <Block marginVertical={50}>
            <Block>
              <Text gray h6 mtmedium>
                ACCOUNT NAME
              </Text>
              <Text primary small mtmedium>
                {userDetails.wallet.accountName}
              </Text>
            </Block>

            <Block marginVertical={20}>
              <Text gray h6 mtmedium>
                ACCOUNT NUMBER
              </Text>
              <Text primary small mtmedium>
                {userDetails.wallet.accountNumber}
              </Text>
            </Block>

            <Block>
              <Text gray h6 mtmedium>
                BANK NAME
              </Text>
              <Text primary small mtmedium>
                {userDetails.wallet.bankName}
              </Text>
            </Block>
          </Block>
        ) : (
          <Block background center middle>
            <Text center h2 muted mtmedium>
              Unable to fetch Bank details, Try Again later
            </Text>
          </Block>
        )}
      </Block>
    </Block>
  );
};

export default AddCashViaBank;
