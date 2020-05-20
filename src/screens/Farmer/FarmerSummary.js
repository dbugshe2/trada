import React, { useState } from 'react';

import { Image, ActivityIndicator } from 'react-native';
import Block from '../../components/primary/Block';
import Card from '../../components/primary/Card';
import Text from '../../components/primary/Text';
import Input from '../../components/primary/Input';
import Button from '../../components/primary/Button';
import Header from '../../components/Header';
import Dropdown from '../../components/Dropdown';

import { SIZES, COLORS } from '../../utils/theme';
import { useFocusEffect } from '@react-navigation/native';

const FarmerSummary = ({ navigation, route }) => {
  const [farmer, setFarmer] = useState(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params) {
        setFarmer(JSON.parse(route.params.farmer));
      }
    }, [route.params])
  );

  React.useEffect(() => {
    setLoading(true);
    if (route.params) {
      setFarmer(JSON.parse(route.params.farmer));
    }
    setLoading(false);
  }, []);
  const renderSummmaryItem = (title, value) => (
    <Block>
      <Text rbregular muted body>
        {title}
      </Text>
      <Text rbregular gray h6>
        {value}
      </Text>
    </Block>
  );

  if (loading) {
    return (
      <Block background center middle>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </Block>
    );
  }
  return (
    <Block background>
      <Header backTitle="Summary" />

      {/* Summary */}
      <Block paddingHorizontal={SIZES.padding}>
        <Block flex={0} center marginBottom={SIZES.base}>
          <Image
            source={{
              uri:
                (farmer.farmerImage && farmer.farmerImage) ||
                'https://via.placeholder.com/116?text="No Image"',
            }}
            style={{ width: 116, height: 116, borderRadius: 116 }}
          />
        </Block>

        <Block paddingVertical={10}>
          <Block outlined white>
            <Block paddingHorizontal={SIZES.padding} row>
              {/* first column */}
              <Block>
                {renderSummmaryItem('First Name', farmer.firstName)}
                {renderSummmaryItem('Phone', farmer.phone)}
                {renderSummmaryItem('LGA', farmer.lga)}
                {renderSummmaryItem(
                  'Est. farm size (hec.)',
                  farmer.farmSizeHectarage
                )}
                {renderSummmaryItem(
                  'Est. farm size (hec.)',
                  farmer.farmSizeHectarage
                )}
              </Block>

              {/* second column */}
              <Block>
                {renderSummmaryItem('Last Name', farmer.lastName)}
                {renderSummmaryItem('State', farmer.state)}
                {renderSummmaryItem('Crop Type', farmer.cropCultivated)}
                {renderSummmaryItem(
                  'Bags after harvest (kg)',
                  farmer.kg_bagsAfterHarvest
                )}
              </Block>
            </Block>
          </Block>
        </Block>
      </Block>
      {/* /Summary */}
    </Block>
  );
};

export default FarmerSummary;
