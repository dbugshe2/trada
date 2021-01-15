import React, { useState, useEffect } from 'react';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import Button from '../../components/primary/Button';
import Dropdown from '../../components/Dropdown';
import Header from '../../components/Header';
import { SIZES, COLORS } from '../../utils/theme';
import Input from '../../components/primary/Input';
import STATES from '../../constants/states';
import { useAuthContext } from '../../context/auth/AuthContext';
import {
  loadingMessage,
  errorMessage,
  clearMessage,
  successMessage,
} from '../../utils/toast';
import { apiGet, apiPost } from '../../utils/fetcher';
import { captureException } from '@sentry/react-native';
import { useForm } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';

const PriceUpdate = ({ navigation }) => {
  const { validateToken } = useAuthContext();
  const { register, setValue, getValues, errors, handleSubmit } = useForm();
  const [state, setState] = useState(null);
  const [activeState, setActiveState] = useState(null);
  const [lga, setLGA] = useState(null);
  const [availableOutputs, setAvailableOutputs] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [sending, setSending] = useState(null);

  const handleStateSelected = (id, stateObj) => {
    setActiveState(stateObj);
    setState(stateObj.name);
  };

  const handleLgaSelected = (id, lgaName) => {
    setLGA(lgaName);
  };

  const handleItemSelected = (id, output) => {
    setActiveItem(output);
  };

  const handleSetMinPrice = (minPriceValue) => {
    setMinPrice(minPriceValue);
  };
  const handleSetMaxPrice = (maxPriceValue) => {
    setMaxPrice(maxPriceValue);
  };

  const onSubmit = async () => {
    try {
      setValue(
        [
          { state: state },
          { lga: lga },
          { outputId: activeItem._id },
          { minPrice: minPrice },
          { maxPrice: maxPrice },
        ],
        true
      );
      if (Object.entries(errors).length === 0) {
        console.log('values', getValues());
        await addMarketPrice(getValues());
      }
    } catch (error) {
      captureException(error);
    }
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
  const renderOutputItem = (output, index, isSelected) => (
    <Text
      gray
      h6
      paddingHorizontal={SIZES.base}
      paddingVertical={SIZES.padding}
    >
      {output.outputName}
    </Text>
  );

  const fetchMarketPriceByLocation = async (
    skip = 0,
    limit = 30,
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
          console.log(res);
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
  const addMarketPrice = async (data) => {
    try {
      setSending(true);
      const token = await validateToken();

      if (token) {
        const res = await apiPost('/outputs/marketWatch', data, token, true)
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
          console.log(res);
          successMessage('Thank you, Update Successfull');
          navigation.navigate('MarketPrice');
        }
      }
    } catch (error) {
      captureException(error);
      setSending(false);
    }
  };

  // effects
  useEffect(() => {
    if (lga) {
      fetchMarketPriceByLocation();
    }
  }, [lga]);

  useEffect(() => {
    register({ name: 'state' }, { required: 'please select a state' });
    register({ name: 'lga' }, { required: 'please select a lga' });
    register(
      { name: 'outputId' },
      { required: "please select the item you're updating for" }
    );
    register(
      { name: 'minPrice' },
      { required: 'please enter the minimum pwrice for selected Item' }
    );
    register(
      { name: 'maxPrice' },
      { required: 'please enter the maximum price for selected Item' }
    );
  }, [register]);

  return (
    <Block background>
      <Header backTitle="Price Update" />
      <Text marginVertical={10} paddingHorizontal={SIZES.padding} mtmedium>
        Updates are based on a per bag bases - 100kg
      </Text>
      <Block
        space="around"
        marginVertical={SIZES.padding}
        paddingHorizontal={SIZES.padding}
      >
        <Block middle flex={4} scroll>
          <Dropdown
            options={STATES}
            renderRow={renderStateItem}
            defaultValue="Select State"
            onSelect={handleStateSelected}
            renderButtonText={(state, index, isSelected) => {
              return `${state.name}`;
            }}
            error={errors.state}
          />
          <Dropdown
            disabled={activeState === null}
            options={activeState && activeState.lgas}
            defaultValue={activeState ? 'Select LGA' : 'loading...'}
            onSelect={handleLgaSelected}
            error={errors.lga}
          />
          <Dropdown
            disabled={availableOutputs === null}
            options={availableOutputs}
            defaultValue="Select Item"
            renderRow={renderOutputItem}
            renderButtonText={(output, index, isSelected) => {
              return `${output.outputName}`;
            }}
            onSelect={handleItemSelected}
            error={errors.outputId}
          />
          {availableOutputs !== null ? (
            <Text small error>
              {availableOutputs.length === 0
                ? 'No items to update in this location'
                : ''}
            </Text>
          ) : null}

          <Block row>
            <Block>
              <Input
                containerProps={{ marginRight: SIZES.base }}
                label="Min Price"
                onChangeText={handleSetMinPrice}
                keyboardType="number-pad"
                error={errors.minPrice}
              />
            </Block>
            <Block>
              <Input
                containerProps={{ marginLeft: SIZES.base }}
                label="Max Price"
                onChangeText={handleSetMaxPrice}
                keyboardType="number-pad"
                error={errors.maxPrice}
              />
            </Block>
          </Block>
          <Block flex={0}>
            {sending ? (
              <ActivityIndicator size="small" color={COLORS.primary} />
            ) : (
              <Button
                disabled={minPrice === null || maxPrice === null}
                onPress={onSubmit}
              >
                <Text white center h6>
                  Save
                </Text>
              </Button>
            )}
          </Block>
        </Block>
      </Block>
    </Block>
  );
};

export default PriceUpdate;
