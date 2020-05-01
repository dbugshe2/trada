import React, { useState, useEffect } from 'react';

import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import Input from '../../components/primary/Input';
import Button from '../../components/primary/Button';
import STATES from '../../constants/states';
import Dropdown from '../../components/Dropdown';
import { SIZES, COLORS } from '../../utils/theme';
import { Image, ActivityIndicator } from 'react-native';
import {
  GENDERS,
  MONTHS,
  DATE,
  YEARS,
  EDUCATION_LEVELS,
} from '../../constants/onboarding';
import { useAuthContext } from '../../context/auth/AuthContext';
import { useForm } from 'react-hook-form';
import { captureException } from 'sentry-expo';
import { apiGet, apiPost } from '../../utils/fetcher';
import {
  errorMessage,
  loadingMessage,
  clearMessage,
  successMessage,
} from '../../utils/toast';
import moment from 'moment';

const PersonalInfo = ({ navigation }) => {
  // context
  const { validateToken } = useAuthContext();

  // form hook
  const { register, setValue, getValues, handleSubmit, errors } = useForm();

  // state
  const [loading, setLoading] = useState(true);
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [address, setAddress] = useState(null);
  const [lga, setLGA] = useState(null);
  const [state, setState] = useState(null);
  const [dateOfBirth, setDateOfBirth] = useState(null);
  const [gender, setGender] = useState(null);
  // const [phone, setPhone] = useState(null);
  // const [email, setEmail] = useState(null);
  const [district, setDistrict] = useState(null);
  const [street, setStreet] = useState(null);
  const [education, setEducation] = useState(null);
  const [date, setDate] = useState(null);
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [sending, setSending] = useState(false);

  const [activeState, setActiveState] = useState(null);

  // handlers

  const handleStateSelected = (id, stateObj) => {
    setActiveState(stateObj);
    setState(stateObj.name);
  };

  const handleLgaSelected = (id, lgaName) => {
    setLGA(lgaName);
  };
  const handleGenderSelect = (id, genderValue) => {
    setGender(genderValue);
  };
  const handleEducationSelect = (id, educationValue) => {
    setEducation(educationValue);
  };
  const handleDateSelect = (id, dateValue) => {
    setDate(dateValue);
  };
  const handleMonthSelect = (id, monthObj) => {
    setMonth(monthObj.value);
  };
  const handleYearSelect = (id, yearValue) => {
    setYear(yearValue);
  };
  const onSubmit = async () => {
    try {
      setSending(true);

      if (date !== null || month !== null || year !== null) {
        setDateOfBirth(`${date}-${month}-${year}`);
      }

      setValue(
        [
          { firstName: firstName },
          { lastName: lastName },
          // { phone: phone },
          { lga: lga },
          { state: state },
          { street: street },
          { district: district },
          // { email: email },
          { gender: gender },
          { address: address },
          { education: education },
          { dateOfBirth: dateOfBirth }, // TODO
        ],
        true
      );
      if (Object.entries(errors).length > 0) {
        setSending(false);
      } else {
        await updateUserDetails(getValues());
        navigation.navigate('App');
      }
    } catch (error) {
      captureException(error);
    } finally {
      setSending(false);
    }
  };

  // render Functions
  const renderStateItem = (item, index, isSelected) => (
    <Text
      gray
      h6
      paddingHorizontal={SIZES.base}
      paddingVertical={SIZES.padding}
    >
      {item.name}
    </Text>
  );
  // effects
  useEffect(() => {
    register(
      { name: 'firstName' },
      { required: 'Please enter you first name' }
    );
    register({ name: 'lastName' }, { required: 'Please enter your last name' });

    register(
      { name: 'state' },
      { required: 'Please select the state you live in' }
    );
    register(
      { name: 'street' },
      { required: 'Please enter the name of your street' }
    );
    register({ name: 'lga' }, { required: 'pleasse select your ' });
    register({ name: 'district' });
    register({ name: 'gender' }, { required: 'please select a gender' });
    register(
      { name: 'education' },
      { required: 'please select your education level' }
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
          value: /^\d{1,2}\/\d{1,2}\/\d{4}$/,
          message: 'please complete entering your date of birth',
        },
      }
    );
  }, [register]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  // api calls
  const fetchUserDetails = async () => {
    try {
      setLoading(true);
      const token = await validateToken();
      if (token) {
        const res = await apiGet('/users/find', {}, token, true)
          .unauthorized((err) => console.log('unauthorized', err))
          .notFound((err) => console.log('not found', err))
          .timeout((err) => console.log('timeout', err))
          .internalError((err) => console.log('server Error', err))
          .fetchError((err) => console.log('Netwrok error', err))
          .json();
        if (res) {
          setFirstName(res.data.firstName);
          setLastName(res.data.lastName);
          setLGA(res.data.lga);
          setState(res.data.state);
          setDistrict(res.data.district);
          // setPhone(res.data.phone);
          // setEmail(res.data.email);
          setAddress(res.data.address);
          setEducation(res.data.education);
          setStreet(res.data.street);
          setGender(res.data.gender);
          setDateOfBirth(moment(res.data.dateOfBirth).format('DD-MM-YYYY'));
          const dobArray = dateOfBirth.split('-');
          setDate(dobArray[0]);
          setMonth(dobArray[1]);
          setYear(dobArray[2]);
        }
      }
    } catch (error) {
      captureException(error);
    } finally {
      setLoading(false);
    }
  };

  const updateUserDetails = async (formData) => {
    try {
      setLoading(true);
      const token = await validateToken();
      if (token) {
        const res = await apiPost('/users/update', formData, token, true)
          .unauthorized((err) => console.log('unauthorized', err))
          .notFound((err) => console.log('not found', err))
          .timeout((err) => console.log('timeout', err))
          .internalError((err) => console.log('server Error', err))
          .fetchError((err) => console.log('Netwrok error', err))
          .json();
        if (res) {
          successMessage('Details Updated Successfully');
        }
      }
    } catch (error) {
      captureException(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Block background>
      {loading ? (
        <Block center middle>
          <ActivityIndicator color={COLORS.primary} />
        </Block>
      ) : (
        <Block paddingHorizontal={SIZES.padding} paddingTop={SIZES.base}>
          <Block scroll>
            <Text small muted marginVertical={2}>
              First Name
            </Text>
            <Input
              defaultValue={firstName}
              placeholder="First Name"
              error={errors.firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <Text small muted marginVertical={2}>
              Last Name
            </Text>
            <Input
              defaultValue={lastName}
              placeholder="Last Name"
              error={errors.lastName}
              onChangeText={(text) => setLastName(text)}
            />
            <Text small muted marginVertical={2}>
              Address
            </Text>
            <Input
              defaultValue={address}
              placeholder="Address"
              error={errors.address}
              onChangeText={(text) => setAddress(text)}
            />
            <Text small muted marginVertical={2}>
              District
            </Text>
            <Input
              defaultValue={district}
              placeholder="District"
              error={errors.district}
              onChangeText={(text) => setDistrict(text)}
            />
            <Text small muted marginVertical={2}>
              Street Name
            </Text>
            <Input
              defaultValue={street}
              placeholder="Street"
              error={errors.street}
              onChangeText={(text) => setStreet(text)}
            />
            <Text small muted marginVertical={2}>
              Gender
            </Text>
            <Dropdown
              options={GENDERS}
              defaultValue={(gender && gender) || 'Gender'}
              onSelect={handleGenderSelect}
              error={errors.gender}
            />
            <Text small muted marginVertical={2}>
              Education Level
            </Text>
            <Dropdown
              options={EDUCATION_LEVELS}
              defaultValue={(education && education) || 'Education'}
              error={errors.education}
              onSelect={handleEducationSelect}
            />
            <Text small muted marginVertical={2}>
              State
            </Text>
            <Dropdown
              options={STATES}
              renderRow={renderStateItem}
              defaultValue={(state && state) || 'State'}
              onSelect={handleStateSelected}
              renderButtonText={(stateItem, index, isSelected) => {
                return `${stateItem.name}`;
              }}
              error={errors.state}
            />
            <Text small muted marginVertical={2}>
              Local Governmnet Area
            </Text>
            <Dropdown
              options={activeState && activeState.lgas}
              defaultValue={lga ? lga : 'Select LGA'}
              onSelect={handleLgaSelected}
              error={errors.lga}
            />
            <Text small muted marginVertical={2}>
              {`Date of Birth  (${dateOfBirth && dateOfBirth})`}
            </Text>
            <Block row>
              <Dropdown
                options={DATE}
                flex={2}
                defaultValue={(date && date) || 'Date'}
                onSelect={handleDateSelect}
              />
              <Dropdown
                options={MONTHS}
                marginHorizontal={8}
                flex={3}
                defaultValue={(month && month) || 'Month'}
                renderRow={(monthItem, index, isSelected) => (
                  <Text
                    gray
                    h6
                    paddingHorizontal={SIZES.base}
                    paddingVertical={SIZES.padding}
                  >
                    {monthItem.name}
                  </Text>
                )}
                renderButtonText={(monthObj, index, isSelected) => {
                  return `${monthObj.name}`;
                }}
                onSelect={handleMonthSelect}
              />
              <Dropdown
                options={YEARS}
                marginLeft={10}
                flex={2}
                defaultValue={(year && year) || 'Year'}
                onSelect={handleYearSelect}
              />
            </Block>
            {errors.dateOfBirth && (
              <Text small primary>
                {errors.dateOfBirth.message}
              </Text>
            )}
          </Block>
          <Block flex={0} paddingVertical={SIZES.base}>
            {sending ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <Button onPress={onSubmit}>
                <Text white center h6>
                  Save
                </Text>
              </Button>
            )}
          </Block>
        </Block>
      )}
    </Block>
  );
};

export default PersonalInfo;
