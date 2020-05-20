/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import { SIZES } from '../../utils/theme';
import LeaderboardItem from '../../components/LeaderboardItem';
import Header from '../../components/Header';
import ImageIcon from '../../components/primary/ImageIcon';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import { FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { captureException } from '@sentry/react-native';
import { apiGet } from '../../utils/fetcher';
import { useAuthContext } from '../../context/auth/AuthContext';
import { COLORS } from '../../utils/theme';
import Button from '../../components/primary/Button';
import { getUser } from '../../utils/asyncstorage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Leaderboard = () => {
  const { validateToken } = useAuthContext();

  const loadUser = async () => {
    setCurUser(JSON.parse(await getUser()));
  };

  const [leaderboard, setLeaderboard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showUserCredits, setShowUserCredits] = useState(false);
  const [userCredits, setUserCredits] = useState(0);
  const [curUser, setCurUser] = useState(null);

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
        if (res) {
          await loadUser();
          console.log(res);
          let leaderboardData = res.data;
          leaderboardData.sort(function (user1, user2) {
            // Sort by earning
            // If the first item has a higher number, move it down
            // If the first item has a lower number, move it up
            if (user1.earning > user2.earning) {
              return -1;
            }
            if (user1.earning < user2.earning) {
              return 1;
            }
          });
          setLeaderboard(leaderboardData);
        }
      }
    } catch (error) {
      captureException(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCommissionsLeaderBoard(0, 100);
  }, []);

  const onRefresh = React.useCallback(() => {
    try {
      setRefreshing(true);
      getCommissionsLeaderBoard(0, 50);
    } catch (error) {
      captureException(error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshing]);

  if (loading) {
    return (
      <Block background center middle>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </Block>
    );
  }
  return (
    <Block background>
      <Header title="LeaderBoard" />
      <Block
        row
        flex={0}
        style={{
          borderBottomWidth: 3,
          borderColor: COLORS.lightgray,
        }}
        paddingHorizontal={SIZES.padding}
        paddingTop={SIZES.padding * 2}
        space="between"
      >
        <Text primary mtmedium body>
          Credit Earned
        </Text>

        <Button height={26} inactive>
          <Block row space="evenly" paddingHorizontal={SIZES.base * 2}>
            <Text mtmedium gray body marginHorizontal={SIZES.base * 2}>
              {userCredits} credits
            </Text>
            <Ionicons
              size={24}
              color={COLORS.primary}
              name={(showUserCredits && 'ios-arrow-down') || 'ios-arrow-down'}
            />
          </Block>
        </Button>
      </Block>
      <Block>
        <Block flex middle>
          {leaderboard !== null && leaderboard.length === 0 ? (
            <Block center middle>
              <ActivityIndicator />
            </Block>
          ) : (
            <FlatList
              // contentContainerStyle={{ paddingHorizontal: SIZES.padding }}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              data={leaderboard}
              keyExtractor={(item, index) => `item-${index}`}
              renderItem={({ item, index }) => {
                if (item.user._id === curUser._id) {
                  setUserCredits(item.earning);
                }
                return (
                  <LeaderboardItem
                    id={index + 1}
                    user={item.user}
                    coins={item.earning}
                    isUser={item.user._id === curUser._id}
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
