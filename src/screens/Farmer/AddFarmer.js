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
import {
  GENDERS,
  EDUCATION_LEVELS,
  MONTHS,
  DATE,
  YEARS,
} from '../../constants/onboarding';
import { useForm } from 'react-hook-form';

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
      height: 64,
    },
  });
  const { register, setValue, getValues, handleSubmit, errors } = useForm();

  const [activeView, setActiveView] = useState(0);
  const [activeState, setActiveState] = useState(null);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState(null);

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [state, setState] = useState(null);
  const [lga, setLGA] = useState(null);
  const [crop, setCrop] = useState(null);
  const [farmSize, setFarmSize] = useState(null);
  const [bags, setBags] = useState(null);

  let TabedViewRef = useRef(null);

  const handleStateSelect = (id, state) => {
    setActiveState(state);
    setState(state.name);
  };

  const handleLGASelect = (id, name) => {
    setLGA(name);
  };

  const handleViewSelected = (active) => {
    TabedViewRef.current.setPage(active + 1);
    setActiveView(active + 1);
  };

  const onSubmit = async () => {
    setSending(true);
    setValue(
      [
        { firstName: firstName },
        { lastName: lastName },
        { phone: phone },
        { state: state },
        { lga: lga },
      ],
      true
    );
    if (Object.entries(errors).length > 0) {
      setMessage('the form contains some errors');
      setSending(false);
    } else {
      // const res = await signup(getValues());
      // if (res) setMessage(res.message);
      // console.log("returned, by submit", res);
      // navigation.navigate('App');
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
      { name: 'state' },
      { required: 'Please select the state you live in' }
    );
    register({ name: 'lga' }, { required: 'pleasse select your ' });
  }, [register]);

  return (
    <Block background>
      <Header backTitle />
      <Block flex={1} marginVertical={10} paddingHorizontal={SIZES.padding}>
        <ViewPager style={{ flex: 1 }} ref={TabedViewRef}>
          <Block>
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
            <Dropdown defaultValue="State" />
            <Dropdown defaultValue="LGA" />
          </Block>
          <Block scroll>
            <Text mtmedium gray h5 marginVertical={5}>
              What crops do farmer cultivate?
            </Text>
            <Input label="Crop type" onChangeText={(text) => setCrop(text)} />
            <Input
              label="Estimate farm size (hectare)"
              keyboardType="number-pad"
              onChangeText={(text) => setFarmSize(text)}
            />
            <Input
              keyboardType="number-pad"
              label="Bags after harvest (100kg)"
              onChangeText={(text) => setBags(text)}
            />
          </Block>
        </ViewPager>
      </Block>
      <Block flex={0}>
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
      </Block>
    </Block>
  );
};

export default AddFarmer;
