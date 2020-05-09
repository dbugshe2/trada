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
import { captureException } from 'sentry-expo';
import { useForm } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';

const PriceUpdate = ({ navigation }) => {
  const { validateToken } = useAuthContext();
  const { register, setValue, handleSubmit, getValues, errors } = useForm();

  const [state, setState] = useState(null);
  const [activeState, setActiveState] = useState(null);
  const [lga, setLGA] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [availableOutputs, setAvailableOutputs] = useState([]);
  const [sending, setSending] = useState(false);

  const handleStateSelected = (id, stateObj) => {
    setActiveState(stateObj);
    setState(stateObj.name);
    setValue('state', stateObj.name);
  };

  const handleLgaSelected = (id, lgaName) => {
    setLGA(lgaName);
    setValue('lga', lgaName);
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
    limit = 100,
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

  const onSubmit = async (data) => {
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
          successMessage('Thank you for Price Update');
          navigation.navigate('MarketPrice');
        }
      }
    } catch (error) {
      captureException(error);
      errorMessage(error.json.message);
    } finally {
      setSending(false);
    }
  };

  useEffect(() => {
    if (lga) {
      fetchMarketPriceByLocation();
    }
  }, [lga]);

  useEffect(() => {
    register({ name: 'state' }, { required: 'please select a state' });
    register({ name: 'lga' }, { required: 'please select a LGA' });
    register({ name: 'outputId' }, { required: 'please select a LGA' });
    register({ name: 'minPrice' }, { required: 'minimum price is required' });
    register({ name: 'maxPrice' }, { required: 'maximumm price is required' });
  }, [register]);

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
            options={availableOutputs}
            defaultValue="Select Item"
            onSelect={(id, output) => {
              setValue('outputId', output._id);
            }}
            renderButtonText={(output, index, isSelected) => {
              return `${output.outputName}`;
            }}
            renderRow={(output, index, isSelected) => (
              <Text
                gray
                h6
                paddingHorizontal={SIZES.base}
                paddingVertical={SIZES.padding}
              >
                {output.outputName}
              </Text>
            )}
            error={errors.outputId}
          />
          <Block row>
            <Input
              flex={1}
              containerProps={{ marginRight: SIZES.base }}
              label="Min Price"
              keyboardType="number-pad"
              onChangeText={(text) => setValue('minPrice', text)}
              error={errors.minPrice}
            />
            <Input
              flex={1}
              containerProps={{ marginLeft: SIZES.base }}
              label="Max Price"
              keyboardType="number-pad"
              onChangeText={(text) => setValue('maxPrice', text)}
              error={errors.maxPrice}
            />
          </Block>
          <Block flex={0}>
            {sending ? (
              <ActivityIndicator color={COLORS.primary} size="large" />
            ) : (
              <Button onPress={handleSubmit(onSubmit)}>
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
