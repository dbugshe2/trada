/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';

import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import Input from '../../components/primary/Input';
import Button from '../../components/primary/Button';
import STATES from '../../constants/states';
import Dropdown from '../../components/Dropdown';
import { SIZES, COLORS } from '../../utils/theme';
import { Image, ActivityIndicator, ImageBackground } from 'react-native';
import {
  GENDERS,
  MONTHS,
  DATE,
  YEARS,
  EDUCATION_LEVELS,
} from '../../constants/onboarding';
import { useAuthContext } from '../../context/auth/AuthContext';
import { useForm } from 'react-hook-form';
import { captureException } from '@sentry/react-native';
import { apiGet, apiPost } from '../../utils/fetcher';
import {
  errorMessage,
  loadingMessage,
  clearMessage,
  successMessage,
  toast,
} from '../../utils/toast';
import moment from 'moment';
import ImageIcon from '../../components/primary/ImageIcon';
import ImagePicker from 'react-native-image-picker';
import { RefreshControl } from 'react-native';
import { setUser as setLocalUser } from '../../utils/asyncstorage';

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
  const [profileImage, setProfileImage] = useState(null);
  const [sending, setSending] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [user, setUser] = useState(null);

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
        navigation.navigate('Home');
      }
    } catch (error) {
      captureException(error);
    } finally {
      setSending(false);
    }
  };

  const handleSelectImage = async () => {
    const options = {
      title: 'Select Avatar',
      mediaType: 'photo',
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'trada',
        cameraRoll: true,
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('picker response', response);

      if (response.didCancel) {
        errorMessage('Operation cancelled');
      } else if (response.error) {
        errorMessage('ImagePicker Error: ', response.error);
      } else {
        setProfileImage(response.uri);
        try {
          let percent = '0';
          let uploading = loadingMessage('uploading photo...');
          let xhr = new XMLHttpRequest();
          xhr.open(
            'POST',
            'https://api.cloudinary.com/v1_1/standesu/image/upload'
          );
          xhr.withCredentials = false;
          xhr.onload = async () => {
            console.log('worked aparently', xhr);
            clearMessage(uploading);
            toast('image uploaded');
            let uploaded = JSON.parse(xhr._response);
            let token = await validateToken();
            if (token) {
              const res = await apiPost(
                '/users/update',
                {
                  firstName: firstName,
                  lastName: lastName,
                  address: address,
                  lga: lga,
                  state: state,
                  gender: gender,
                  district: district,
                  street: street,
                  education: education,
                  profileImage: uploaded.secure_url,
                },
                token,
                true
              )
                .unauthorized((err) => {
                  errorMessage('unauthorized: ' + err.json.message);
                })
                .notFound((err) => {
                  errorMessage('not found:' + err.json.message);
                })
                .timeout((err) => errorMessage('timeout: ', +err.json.message))
                .error(403, (err) => {
                  console.log(err);
                  errorMessage('Error: ' + err.json.message);
                })
                .internalError((err) => {
                  errorMessage('server Error: ' + err.json.message);
                })
                .fetchError((err) => {
                  errorMessage('Network error: ' + err.json.message);
                })
                .json();
              if (res) {
                console.log(res);
                successMessage('avatar updated');
              }
            }
          };

          xhr.onerror = () => {
            console.log(xhr);
            clearMessage(uploading);
            errorMessage('Error: ' + xhr._response);
          };
          // 4. catch for request timeout
          xhr.ontimeout = (e) => {
            clearMessage(uploading);
            console.log(e, 'cloudinary timeout');
          };

          const formData = new FormData();
          formData.append('file', {
            uri: response.uri,
            type: response.type,
            name: response.fileName,
          });
          // formData.append('cloud_name', 'standesu');
          formData.append('upload_preset', 'a7f8xzby');

          xhr.send(formData);
          // if (xhr.upload) {
          //   xhr.upload.onprogress = ({ total, loaded }) => {
          //     let uploadProgress = loaded / total;
          //     percent = parseFloat(uploadProgress * 100).toFixed(0);
          //   };
          // }
        } catch (error) {
          console.log(error);
          captureException(error);
        }
      }
    });
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
    // register(
    //   { name: 'dateOfBirth' },
    //   {
    //     required: 'please enter your date of birth',
    //     pattern: {
    //       value: /^\d{1,2}\/\d{1,2}\/\d{4}$/,
    //       message: 'please complete entering your date of birth',
    //     },
    //   }
    // );
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
          .fetchError((err) => console.log('Network error', err))
          .json();
        if (res) {
          setUser(res.data);
          setProfileImage(res.data.profileImage);
          console.log(res);
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
          // setDateOfBirth(moment(res.data.dateOfBirth).format('DD-MM-YYYY'));
          // const dobArray = dateOfBirth.split('-');
          // setDate(dobArray[0]);
          // setMonth(dobArray[1]);
          // setYear(dobArray[2]);
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
          .fetchError((err) => console.log('Network error', err))
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
  const onRefresh = React.useCallback(() => {
    try {
      setRefreshing(true);
      fetchUserDetails();
      setLocalUser(JSON.stringify(user));
    } catch (error) {
      captureException(error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshing]);
  return (
    <Block background>
      {loading ? (
        <Block center middle>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </Block>
      ) : (
        <Block paddingHorizontal={SIZES.padding} paddingTop={SIZES.base}>
          <Block
            scroll
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <Block marginTop={SIZES.padding} center middle flex={0}>
              <Block width={116}>
                <Image
                  source={{
                    uri:
                      (profileImage && profileImage) ||
                      'https://via.placeholder.com/116?text="No Image"',
                  }}
                  style={{ width: 116, height: 116, borderRadius: 116 }}
                />
                <Button
                  onPress={handleSelectImage}
                  disabled
                  width={48}
                  height={48}
                  white
                  style={{
                    position: 'absolute',
                    top: 80,
                    right: 0,
                    borderRadius: 48,
                    alignItems: 'center',
                  }}
                >
                  <ImageIcon name="cameraAlt" />
                </Button>
              </Block>
            </Block>
            <Text small muted marginVertical={2}>
              First Name
            </Text>
            <Input
              defaultValue={(user.firstName && user.firstName) || ''}
              placeholder="First Name"
              error={errors.firstName}
              onChangeText={(text) => setFirstName(text)}
            />
            <Text small muted marginVertical={2}>
              Last Name
            </Text>
            <Input
              defaultValue={(user.lastName && user.lastName) || ''}
              placeholder="Last Name"
              error={errors.lastName}
              onChangeText={(text) => setLastName(text)}
            />
            <Text small muted marginVertical={2}>
              Address
            </Text>
            <Input
              defaultValue={(user.address && user.address) || ''}
              placeholder="Address"
              error={errors.address}
              onChangeText={(text) => setAddress(text)}
            />
            <Text small muted marginVertical={2}>
              District
            </Text>
            <Input
              defaultValue={(user.district && user.district) || ''}
              placeholder="District"
              error={errors.district}
              onChangeText={(text) => setDistrict(text)}
            />
            <Text small muted marginVertical={2}>
              Street Name
            </Text>
            <Input
              defaultValue={(user.street && user.street) || ''}
              placeholder="Street"
              error={errors.street}
              onChangeText={(text) => setStreet(text)}
            />
            <Text small muted marginVertical={2}>
              Gender
            </Text>
            <Dropdown
              options={GENDERS}
              defaultValue={(user.gender && user.gender) || 'Gender'}
              onSelect={handleGenderSelect}
              error={errors.gender}
            />
            <Text small muted marginVertical={2}>
              Education Level
            </Text>
            <Dropdown
              options={EDUCATION_LEVELS}
              defaultValue={(user.education && user.education) || 'Education'}
              error={errors.education}
              onSelect={handleEducationSelect}
            />
            <Text small muted marginVertical={2}>
              State
            </Text>
            <Dropdown
              options={STATES}
              renderRow={renderStateItem}
              defaultValue={(user.state && user.state) || 'State'}
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
              defaultValue={user.lga ? user.lga : 'Select LGA'}
              onSelect={handleLgaSelected}
              error={errors.lga}
            />
            {/* <Text small muted marginVertical={2}>
              {`Date of Birth  (${
                dateOfBirth && moment(user.dateOfBirth).format('DD-MM-YYYY')
              })`}
            </Text> */}
            {/* <Block row>
              <Dropdown
                options={DATE}
                flex={2}
                // defaultValue={(date && date) || 'Date'}
                onSelect={handleDateSelect}
              />
              <Dropdown
                options={MONTHS}
                marginHorizontal={8}
                flex={3}
                // defaultValue={(month && month) || 'Month'}
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
                // defaultValue={(year && year) || 'Year'}
                onSelect={handleYearSelect}
              />
            </Block>
            {errors.dateOfBirth && (
              <Text small primary>
                {errors.dateOfBirth.message}
              </Text>
            )} */}
          </Block>
          <Block flex={0} paddingVertical={SIZES.base}>
            {sending ? (
              <ActivityIndicator size="large" color={COLORS.primary} />
            ) : (
              <Button onPress={onSubmit} disabled>
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
