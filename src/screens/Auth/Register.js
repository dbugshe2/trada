import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { COLORS, SIZES } from '../../utils/theme';
// import { useAuthContext } from "../../context";
// import { VariationContext } from '../../context/variation/VariationContext';
import { useForm } from 'react-hook-form';
import { captureException } from 'sentry-expo';
import {
  GENDERS,
  EDUCATION_LEVELS,
  MONTHS,
  DATE,
  YEARS,
} from '../../constants/onboarding';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/primary/Input';
import StepIndicator from '../../components/StepIndicator';
import Button from '../../components/primary/Button';
import Block from '../../components/primary/Block';
import Header from '../../components/Header';
import Text from '../../components/primary/Text';

const steps = 4;
const initialViewProp = 0; // use initialView of 0

const Register = ({ navigation }) => {
  // const auth = useAuthContext();
  // const variation = useContext(VariationContext);
  const { register, setValue, getValues, handleSubmit, errors } = useForm();

  // const { signup } = auth;
  // const { getStatesDetails, states_and_lgas, loading } = variation;
  // const variationMessage = variation.message;

  const [activeView, setActiveView] = useState(initialViewProp); // state of activetab initialized to initialView
  const [activeState, setActiveState] = useState(null);
  const [sending, setSending] = useState(false);

  // form state

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [state, setState] = useState(null);
  const [lga, setLGA] = useState(null);
  const [district, setDistrict] = useState(null);
  const [address, setAddress] = useState(null);
  const [gender, setGender] = useState(null);
  const [education, setEducation] = useState(null);
  const [pin, setPin] = useState(null);
  const [confirmPin, setConfirmPin] = useState(null);
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [message, setMessage] = useState(null);

  // TabedView

  const labels = new Array(steps).fill('');

  let TabedViewRef = null;
  // let TabsListRef = null;

  const handleViewSelected = (direction) => {
    if (direction === 'prev' && activeView > 0) {
      setActiveView(activeView - 1);
      TabedViewRef.setPage(activeView - 1);
    }

    if (direction === 'next' && activeView <= steps - 1) {
      setActiveView(activeView + 1);
      TabedViewRef.setPage(activeView + 1);
    }
  };

  const handleScroll = (position) => {
    setActiveView(position);
  };
  // /TabedView

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
  const handleEducationSelect = (id, education) => {
    setEducation(education);
  };
  const handleDateSelect = (id, date) => {
    setDate(date);
  };
  const handleMonthSelect = (id, month) => {
    setMonth(month.value);
  };
  const handleYearSelect = (id, year) => {
    setYear(year);
  };
  // ------ ONSUBMIT --------
  const onSubmit = async () => {
    setSending(true);
    setValue(
      [
        { firstName: firstName },
        { lastName: lastName },
        { phone: phone },
        { email: email },
        { state: state },
        { lga: lga },
        { district: district },
        { gender: gender },
        { education: education },
        { pin: pin },
        { confirmPin: confirmPin },
        { address: address },
        { dateOfBirth: `${date}-${month}-${year}` },
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
      navigation.navigate('App');
    }
  };

  // logs

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
    register({ name: 'lga' }, { required: 'pleasse select your ' });
    register({ name: 'district' });
    register({ name: 'gender' }, { required: 'please select a gender' });
    register(
      { name: 'education' },
      { required: 'please select your education level' }
    );
    register({ name: 'pin' }, { required: 'please create a pin' });
    register({ name: 'confirmPin' }, {});
    register(
      { name: 'address' },
      { required: 'Please enter your full address' }
    );
    register(
      { name: 'dateOfBirth' },
      {
        required: 'please enter your date of birth',
        pattern: {
          value: /^\d{1,2}\/\d{1,2}\/\d{4}$/,
          message: 'please complete entering your date of birth',
        },
      }
    );
  }, [register]);

  return (
    <Block background paddingHorizontal={SIZES.padding}>
      <Header backTitle />
      <Text center body secondary>
        <Text secondary>{message}</Text>
      </Text>
      <Block>
        {/* TabedVIew */}
        <Block>
          <Block flex={0}>
            <StepIndicator
              // ref={(ref) => (TabsListRef = ref)}
              currentPosition={activeView}
              customStyles={tabsCustomStyle}
              stepCount={steps}
              labels={labels}
              direction="horizontal"
            />
          </Block>

          <Block flex={4}>
            <ViewPager
              orientation="horizontal"
              style={{ flex: 1 }}
              initialPage={initialViewProp}
              pageMargin={10}
              scrollEnabled={true}
              showPageIndicator={false}
              ref={(ref) => {
                TabedViewRef = ref;
              }}
              onPageSelected={(e) => {
                const position = e.nativeEvent.position;
                handleScroll(position);
              }}
            >
              {/* EnterPhysical */}
              <Block key="physical" scroll>
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
              </Block>
              {/* /EnterPhysical */}
              {/* EnterLocation */}
              <Block key="location" space="around">
                <Block>
                  <Dropdown
                    // options={states_and_lgas}
                    // defaultValue={loading ? 'loading...' : 'Select State'}
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

                  <Dropdown
                    disabled={!activeState}
                    options={activeState && activeState.lgas}
                    defaultValue={activeState ? 'Select LGA..' : 'loading..'}
                    onSelect={handleLGASelect}
                    error={errors.lga}
                  />
                  <Input
                    label="District"
                    onChangeText={(text) => setDistrict(text)}
                    error={errors.address}
                  />
                  <Input
                    label="Address"
                    onChangeText={(text) => setAddress(text)}
                    error={errors.address}
                  />
                </Block>
              </Block>
              {/* / EnterLocation */}
              {/* ENterBio */}
              <Block key="bio">
                <Dropdown
                  options={GENDERS}
                  defaultValue="Gender"
                  onSelect={handleGenderSelect}
                  error={errors.gender}
                />
                <Text small muted marginVertical={2}>
                  Date of Birth
                </Text>
                <Block row flex={0} space="between">
                  <Dropdown
                    options={DATE}
                    onSelect={handleDateSelect}
                    error={errors.dateOfBirth}
                    defaultValue="Date"
                  />
                  <Dropdown
                    flex={1}
                    options={MONTHS}
                    onSelect={handleMonthSelect}
                    error={errors.dateOfBirth}
                    defaultValue="Month"
                    renderRow={(month, index, isSelected) => (
                      <Text
                        gray
                        h6
                        paddingHorizontal={SIZES.base}
                        paddingVertical={SIZES.padding}
                      >
                        {month.name}
                      </Text>
                    )}
                    renderButtonText={(month, index, isSelected) => {
                      return `${month.name}`;
                    }}
                    containerProps={{ paddingHorizontal: SIZES.base * 2 }}
                  />
                  <Dropdown
                    flex={1}
                    options={YEARS}
                    onSelect={handleYearSelect}
                    error={errors.dateOfBirth}
                    defaultValue="Year"
                  />
                </Block>
                {errors.dateOfBirth && (
                  <Text small primary>
                    {errors.dateOfBirth.message}
                  </Text>
                )}
                <Dropdown
                  options={EDUCATION_LEVELS}
                  defaultValue="Highest Degree"
                  onSelect={handleEducationSelect}
                  message={errors.education && errors.education.message}
                  error={errors.education}
                />
              </Block>
              {/* EnterBio */}
              {/* SetPassword */}
              <Block key="password">
                <Input
                  label="Set Pin"
                  secureTextEntry
                  onChangeText={(text) => setPin(text)}
                  message={errors.pin && errors.pin.message}
                  error={errors.pin}
                />
                <Input
                  label="Confirm Pin"
                  secureTextEntry
                  onChangeText={(text) => setConfirmPin(text)}
                  message={errors.confirmPin && errors.confirmPin.message}
                  error={errors.confirmPin}
                />
                {sending ? (
                  <ActivityIndicator animating size="large" />
                ) : (
                  <Button
                    marginVertical={SIZES.padding}
                    secondary
                    onPress={() => onSubmit()}
                  >
                    <Text white center>
                      Submit
                    </Text>
                  </Button>
                )}
              </Block>
              {/* /SetPassword */}
            </ViewPager>
          </Block>
          <Block flex={0.5} space="between" row>
            <Block>
              {activeView > 0 && (
                <Button transparent onPress={() => handleViewSelected('prev')}>
                  <Text mtregular gray h5>
                    Back
                  </Text>
                </Button>
              )}
            </Block>
            <Block>
              {activeView <= steps - 2 && (
                <Button
                  radius={0}
                  transparent
                  onPress={() => handleViewSelected('next')}
                >
                  <Text right mtregular primary h5>
                    Next
                  </Text>
                </Button>
              )}
            </Block>
          </Block>
        </Block>
        {/* /TabedView */}
      </Block>
    </Block>
  );
};

export default Register;

const tabsCustomStyle = {
  stepIndicatorSize: 15,
  currentStepIndicatorSize: 18,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 2,
  stepStrokeCurrentColor: COLORS.primary,
  stepStrokeWidth: 2,
  stepStrokeFinishedColor: COLORS.primary,
  stepStrokeUnFinishedColor: COLORS.inactive,
  separatorFinishedColor: COLORS.primary,
  separatorUnFinishedColor: COLORS.inactive,
  stepIndicatorFinishedColor: COLORS.white,
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: COLORS.white,
  stepIndicatorLabelFinishedColor: COLORS.white,
  stepIndicatorLabelUnFinishedColor: COLORS.white,
  labelColor: COLORS.white,
  labelSize: 13,
  currentStepLabelColor: COLORS.primary,
};
