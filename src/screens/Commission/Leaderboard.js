import React from 'react';
import { SIZES } from '../../utils/theme';
import { data } from '../../data/index';
import LeaderboardItem from '../../components/LeaderboardItem';
import Header from '../../components/Header';
import ImageIcon from '../../components/primary/ImageIcon';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';

const Leaderboard = () => {
  return (
    <Block background>
      <Header title='LeaderBoard' />
      <Block paddingHorizontal={SIZES.base}>
        <Block flex middle>
          {/* <FlatList
            data={data}
            keyExtractor={(item, index) => `item-${index}`}
            renderItem={({ item }) => {
              return (
               <LeaderboardItem />
              );
            }}
          /> */}
          <Text h2 mtregular secondary center>
            Coming Soon...
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

export default Leaderboard;
