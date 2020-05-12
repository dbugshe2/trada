import React, { useEffect, useState } from 'react';
import { SIZES } from '../../utils/theme';
import Dropdown from '../../components/Dropdown';
import ImageIcon from '../../components/primary/ImageIcon';
import Button from '../../components/primary/Button';
import Input from '../../components/primary/Input';
import Header from '../../components/Header';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import { useAuthContext } from '../../context/auth/AuthContext';
import {
  errorMessage,
  loadingMessage,
  clearMessage,
  successMessage,
} from '../../utils/toast';
import { captureException } from '@sentry/react-native';
import { useForm } from 'react-hook-form';
import { CurrencyFormatter } from '../../utils/currency';
import STATES from '../../constants/states';
import { ActivityIndicator, Image } from 'react-native';
import { apiGet, apiPost } from '../../utils/fetcher';
import { useFocusEffect } from '@react-navigation/native';

const SellOutput = ({ route, navigation }) => {
  // context
  const { validateToken } = useAuthContext();

  // form
  const { register, setValue, getValues, handleSubmit, errors } = useForm();

  // state
  const [state, setState] = useState(null);
  const [activeState, setActiveState] = useState(null);
  const [lga, setLGA] = useState(null);
  const [availableOutputs, setAvailableOutputs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [outputItems, setOutputItems] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [estimatedAmount, setEstimatedAmount] = useState(null);
  const [units, setUnits] = useState(null);
  const [pickupLocation, setPickupLocation] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [sending, setSending] = useState(false);

  // const image = (route.params && route.params.image) || null;
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
    const items = availableOutputs.map((output) => {
      if (output.outputCategory === categoryName) {
        return output;
      }
    });
    setOutputItems(items);
  };
  const getCategories = () => {
    const cat = availableOutputs.map((output) => output.outputCategory);
    const catSet = new Set(cat);
    setCategories([...catSet]);
  };

  const handleItemSelected = (id, output) => {
    setActiveItem(output);
  };

  const handleSetUnits = (unitsValue) => {
    setUnits(unitsValue);
    setEstimatedAmount(unitsValue * activeItem.perUnitPrice);
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
  // apiCalls
  const fetchOutputsWithLocationFilters = async (
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
  const sellOutput = async (data) => {
    setSending(true);
    try {
      const token = await validateToken();
      if (token) {
        const res = await apiPost('/outputs/sell', data, token, true)
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
  // effects
  useFocusEffect(
    React.useCallback(() => {
      if (route.params) {
        setImage(JSON.parse(route.params.image));
      }
    }, [route.params])
  );

  useEffect(() => {
    if (lga) {
      fetchOutputsWithLocationFilters();
    }
  }, [lga]);

  useEffect(() => {
    if (availableOutputs) {
      getCategories();
    }
  }, [availableOutputs]);
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
    register({ name: 'outputId' });
    register(
      { name: 'description' },
      { required: 'please provide a short description' }
    );
    register(
      { name: 'imageUrl' },
      { required: 'please Click the button above to take photo of the output' }
    );
    register({ name: 'estimatedAmount' });
    register(
      { name: 'outputPickupLocation' },
      { required: 'please enter a pickup location' }
    );
  }, [register]);

  const onSubmit = async () => {
    setValue(
      [
        { outputId: activeItem._id },
        { estimatedAmount: estimatedAmount },
        { units: units },
        { outputPickupLocation: pickupLocation },
        { description: description },
        { imageUrl: image.url },
      ],
      true
    );
    if (Object.entries(errors).length === 0) {
      console.log('values', getValues());
      await sellOutput(getValues());
      navigation.navigate('Store', { screen: 'MyOutputs' });
    }
  };
  return (
    <Block background>
      <Header backTitle="Sell Your Outputs" />
      <Block scroll paddingHorizontal={SIZES.padding}>
        <Text gray small marginVertical={5} mtmedium>
          Place item available for sell
        </Text>
        <Block marginVertical={8} center middle flex={0} column>
          {image ? (
            <Image
              source={{ uri: image.url }}
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ height: 100, width: 100 }}
            />
          ) : (
            <Button
              onPress={() => navigation.navigate('PhotoUpload')}
              muted
              center
              radius={0}
              middle
              width={66}
              height={48}
            >
              <Block center middle>
                <ImageIcon name="add" />
              </Block>
            </Button>
          )}

          <Text marginVertical={6} small muted mtmedium>
            {image ? 'Image Added' : 'Add image of item'}
          </Text>
          {errors.imageUrl && (
            <Text marginVertical={3} small error>
              errors.imageUrl.message
            </Text>
          )}
        </Block>
        <Block middle flex={0}>
          <Input
            disabled={image === null}
            error={errors.description}
            onChangeText={(text) => setDescription(text)}
            label="Description"
          />
          <Dropdown
            disabled={image === null}
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
          <Block flex={0} space="around" row>
            <Block paddingRight={SIZES.padding} marginTop={7}>
              <Dropdown
                options={outputItems}
                disabled={activeCategory === null}
                defaultValue="Item"
                renderRow={renderOutputItem}
                renderButtonText={(output, index, isSelected) => {
                  return `${output.outputName}`;
                }}
                onSelect={handleItemSelected}
              />
            </Block>
            <Input
              flex={1}
              disabled={activeItem === null}
              keyboardType="number-pad"
              label="Qty:10"
              onChangeText={handleSetUnits}
              error={errors.units}
            />
          </Block>
          <Text primary mtlight>
            {activeItem
              ? `Minimum of ${activeItem.minimumRequestLimit} item per order`
              : 'Select an Item'}
          </Text>
          <Input
            label="Pickup location"
            disabled={lga === null}
            onChangeText={(text) => setPickupLocation(text)}
            error={errors.outputPickupLocation}
          />
        </Block>
      </Block>
      <Block flex={0}>
        <Block
          flex={0}
          paddingHorizontal={SIZES.padding}
          paddingVertical={SIZES.base}
          row
        >
          <Text primary body mtmedium marginRight={SIZES.padding}>
            Estimated Price:
          </Text>
          <Text black body mtmedium>
            About {CurrencyFormatter(estimatedAmount)}
          </Text>
        </Block>
        {sending ? (
          <ActivityIndicator />
        ) : (
          <Button
            disabled={pickupLocation === null}
            radius={0}
            onPress={onSubmit}
            height={48}
          >
            <Text white center h6>
              Sell
            </Text>
          </Button>
        )}
      </Block>
      <Block flex={0} top />
    </Block>
  );
};

export default SellOutput;
