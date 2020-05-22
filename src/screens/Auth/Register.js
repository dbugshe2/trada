import React, { useState, useEffect } from 'react';
import { ActivityIndicator, Keyboard } from 'react-native';
import ViewPager from '@react-native-community/viewpager';
import { COLORS, SIZES } from '../../utils/theme';
import { useAuthContext } from '../../context/auth/AuthContext';
import { useForm } from 'react-hook-form';
import { captureException } from '@sentry/react-native';
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
import STATES from '../../constants/states';
import { errorMessage, successMessage } from '../../utils/toast';
import Ionicons from 'react-native-vector-icons/Ionicons';

const steps = 4;
const initialViewProp = 0; // use initialView of 0
const Register = ({ navigation }) => {
  const { signup } = useAuthContext();
  const {
    register,
    setValue,
    getValues,
    triggerValidation,
    errors,
  } = useForm();

  const [activeView, setActiveView] = useState(initialViewProp); // state of activetab initialized to initialView
  const [activeState, setActiveState] = useState(null);
  const [sending, setSending] = useState(false);
  const [validating, setValidating] = useState(false);

  // form state

  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [state, setState] = useState(null);
  const [lga, setLGA] = useState(null);
  const [district, setDistrict] = useState('');
  const [address, setAddress] = useState(null);
  const [gender, setGender] = useState(null);
  const [education, setEducation] = useState(null);
  const [pin, setPin] = useState(null);
  const [confirmPin, setConfirmPin] = useState(null);
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [message, setMessage] = useState(null);
  const [confirmPinError, setConfirmPinError] = useState(null);

  // TabedView

  const labels = new Array(steps).fill('');

  let TabedViewRef = React.useRef(null);
  // let TabsListRef = null;

  const handleViewSelected = (direction) => {
    if (direction === 'prev' && activeView > 0) {
      setActiveView(activeView - 1);
      TabedViewRef.current?.setPage(activeView - 1);
    }

    if (direction === 'next' && activeView <= steps - 1) {
      Keyboard.dismiss();
      switch (activeView) {
        case 0:
          submitPhysical();
          break;
        case 1:
          submitLocation();
          break;
        case 2:
          submitBio();
          break;
        case 3:
          submitPin();
          break;
        default:
          break;
      }
    }
  };

  const handleScroll = (position) => {
    setActiveView(position);
  };

  //#region
  const handleStateSelect = (id, state) => {
    setActiveState(state);
    setValue('state', state.name);
  };

  const handleLGASelect = (id, name) => {
    setValue('lga', name);
  };
  const handleGenderSelect = (id, gender) => {
    setValue('gender', gender);
  };
  const handleEducationSelect = (id, education) => {
    setValue('education', education);
  };
  const handleDateSelect = (id, date) => {
    setDate(date);
  };
  const handleMonthSelect = (id, month) => {
    setMonth(month.value);
  };
  const handleYearSelect = (id, year) => {
    setYear(year);
    // setValue('dateOfBirth', `${month}-${date}-${year}`);
  };
  const handleValidateConfirmPin = () => {
    let validated = getValues('pin') === confirmPin;
    if (validated) {
      setConfirmPinError({});
    } else if (confirmPin === null) {
      setConfirmPinError({ message: 'please repeat your pin to confirm it' });
    } else {
      setConfirmPinError({ message: 'This does not match your PIN above' });
    }
  };
  //#endregion

  // ------ ONSUBMIT --------
  const submitPhysical = async () => {
    Keyboard.dismiss();
    setValidating(true);
    let physical = await triggerValidation([
      'firstName',
      'lastName',
      'phone',
      'email',
    ]);
    if (physical) {
      TabedViewRef.current?.setPage(activeView + 1);
      setActiveView(activeView + 1);
    } else {
      errorMessage('form contians errors');
    }
    setValidating(false);
  };
  const submitLocation = async () => {
    Keyboard.dismiss();
    setValidating(true);
    let location = await triggerValidation([
      'state',
      'lga',
      'district',
      'address',
    ]);
    if (location) {
      TabedViewRef.current?.setPage(activeView + 1);
      setActiveView(activeView + 1);
    } else {
      errorMessage('form contains error');
    }
    setValidating(false);
  };
  const submitBio = async () => {
    Keyboard.dismiss();
    setValidating(true);
    let bio = await triggerValidation(['gender', 'education', 'dateOfBirth']);
    if (bio) {
      TabedViewRef.current?.setPage(activeView + 1);
      setActiveView(activeView + 1);
    } else {
      errorMessage('form contians errors');
    }
    setValidating(false);
  };
  const submitPin = async () => {
    Keyboard.dismiss();
    setValidating(true);
    const pinValid = await triggerValidation(['pin', 'confirmPin']);
    if (pinValid) {
      onSubmit();
    }
    setValidating(false);
  };
  const onSubmit = async () => {
    try {
      setSending(true);
      const res = await signup(getValues());
      if (res) {
        successMessage(res.message);
        console.log('returned, by submit', res);
        navigation.navigate('Login');
      } else {
        setSending(false);
      }
    } catch (error) {
      captureException(error);
      setSending(false);
    }
  };
  // logs
  // console.log(errors);
  // console.log('form state', getValues());
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
    register({ name: 'lga' }, { required: 'pleasse select your LGA' });
    register({ name: 'district' });
    register({ name: 'gender' }, { required: 'please select a gender' });
    register(
      { name: 'education' },
      { required: 'please select your education level' }
    );
    register(
      { name: 'pin' },
      {
        required: 'please create a pin',
        validate: (value) => value.length === 4 || 'please enter a 4 digit pin',
      }
    );
    register(
      { name: 'confirmPin' },
      {
        required: 'please repeat your pin to confirm',
        validate: (value) =>
          value === getValues('pin') || 'This does not match your PIN above',
      }
    );
    register(
      { name: 'address' },
      { required: 'Please enter your full address' }
    );
    register(
      { name: 'dateOfBirth' },
      {
        required: 'please enter your date of birth',
        pattern: {
          value: /^\d{1,2}-\d{1,2}-\d{4}$/,
          message: 'please complete entering your date of birth',
        },
      }
    );
  }, [register]);

  useEffect(() => {
    setValue('dateOfBirth', `${month}-${date}-${year}`);
  }, [date, month, year]);

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
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ flex: 1 }}
              initialPage={initialViewProp}
              pageMargin={0}
              scrollEnabled={false}
              showPageIndicator={false}
              ref={TabedViewRef}
              onPageSelected={(e) => {
                const position = e.nativeEvent.position;
                handleScroll(position);
              }}
            >
              {/* EnterPhysical */}
              <Block key="physical" scroll>
                <Input
                  onChangeText={(text) => setValue('firstName', text)}
                  label="First Name"
                  error={errors.firstName}
                  onBlur={() => triggerValidation('firstName')}
                />
                <Input
                  onChangeText={(text) => setValue('lastName', text)}
                  label="Last Name"
                  returnKeyType="next"
                  onBlur={() => triggerValidation('lastName')}
                  error={errors.lastName}
                />
                <Input
                  onChangeText={(text) => setValue('phone', text)}
                  keyboardType="number-pad"
                  label="Phone Number"
                  // defaultValue={(phone && phone) || ''}
                  onBlur={() => triggerValidation('phone')}
                  error={errors.phone}
                  maxLength={11}
                />
                <Input
                  onChangeText={(text) => setValue('email', text)}
                  keyboardType="email-address"
                  label="Email"
                  autoCapitalize="none"
                  onBlur={() => triggerValidation('email')}
                  error={errors.email}
                />
              </Block>
              {/* /EnterPhysical */}

              {/* EnterLocation */}
              <Block key="location" scroll>
                <Dropdown
                  options={STATES}
                  defaultValue={'Select State'}
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
                  onDropdownWillHide={() => triggerValidation('state')}
                  error={errors.state}
                />

                <Dropdown
                  disabled={!activeState}
                  options={activeState && activeState.lgas}
                  defaultValue={activeState ? 'Select LGA..' : 'loading..'}
                  onSelect={handleLGASelect}
                  onDropdownWillHide={() => triggerValidation('lga')}
                  error={errors.lga}
                />
                <Input
                  label="District"
                  onChangeText={(text) => setValue('district', text)}
                  onBlur={() => triggerValidation('district')}
                  error={errors.district}
                />
                <Input
                  label="Address"
                  onChangeText={(text) => setValue('address', text)}
                  onBlur={() => triggerValidation('address')}
                  error={errors.address}
                />
              </Block>
              {/* / EnterLocation */}

              {/* EnterBio */}
              <Block key="bio" scroll>
                <Dropdown
                  options={GENDERS}
                  defaultValue="Gender"
                  onSelect={handleGenderSelect}
                  onDropdownWillHide={() => triggerValidation('gender')}
                  error={errors.gender}
                />
                <Text small muted marginVertical={2}>
                  Date of Birth
                </Text>
                <Block row flex={0} space="between">
                  <Dropdown
                    options={DATE}
                    onSelect={handleDateSelect}
                    defaultValue="Date"
                  />
                  <Dropdown
                    flex={1}
                    options={MONTHS}
                    onSelect={handleMonthSelect}
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
                    // onDropdownWillHide={() => triggerValidation('dateOfBirth')}
                    defaultValue="Year"
                  />
                </Block>
                {errors.dateOfBirth && (
                  <Text small error mtmedium>
                    {errors.dateOfBirth.message}
                  </Text>
                )}
                <Dropdown
                  options={EDUCATION_LEVELS}
                  defaultValue="Highest Degree"
                  onSelect={handleEducationSelect}
                  onDropdownWillHide={() => triggerValidation('education')}
                  error={errors.education}
                />
              </Block>
              {/* EnterBio */}
              {/* SetPassword */}
              <Block key="password" scroll>
                <Input
                  label="Set Pin"
                  maxLength={4}
                  secureTextEntry
                  keyboardType="number-pad"
                  onChangeText={(text) => setValue('pin', text)}
                  onBlur={() => triggerValidation('pin')}
                  error={errors.pin}
                />
                <Input
                  label="Confirm Pin"
                  secureTextEntry
                  maxLength={4}
                  keyboardType="number-pad"
                  onChangeText={(text) => setValue('confirmPin', text)}
                  onBlur={() => triggerValidation('confirmPin')}
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
          <Block flex={0} space="between" row>
            <Block>
              {activeView > 0 && (
                <Button
                  radius={0}
                  transparent
                  onPress={() => {
                    handleViewSelected('prev');
                  }}
                >
                  <Block center row left marginVertical={SIZES.base}>
                    <Ionicons
                      name="ios-arrow-back"
                      size={28}
                      color={COLORS.gray}
                    />
                    <Text left mtregular gray h5 marginHorizontal={SIZES.base}>
                      Back
                    </Text>
                  </Block>
                </Button>
              )}
            </Block>
            <Block>
              {activeView <= steps - 2 && (
                <Button
                  disabled={validating}
                  radius={0}
                  transparent
                  onPress={() => handleViewSelected('next')}
                >
                  <Block right row center marginVertical={SIZES.base}>
                    <Text
                      right
                      mtregular
                      primary
                      h5
                      marginHorizontal={SIZES.base}
                    >
                      Next
                    </Text>
                    <Ionicons
                      name="ios-arrow-forward"
                      size={28}
                      color={COLORS.primary}
                    />
                  </Block>
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
