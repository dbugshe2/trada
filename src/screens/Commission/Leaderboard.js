import React, { useState, useEffect } from 'react';
import { SIZES } from '../../utils/theme';
import LeaderboardItem from '../../components/LeaderboardItem';
import Header from '../../components/Header';
import ImageIcon from '../../components/primary/ImageIcon';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import { FlatList } from 'react-native';
import { captureException } from 'sentry-expo';
import { apiGet } from '../../utils/fetcher';
import { ActivityIndicator } from 'react-native';
import { useAuthContext } from '../../context/auth/AuthContext';
import Button from '../../components/primary/Button';

const Leaderboard = () => {
  const { validateToken } = useAuthContext();

  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCommissionsLeaderBoard = async (skip, limit) => {
    try {
      setLoading(true);
      const token = await validateToken();
      if (token) {
        const res = await apiGet(
          '/commissions/leaderboard',
          { skip: skip, limit: limit },
          token,
          true
        )
          .unauthorized((err) => console.log('unauthorized', err))
          .notFound((err) => console.log('not found', err))
          .timeout((err) => console.log('timeout', err))
          .internalError((err) => console.log('server Error', err))
          .fetchError((err) => console.log('Netwrok error', err))
          .json();
        console.log(res);
        if (res) {
          setLeaderboard(res.data);
        }
      }
    } catch (error) {
      captureException(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCommissionsLeaderBoard();
  }, []);
  return (
    <Block background>
      <Header title="LeaderBoard" />
      {/* <Block
        row
        flex={0}
        height={80}
        space="between"
        paddingHorizontal={SIZES.padding}
        botttom
        right
      >
        <Text primary mtmedium boody>
          Credit Earned
        </Text>
        <Button muted height={26} >
          <Text gray mtmedium>
            100
          </Text>
        </Button>
      </Block>
       */}
      <Block paddingHorizontal={SIZES.padding}>
        <Block flex middle>
          {loading ? (
            <Block center middle>
              <ActivityIndicator />
            </Block>
          ) : (
            <FlatList
              data={leaderboard}
              keyExtractor={(item, index) => `item-${index}`}
              renderItem={({ item, index }) => {
                return (
                  <LeaderboardItem
                    id={index + 1}
                    name={item.user}
                    coins={item.commissionEarned}
                  />
                );
              }}
            />
          )}
        </Block>
      </Block>
    </Block>
  );
};

export default Leaderboard;
