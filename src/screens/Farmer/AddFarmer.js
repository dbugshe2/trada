/* eslint-disable react-native/no-inline-styles */
import React, { useState, useRef, useEffect } from 'react';
import Block from '../../components/primary/Block';
import Text from '../../components/primary/Text';
import ViewPager from '@react-native-community/viewpager';
import Header from '../../components/Header';
import Button from '../../components/primary/Button';
import Input from '../../components/primary/Input';
import Dropdown from '../../components/Dropdown';
import { StyleSheet, Image, Keyboard, ActivityIndicator } from 'react-native';
import { SIZES, LINE_HEIGHTS } from '../../utils/theme';
import ImageIcon from '../../components/primary/ImageIcon';
import { GENDERS } from '../../constants/onboarding';
import { useForm } from 'react-hook-form';
import { COLORS } from '../../utils/theme';
import { apiPost } from '../../utils/fetcher';
import Toast from 'react-native-tiny-toast';
import STATES from '../../constants/states';
import { useAuthContext } from '../../context/auth/AuthContext';
// eslint-disable-next-line react-native/split-platform-components
import { Platform, PermissionsAndroid } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { Modalize } from 'react-native-modalize';
import { ProgressBar } from 'react-native-paper';
import { errorMessage, successMessage } from '../../utils/toast';
import ObjectID from 'bson-objectid';
import { apiImageUplpoad } from '../../utils/fetcher';
import { captureException } from '@sentry/react-native';
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

  const {
    register,
    setValue,
    getValues,
    triggerValidation,
    errors,
  } = useForm();
  const { validateToken } = useAuthContext();

  const [activeView, setActiveView] = useState(0);
  const [activeState, setActiveState] = useState(null);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [validating, setValidating] = useState(false);

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

  // photo upload states
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [cameraReady, setCameraReady] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [curImage, setCurImage] = useState(null);
  const cameraRef = useRef(null);
  const modalizeRef = useRef(null);

  let TabedViewRef = useRef(null);
  const steps = 5;

  const handleViewSelected = (direction) => {
    try {
      if (direction === 'prev' && activeView > 0) {
        setActiveView(activeView - 1);
        TabedViewRef.current?.setPage(activeView - 1);
      }
      if (direction === 'next' && activeView <= steps - 1) {
        Keyboard.dismiss();
        switch (activeView) {
          case 0:
            submitBio();
            break;
          case 1:
            submitFarmInfo();
            break;
          case 2:
            handlePhoto();
            break;
          case 3:
            handleUpload();
            break;
          case 4:
            submitForm();
            break;
          default:
            break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleScroll = (position) => {
    setActiveView(position);
  };

  const handleStateSelect = (id, state) => {
    setActiveState(state);
    setValue('state', state.name);
  };

  const handleLGASelect = (id, name) => {
    setValue('lga', name);
  };
  const handleGenderSelect = (id, genderValue) => {
    setValue('gender', genderValue);
  };

  const submitBio = async () => {
    const bio = await triggerValidation([
      'firstName',
      'lastName',
      'phone',
      'email',
      'gender',
      'street',
      'address',
    ]);
    if (bio) {
      TabedViewRef.current?.setPage(activeView + 1);
      setActiveView(activeView + 1);
    } else {
      errorMessage('form contains errros');
    }
  };
  const submitFarmInfo = async () => {
    const farmInfo = await triggerValidation([
      'state',
      'lga',
      'cropCultivated',
      'farmSizeHectarage',
      'kg_bagsAfterHarvest',
    ]);
    if (farmInfo) {
      TabedViewRef.current?.setPage(activeView + 1);
      setActiveView(activeView + 1);
    } else {
      errorMessage('form contains errros');
    }
  };

  const handlePhoto = () => {
    console.log(photo);
    TabedViewRef.current?.setPage(activeView + 1);
    setActiveView(activeView + 1);
  };

  const submitForm = async () => {
    setSending(true);
    try {
      const validated = await triggerValidation();
      if (validated) {
        const token = await validateToken();
        if (token) {
          const res = await apiPost('/farmers', getValues(), token, true)
            .unauthorized((err) => {
              errorMessage('unauthorized: ' + err.json.message);
            })
            .notFound((err) => {
              errorMessage('not found: ' + err.json.message);
            })
            .timeout((err) => {
              errorMessage('timeout: ' + err.json.message);
            })
            .error(403, (err) => {
              console.log(err);
              errorMessage('Error: ' + err.json.message);
            })
            .internalError((err) => {
              errorMessage('server Error: ' + err.json.message);
            })
            .fetchError((err) => {
              errorMessage('Network error: ', err.json.message);
            })
            .json();
          if (res) {
            successMessage('Farmer added');
            navigation.navigate('Farmers');
          }
          setSending(false);
        }
      } else {
        setSending(false);
        errorMessage('the form contains some errors');
      }
    } catch (error) {
      setSending(false);
      captureException(error);
    }
  };
  // camera handlers
  const takePicture = async () => {
    if (cameraRef.current) {
      if (cameraReady) {
        let snap = await cameraRef.current.takePictureAsync({
          quality: 1,
          exif: false,
          skipProcessing: true,
          base64: false,
        });
        setPhoto(snap);
        handleViewSelected('next');
      } else {
        errorMessage('camera not ready');
      }
    }
  };
  // handlers
  const handlePreviewClosed = () => {
    setPhoto(null);
    setUploading(false);
  };

  const uploadComplete = (res) => {
    successMessage('image uploaded sucessfully');
    console.log(res);
    setCurImage(res);
    setValue('farmerImage', res.secure_url);
    TabedViewRef.current?.setPage(activeView + 1);
    setActiveView(activeView + 1);
    setUploading(false);
  };
  const uploaFailed = (message) => {
    errorMessage('image upload FAILED: ' + message);
    setUploading(false);
  };

  const uploadProgress = (progressValue) => {
    setProgress(progressValue);
  };
  const handleUpload = () => {
    setUploading(true);
    let imageName = 'output-image-' + ObjectID() + '.jpg';
    apiImageUplpoad(
      imageName,
      photo,
      uploadComplete,
      uploaFailed,
      uploadProgress
    );
  };

  //effects

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
    register({ name: 'farmerImage' });
  }, [register]);

  useEffect(() => {
    const bootstrap = async () => {
      if (Platform.OS === 'android') {
        const status = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        setHasPermission(status === 'granted');
      }
    };
    bootstrap();
  }, []);

  const renderSummmaryItem = (title, value) => (
    <Block>
      <Text rbregular muted body>
        {title}
      </Text>
      <Text rbregular gray h6>
        {value}
      </Text>
    </Block>
  );

  if (hasPermission === null) {
    return (
      <Block center middle>
        <ActivityIndicator color={COLORS.primary} size="large" />
      </Block>
    );
  }
  if (hasPermission === false) {
    return (
      <Block background>
        <Header backTitle="Photo of Item" />
        <Block center middle>
          <Text h4 center>
            No access to camera
          </Text>
        </Block>
      </Block>
    );
  }

  return (
    <Block background>
      <Header backTitle />
      <Block
        flex={1}
        marginBottom={SIZES.padding * 3}
        paddingHorizontal={SIZES.padding}
      >
        <ViewPager
          style={{ flex: 1 }}
          ref={TabedViewRef}
          orientation="horizontal"
          initialPage={0}
          pageMargin={0}
          scrollEnabled={false}
          showPageIndicator={false}
          onPageSelected={(e) => {
            const position = e.nativeEvent.position;
            handleScroll(position);
          }}
        >
          {/* Bio */}
          <Block scroll showVerticalScrollIndicator={false}>
            <Text mtmedium gray h5 marginVertical={5}>
              Fill in farmers information to onboard.
            </Text>
            <Input
              onChangeText={(text) => setValue('firstName', text)}
              label="First Name"
              onBlur={() => triggerValidation('firstName')}
              error={errors.firstName}
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
            <Dropdown
              options={GENDERS}
              defaultValue="Gender"
              onSelect={handleGenderSelect}
              onDropdownWillHide={() => triggerValidation('gender')}
              error={errors.gender}
            />

            <Input
              label="Street"
              onChangeText={(text) => setValue('street', text)}
              onBlur={() => triggerValidation('street')}
              error={errors.address}
            />
            <Input
              label="Address"
              onChangeText={(text) => setValue('address', text)}
              onBlur={() => triggerValidation('address')}
              error={errors.address}
            />
          </Block>
          {/* FarmInfo */}
          <Block scroll>
            <Text mtmedium gray h5 marginVertical={5}>
              What crops do farmer cultivate?
            </Text>
            <Dropdown
              options={STATES}
              defaultValue={'Select State'}
              onDropdownWillHide={() => triggerValidation('state')}
              onSelect={handleStateSelect}
              error={errors.state}
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
              label="Crop type"
              onChangeText={(text) => setValue('cropCultivated', text)}
              onBlur={() => triggerValidation('cropCultivated')}
              error={errors.cropCultivated}
            />
            <Input
              label="Estimate farm size (hectare)"
              keyboardType="number-pad"
              onChangeText={(text) => setValue('farmSizeHectarage', text)}
              onBlur={() => triggerValidation(farmSizeHectarage)}
              error={errors.farmSizeHectarage}
            />
            <Input
              keyboardType="number-pad"
              label="Bags after harvest (kg)"
              onChangeText={(text) => setValue('kg_bagsAfterHarvest', text)}
              onBlur={() => triggerValidation('kg_bagsAfterHarvest')}
              error={errors.kg_bagsAfterHarvest}
            />
          </Block>
          {/* / FarmInfo */}
          {/* Take  Photo */}
          <Block center>
            <Block flex={3} space="evenly">
              <RNCamera
                flashMode={RNCamera.Constants.FlashMode.off}
                ratio="1:1"
                // pictureSize="1280,1280"
                ref={cameraRef}
                onCameraReady={() => setCameraReady(true)}
                onMountError={(err) =>
                  errorMessage('Camera Error' + err.message)
                }
                androidCameraPermissionOptions={{
                  title: 'Permission to use camera',
                  message: 'We need your permission to use your camera',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
                androidRecordAudioPermissionOptions={{
                  title: 'Permission to use audio recording',
                  message: 'We need your permission to use your audio',
                  buttonPositive: 'Ok',
                  buttonNegative: 'Cancel',
                }}
                type={type}
                style={{
                  flex: 0,
                  width: SIZES.width * 0.9,
                  height: SIZES.width * 0.9,
                }}
              >
                <Block
                  // eslint-disable-next-line react-native/no-color-literals
                  style={{
                    position: 'absolute',
                    top: 20,
                    bottom: 20,
                    left: 20,
                    right: 20,
                    borderWidth: 1,
                    borderColor: COLORS.white,
                    backgroundColor: 'transparent',
                  }}
                  transparent
                />
              </RNCamera>
              <Block marginTop={SIZES.base}>
                <Text black mtregular h4 center>
                  Take a photo fo the farmer
                </Text>
              </Block>
            </Block>
            <Block middle>
              <Button onPress={takePicture} transparent height={68} width={68}>
                <ImageIcon name="camera" />
              </Button>
            </Block>
          </Block>
          {/* /Take Photo */}

          {/* Confirm Photo */}
          <Block>
            <Text mtmedium gray h5 marginVertical={5}>
              Make sure farmers photo is not blurry.
            </Text>
            <Block scroll>
              <Block center flex={0}>
                {(photo && (
                  <Image
                    source={{
                      uri: photo.uri,
                    }}
                    style={{ width: 200, height: 200, borderRadius: 100 }}
                  />
                )) || (
                  <Text h2 gray mtregular>
                    No Image
                  </Text>
                )}

                <Block center marginVertical={SIZES.base} flex={0}>
                  <Text h6 gray rbregular>
                    Is this clear enough?
                  </Text>
                  <Text small center muted rbregular>
                    Make sure your face is clear enough and the photo is not
                    blurry
                  </Text>
                </Block>
              </Block>

              <Block marginVertical={SIZES.padding} flex={0}>
                {uploading ? (
                  <Block middle marginTop={SIZES.padding}>
                    <ProgressBar
                      style={{ height: SIZES.base }}
                      progress={progress}
                      color={COLORS.primary}
                    />
                    <Text primary h3 center>
                      {`${parseFloat(progress * 100).toFixed(0)} %`}
                    </Text>
                  </Block>
                ) : (
                  <Button
                    marginTop={SIZES.padding}
                    onPress={() => handleViewSelected('next')}
                  >
                    <Text white center h6 mtregular>
                      Yes use this one
                    </Text>
                  </Button>
                )}
              </Block>
              <Block flex={0}>
                {!uploading && (
                  <Button
                    secondary
                    onPress={() => {
                      handlePreviewClosed();
                      handleViewSelected('prev');
                    }}
                  >
                    <Text white center h6 mtregular>
                      Retake photo
                    </Text>
                  </Button>
                )}
              </Block>
            </Block>
          </Block>
          {/*  /Confirm Photo */}
          {/* Summary */}
          <Block>
            <Text mtregular gray h5>
              Summary
            </Text>
            <Block flex={0} center marginBottom={SIZES.base}>
              <Image
                source={{
                  uri:
                    (curImage && curImage.secure_url) ||
                    'https://via.placeholder.com/116?text="No Image"',
                }}
                style={{ width: 116, height: 116, borderRadius: 116 }}
              />
            </Block>

            <Block>
              <Block outlined white>
                <Block paddingHorizontal={SIZES.padding}>
                  {/* first column */}
                  <Block row space="between">
                    {renderSummmaryItem('First Name', getValues('firstName'))}
                    {renderSummmaryItem('Last Name', getValues('lastName'))}
                  </Block>
                  <Block row space="between">
                    {renderSummmaryItem('Phone', getValues('phone'))}
                    {renderSummmaryItem('State', getValues('state'))}
                  </Block>
                  <Block row space="between">
                    {renderSummmaryItem('LGA', getValues('lga'))}
                    {renderSummmaryItem(
                      'Crop Type',
                      getValues('cropCultivated')
                    )}

                    {/* second column */}
                  </Block>
                  <Block row space="between">
                    {renderSummmaryItem(
                      'Est. farm size (hec.)',
                      getValues('farmSizeHectarage')
                    )}
                    {renderSummmaryItem(
                      'Bags after harvest (kg)',
                      getValues('kg_bagsAfterHarvest')
                    )}
                  </Block>
                </Block>
              </Block>
            </Block>
            <Block marginTop={SIZES.padding} flex={0}>
              {sending ? (
                <ActivityIndicator color={COLORS.primary} size="small" />
              ) : (
                <Button onPress={submitForm}>
                  <Text white center h6>
                    Save
                  </Text>
                </Button>
              )}
            </Block>
          </Block>
          {/* /Summary */}
        </ViewPager>
      </Block>
      <Block flex={0} row space="between">
        {activeView > 0 && (
          <Button
            style={styles.prevButton}
            secondary
            onPress={() => handleViewSelected('prev')}
          >
            <Text white center body>
              Go Back
            </Text>
          </Button>
        )}
        {activeView <= steps - 4 && (
          <Button
            secondary
            onPress={() => handleViewSelected('next')}
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
