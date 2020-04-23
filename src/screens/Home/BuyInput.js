import React, { useState, useEffect } from 'react';
import { SIZES } from '../../utils/theme';
import Dropdown from '../../components/Dropdown';
import Button from '../../components/primary/Button';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Input from '../../components/primary/Input';
import Text from '../../components/primary/Text';
import STATES from '../../constants/states';
import { useAuthContext } from '../../context/auth/AuthContext';
import { apiGet, apiPost } from '../../utils/fetcher';
import {
  errorMessage,
  loadingMessage,
  clearMessage,
  successMessage,
} from '../../utils/toast';
import { captureException } from 'sentry-expo';
import { useForm } from 'react-hook-form';
import { CurrencyFormatter } from '../../utils/currency';
import { ActivityIndicator } from 'react-native';

const BuyInput = () => {
  // context
  const { validateToken } = useAuthContext();
  // form hook
  const { register, setValue, getValues, handleSubmit, errors } = useForm();
  //state
  const [state, setState] = useState(null);
  const [activeState, setActiveState] = useState(null);
  const [lga, setLGA] = useState();
  const [availableInputs, setAvailableInputs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [inputItems, setInputItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [amount, setAmount] = useState(null);
  const [units, setUnits] = useState(null);
  const [deliveryLocation, setDeliveryLocation] = useState(null);
  const [sending, setSending] = useState(false);
  // handlers
  const handleStateSelected = (id, stateObj) => {
    setActiveState(stateObj);
    setState(stateObj.name);
  };

  const handleLgaSelected = (id, lgaName) => {
    setLGA(lgaName);
  };

  const handleCategorySelected = (id, categoryName) => {
    setActiveCategory(categoryName);
    const items = availableInputs.map((input) => {
      if (input.inputCategory === categoryName) {
        return input;
      }
    });
    setInputItems(items);
  };
  const getCategories = () => {
    const cat = availableInputs.map((input) => input.inputCategory);
    const catSet = new Set(cat);
    setCategories([...catSet]);
  };

  const handleItemSelected = (id, input) => {
    setActiveItem(input);
  };

  const handleSetUnits = (units) => {
    setUnits(units);
    setAmount(units * activeItem.perUnitPrice);
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
  const renderInputItem = (input, index, isSelected) => (
    <Text
      gray
      h6
      paddingHorizontal={SIZES.base}
      paddingVertical={SIZES.padding}
    >
      {input.inputName}
    </Text>
  );
  // apiCalls
  const fetchInputsWithLocationFilters = async (
    skip = 0,
    limit = 10,
    inputState = state,
    inputLga = lga
  ) => {
    const loading = loadingMessage('loading available Inputs...');
    try {
      const token = await validateToken();

      if (token) {
        const res = await apiGet('/inputs/filter/location', {
          skip,
          limit,
          inputState,
          inputLga,
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
            errorMessage("Something went wrong, couldn't fetch user detials");
          })
          .fetchError((err) => {
            console.log(err);
            errorMessage('Network Error');
          })
          .json();
        if (res) {
          console.log(res);
          setAvailableInputs(res.data);
        }
      }
    } catch (error) {
      captureException(error);
      errorMessage(error.json.message);
    } finally {
      clearMessage(loading);
    }
  };

  // effects
  useEffect(() => {
    if (lga) {
      fetchInputsWithLocationFilters();
    }
  }, [lga]);

  useEffect(() => {
    if (availableInputs) {
      getCategories();
    }
  }, [availableInputs]);

  useEffect(() => {
    register(
      { name: 'units' },
      {
        required: 'please enter a quantity',
        min: {
          value: (activeItem && activeItem.minimumRequestLimit) || 10,
          message: 'quantity is less the minimum per order',
        },
        max: {
          value: (activeItem && activeItem.unitsRemaining) || 10,
          message: 'quantity no available',
        },
        pattern: {
          value: /^[0-9]*$/,
          message: 'please enter a number', // <p>error message</p>
        },
      }
    );
    register({ name: 'inputId' });
    register({ name: 'amount' });
    register({ name: 'inputDeliveryLocation' });
  }, [register]);

  const buyInput = async (data) => {
    setSending(true);
    try {
      const token = await validateToken();
      if (token) {
        const res = await apiPost('/inputs/buy', data, token, true)
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
            errorMessage("Something went wrong, couldn't fetch user detials");
          })
          .fetchError((err) => {
            console.log(err);
            errorMessage('Network Error');
          })
          .json();
        if (res) {
          console.log(res);
          successMessage(res.message);
        }
      }
    } catch (error) {
      captureException(error);
      errorMessage(error.json.message);
    } finally {
      setSending(false);
    }
  };
  const onSubmit = () => {
    setValue(
      [
        { inputId: activeItem._id },
        { amount: amount },
        { units: units },
        { inputDeliveryLocation: deliveryLocation },
      ],
      true
    );
    console.log('values', getValues());
    buyInput(getValues());
  };
  return (
    <Block background>
      <Header backTitle="Buy Your Inputs" />
      <Text marginVertical={5} paddingHorizontal={SIZES.padding}>
        Transfer funds to your Tmoni account
      </Text>
      <Block marginVertical={25} paddingHorizontal={SIZES.padding} scroll>
        <Block middle flex={0}>
          <Dropdown
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
          <Dropdown
            disabled={activeState === null}
            options={categories.length !== 0 && categories}
            defaultValue="Category"
            onSelect={handleCategorySelected}
          />
          <Block space="between" row>
            <Block paddingRight={SIZES.base} marginVertical={SIZES.base + 3}>
              <Dropdown
                options={inputItems}
                disabled={activeCategory === null}
                defaultValue="Item"
                renderRow={renderInputItem}
                renderButtonText={(input, index, isSelected) => {
                  return `${input.inputName}`;
                }}
                onSelect={handleItemSelected}
              />
              <Text primary small>
                {activeItem
                  ? `Minimum of ${activeItem.minimumRequestLimit} item per order`
                  : 'Select an Item'}
              </Text>
            </Block>
            <Block paddingLeft={SIZES.base} paddingBottom={SIZES.small}>
              <Input
                disabled={activeItem === null}
                keyboardType="number-pad"
                label="Qty:10"
                onChangeText={handleSetUnits}
                error={errors.units}
              />
            </Block>
          </Block>
          <Input
            disabled={lga === null}
            label="Pickup location"
            onChangeText={(text) => setDeliveryLocation(text)}
          />
        </Block>
      </Block>
      <Block flex={0}>
        {sending ? (
          <ActivityIndicator />
        ) : (
          <Button
            disabled={amount === null}
            radius={0}
            onPress={() => onSubmit()}
            height={48}
          >
            <Text white center h6>
              Pay {CurrencyFormatter(amount)}
            </Text>
          </Button>
        )}
      </Block>
      <Block flex={0} top />
    </Block>
  );
};

export default BuyInput;
