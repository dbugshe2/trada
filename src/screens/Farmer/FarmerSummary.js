import React, { useState } from "react";

import { Image } from "react-native";
import Block from "../../components/primary/Block";
import Card from "../../components/primary/Card";
import Text from "../../components/primary/Text";
import Input from "../../components/primary/Input";
import Button from "../../components/primary/Button";
import Header from "../../components/Header";
import Dropdown from "../../components/Dropdown";

import { SIZES } from "../../utils/theme";

const FarmerSummary = ({ navigation }) => {
  return (
    <Block background>
      <Header backTitle />

      <Block paddingHorizontal={SIZES.padding} marginVertical={20}>
        <Text mtmedium gray h5>
          Summary
        </Text>
        <Block center marginVertical={30} flex={0}>
          <Image
            source={{
              uri: "https://api.adorable.io/avatars/100/tradaAvatar.png",
            }}
            style={{ width: 120, height: 120, borderRadius: 100 }}
          />
        </Block>

        <Block>
          <Block marginVertical={25} flex={1}>
            <Card outlined white>
              <Block paddingHorizontal={SIZES.padding} marginVertical={20} row>
                {/* first column */}
                <Block flex={0.6}>
                  <Block>
                    <Text muted body>
                      First name
                    </Text>
                    <Text gray h6>
                      Christopher
                    </Text>
                  </Block>
                  <Block>
                    <Text muted body>
                      Phone
                    </Text>
                    <Text gray h6>
                      07067139202
                    </Text>
                  </Block>
                  <Block>
                    <Text muted body>
                      LGA
                    </Text>
                    <Text gray h6>
                      Amotokun
                    </Text>
                  </Block>
                  <Block>
                    <Text muted body>
                      Est. farm size (hec.)
                    </Text>
                    <Text gray h6>
                      5
                    </Text>
                  </Block>
                </Block>

                {/* second column */}
                <Block flex={0.7}>
                  <Block>
                    <Text muted body>
                      Last name
                    </Text>
                    <Text gray h6>
                      Sani
                    </Text>
                  </Block>
                  <Block>
                    <Text muted body>
                      State
                    </Text>
                    <Text gray h6>
                      Anambra
                    </Text>
                  </Block>
                  <Block>
                    <Text muted body>
                      Crop type
                    </Text>
                    <Text gray h6>
                      Soyabeans
                    </Text>
                  </Block>
                  <Block>
                    <Text muted body>
                      Bags after harvest (100kg)
                    </Text>
                    <Text gray h6>
                      20
                    </Text>
                  </Block>
                  <Block>
                    <Text muted body>
                      Issued Date
                    </Text>
                    <Text h6>Monday Jan 09, 2020</Text>
                  </Block>
                </Block>
              </Block>
            </Card>
          </Block>
        </Block>
      </Block>

      <Block marginHorizontal={SIZES.padding} flex={0.1}>
        <Button onPress={() => navigation.navigate("FarmerActivitiesAdd")}>
          <Text white center h6>
            Save
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default FarmerSummary;
