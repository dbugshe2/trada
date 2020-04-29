import React, { useState, useEffect } from 'react';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import Button from '../../components/primary/Button';
import Dropdown from '../../components/Dropdown';
import Header from '../../components/Header';
import { SIZES } from '../../utils/theme';
import Input from '../../components/primary/Input';
import STATES from '../../constants/states';
import { useAuthContext } from '../../context/auth/AuthContext';
import { loadingMessage, errorMessage, clearMessage } from '../../utils/toast';
import { apiGet } from '../../utils/fetcher';
import { captureException } from 'sentry-expo';

const PriceUpdate = () => {
  const { validateToken } = useAuthContext();

  const [state, setState] = useState(null);
  const [activeState, setActiveState] = useState(null);
  const [lga, setLGA] = useState(null);
  const [availableOutputs, setAvailableOutputs] = useState([]);

  const handleStateSelected = (id, stateObj) => {
    setActiveState(stateObj);
    setState(stateObj.name);
  };

  const handleLgaSelected = (id, lgaName) => {
    setLGA(lgaName);
  };

  // render Functions
  const renderStateItem = (state, index, isSelected) => (
    <Text
      gray
      h6
      paddingHorizontal={SIZES.base}
      paddingVertical={SIZES.padding}
    >
      {state.name}
    </Text>
  );
  const fetchMarketPriceByLocation = async (
    skip = 0,
    limit = 10,
    outputState = state,
    outputLga = lga
  ) => {
    const loading = loadingMessage('loading available Outputs...');
    try {
      const token = await validateToken();

      if (token) {
        const res = await apiGet('/outputs', {
          skip,
          limit,
          outputState,
          outputLga,
        })
          .badRequest((err) => {
            console.log(err.status);
          })
          .unauthorized((err) => {
            console.log(err);
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
            errorMessage('Something went wrong, try again later');
          })
          .fetchError((err) => {
            console.log(err);
            errorMessage('Network Error');
          })
          .json();
        if (res) {
          setAvailableOutputs(res.data);
        }
      }
    } catch (error) {
      captureException(error);
      errorMessage(error.json.message);
    } finally {
      clearMessage(loading);
    }
  };
  useEffect(() => {
    if (lga) {
      fetchMarketPriceByLocation();
    }
  }, [lga]);
  return (
    <Block background>
      <Header backTitle="Price Update" />
      <Text marginVertical={10} paddingHorizontal={SIZES.padding}>
        Updates are based on a per bag bases - 100kg
      </Text>
      <Block
        space="around"
        marginVertical={SIZES.padding}
        paddingHorizontal={SIZES.padding}
      >
        <Block middle flex={4}>
          <Dropdown
            disabled={activeState === null}
            options={STATES}
            renderRow={renderStateItem}
            defaultValue="Select State"
            onSelect={handleStateSelected}
            renderButtonText={(state, index, isSelected) => {
              return `${state.name}`;
            }}
          />
          <Dropdown
            disabled={activeState === null}
            options={activeState && activeState.lgas}
            defaultValue={activeState ? 'Select LGA' : 'loading...'}
            onSelect={handleLgaSelected}
          />
          <Dropdown defaultValue="Select Item" />
          <Block row>
            <Input
              flex={1}
              containerProps={{ marginRight: SIZES.base }}
              label="Min Price"
            />
            <Input
              flex={1}
              containerProps={{ marginLeft: SIZES.base }}
              label="Max Price"
            />
          </Block>
          <Block flex={0}>
            <Button>
              <Text white center h6>
                Save
              </Text>
            </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default PriceUpdate;
