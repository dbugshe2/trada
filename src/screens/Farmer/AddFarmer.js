/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import ViewPager from '@react-native-community/viewpager';
import Header from '../../components/Header';
import Button from '../../components/primary/Button';
import Input from '../../components/primary/Input';
import Dropdown from '../../components/Dropdown';
import { StyleSheet } from 'react-native';
import { SIZES, LINE_HEIGHTS } from '../../utils/theme';
import ImageIcon from '../../components/primary/ImageIcon';
import { GENDERS } from '../../constants/onboarding';
import { useForm } from 'react-hook-form';
import { ActivityIndicator } from 'react-native-paper';
import { COLORS } from '../../utils/theme';
import { useVariationContext } from '../../context/variation/VariationContext';
import { apiPost } from '../../utils/fetcher';
import Toast from 'react-native-tiny-toast';
import { useAuthContext } from '../../context/auth/AuthContext';
const AddFarmer = ({ navigation }) => {
  const styles = StyleSheet.create({
    nextButton: {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopRightRadius: 0,
      position: 'absolute',
      bottom: 0,
      right: 0,
      width: 143,
      height: 48,
    },
    prevButton: {
      borderBottomRightRadius: 0,
      borderBottomLeftRadius: 0,
      borderTopLeftRadius: 0,
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: 143,
      height: 48,
    },
  });

  const { register, setValue, getValues, handleSubmit, errors } = useForm();
  const { validateToken } = useAuthContext();
  const { getStatesDetails, states_and_lgas, loading } = useVariationContext();

  const [activeView, setActiveView] = useState(0);
  const [activeState, setActiveState] = useState(null);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [state, setState] = useState(null);
  const [lga, setLGA] = useState(null);
  const [street, setStreet] = useState(null);
  const [address, setAddress] = useState(null);
  const [gender, setGender] = useState(null);
  const [cropCultivated, setCropCultivated] = useState(null);
  const [farmSizeHectarage, setFarmSizeHectarage] = useState(null);
  const [kg_bagsAfterHarvest, setKgBagsAfterHarvest] = useState(null);

  let TabedViewRef = useRef(null);
  const steps = 2;

  const handleViewSelected = (active) => {
    TabedViewRef.current.setPage(active + 1);
    setActiveView(active + 1);
  };

  const handleScroll = (position) => {
    setActiveView(position);
  };

  const handleStateSelect = (id, state) => {
    setActiveState(state);
    setState(state.name);
  };

  const handleLGASelect = (id, name) => {
    setLGA(name);
  };
  const handleGenderSelect = (id, gender) => {
    setGender(gender);
  };
  const onSubmit = async () => {
    setValue(
      [
        { firstName: firstName },
        { lastName: lastName },
        { phone: phone },
        { email: email },
        { state: state },
        { lga: lga },
        { street: street },
        { address: address },
        { gender: gender },
        { cropCultivated: cropCultivated },
        { farmSizeHectarage: farmSizeHectarage },
        { kg_bagsAfterHarvest: kg_bagsAfterHarvest },
      ],
      true
    );
    if (Object.entries(errors).length === 0) {
      setSending(true);
      const token = await validateToken();
      if (token) {
        console.log(token);
        const res = await apiPost('/farmers', getValues(), token, true)
          .unauthorized((err) => console.log('unauthorized', err))
          .notFound((err) => console.log('not found', err))
          .timeout((err) => console.log('timeout', err))
          .internalError((err) => console.log('server Error', err))
          .fetchError((err) => console.log('Netwrok error', err))
          .json();
        if (res) {
          console.log(res);
          Toast.showSuccess('Farmer added');
          navigation.navigate('Farmers');
        }
      }
      setSending(false);
    } else {
      setMessage('the form contains some errors');
    }
  };

  useEffect(() => {
    register(
      { name: 'firstName' },
      { required: 'Please enter you first name' }
    );
    register({ name: 'lastName' }, { required: 'Please enter your last name' });
    register(
      { name: 'phone' },
      {
        required: 'Please enter your phone number',
        minLength: { value: 10, message: 'Please enter a valid phone number' },
        maxLength: { value: 11, message: 'Please enter a valid phone number' },
        pattern: { value: /^[0-9]*$/, message: 'Please enter only numbers' },
      }
    );
    register(
      { name: 'email' },
      {
        required: 'Please enter your email address',
        pattern: {
          value: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
          message: 'Please enter a valid email address',
        },
      }
    );
    register(
      { name: 'state' },
      { required: 'Please select the state you live in' }
    );
    register({ name: 'lga' }, { required: 'pleasse select farmer lga' });
    register(
      { name: 'street' },
      { required: 'please enter farmer street name' }
    );
    register({ name: 'gender' }, { required: 'please select a gender' });
    register(
      { name: 'cropCultivated' },
      { required: 'please enter the name of the crop cultivated' }
    );
    register(
      { name: 'address' },
      { required: 'Please enter farmers full address' }
    );
    register(
      { name: 'farmSizeHectarage' },
      { required: 'please enter farm size in hecters' }
    );
    register(
      { name: 'kg_bagsAfterHarvest' },
      { required: 'please enter the number of kgs of bags ofter harvest' }
    );
  }, [register]);

  useEffect(() => {
    async function bootstrap() {
      await getStatesDetails();
    }
    bootstrap();
  }, []);
  return (
    <Block background>
      <Header backTitle />
      <Block
        flex={1}
        paddingHorizontal={SIZES.padding}
        marginBottom={SIZES.padding * 3}
      >
        <ViewPager
          style={{ flex: 1 }}
          ref={TabedViewRef}
          orientation="horizontal"
          initialPage={0}
          pageMargin={10}
          scrollEnabled={true}
          showPageIndicator={false}
          onPageSelected={(e) => {
            const position = e.nativeEvent.position;
            handleScroll(position);
          }}
        >
          <Block scroll showVerticalScrollIndicator={false}>
            <Text mtmedium gray h5 marginVertical={5}>
              Fill in farmers information to onboard.
            </Text>
            <Input
              onChangeText={(text) => setFirstName(text)}
              label="First Name"
              error={errors.firstName}
            />
            <Input
              onChangeText={(text) => setLastName(text)}
              label="Last Name"
              returnKeyType="next"
              error={errors.lastName}
            />
            <Input
              onChangeText={(text) => setPhone(text)}
              keyboardType="number-pad"
              label="Phone Number"
              defaultValue={(phone && phone) || ''}
              error={errors.phone}
              maxLength={11}
            />
            <Input
              onChangeText={(text) => setEmail(text)}
              keyboardType="email-address"
              label="Email"
              autoCapitalize="none"
              error={errors.email}
            />
            <Dropdown
              options={GENDERS}
              defaultValue="Gender"
              onSelect={handleGenderSelect}
              error={errors.gender}
            />

            <Input
              label="Street"
              onChangeText={(text) => setStreet(text)}
              error={errors.address}
            />
            <Input
              label="Address"
              onChangeText={(text) => setAddress(text)}
              error={errors.address}
            />
          </Block>
          <Block scroll>
            <Text mtmedium gray h5 marginVertical={5}>
              What crops do farmer cultivate?
            </Text>
            {loading ? (
              <ActivityIndicator color={COLORS.primary} />
            ) : (
              <Dropdown
                options={states_and_lgas}
                defaultValue={loading ? 'loading...' : 'Select State'}
                renderRow={(state, index, isSelected) => (
                  <Text
                    gray
                    h6
                    paddingHorizontal={SIZES.base}
                    paddingVertical={SIZES.padding}
                  >
                    {state.name}
                  </Text>
                )}
                renderButtonText={(state, index, isSelected) => {
                  return `${state.name}`;
                }}
                onSelect={handleStateSelect}
                error={errors.state}
              />
            )}

            <Dropdown
              disabled={!activeState}
              options={activeState && activeState.lgas}
              defaultValue={activeState ? 'Select LGA..' : 'loading..'}
              onSelect={handleLGASelect}
              error={errors.lga}
            />
            <Input
              label="Crop type"
              onChangeText={(text) => setCropCultivated(text)}
              error={errors.cropCultivated}
            />
            <Input
              label="Estimate farm size (hectare)"
              keyboardType="number-pad"
              onChangeText={(text) => setFarmSizeHectarage(text)}
              error={errors.farmSizeHectarage}
            />
            <Input
              keyboardType="number-pad"
              label="Bags after harvest (kg)"
              onChangeText={(text) => setKgBagsAfterHarvest(text)}
              error={errors.kg_bagsAfterHarvest}
            />
            {sending ? (
              <ActivityIndicator
                animating
                size="small"
                color={COLORS.primary}
              />
            ) : (
              <>
                <Button
                  marginVertical={SIZES.padding}
                  primary
                  onPress={() => onSubmit()}
                >
                  <Text white center>
                    Submit
                  </Text>
                </Button>
                <Text small center error mtmedium>
                  {message}
                </Text>
              </>
            )}
          </Block>
        </ViewPager>
      </Block>
      <Block flex={0} row space="between">
        {activeView > 0 && (
          <Button
            style={styles.prevButton}
            secondary
            onPress={() => {
              TabedViewRef.current.setPage(activeView - 1);
              setActiveView((prevView) => prevView - 1);
            }}
          >
            <Text white center body>
              Go Back
            </Text>
          </Button>
        )}
        {activeView <= steps - 2 && (
          <Button
            secondary
            onPress={() => handleViewSelected(activeView)}
            style={styles.nextButton}
          >
            <Text
              white
              body
              rtregular
              paddingHorizontal={SIZES.padding * 2}
              height={LINE_HEIGHTS.twenty_1}
            >
              Next
            </Text>
            {/* <ImageIcon name="add" /> */}
          </Button>
        )}
      </Block>
    </Block>
  );
};

export default AddFarmer;
