/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from 'react';
import Block from '../../components/primary/Block';
import Header from '../../components/Header';
import { Camera } from 'expo-camera';
import ImageIcon from '../../components/primary/ImageIcon';
import Button from '../../components/primary/Button';
import Text from '../../components/primary/Text';
import { ActivityIndicator, Image } from 'react-native';
import { errorMessage, successMessage } from '../../utils/toast';
import { Modalize } from 'react-native-modalize';
import { SIZES } from '../../utils/theme';
import { COLORS } from '../../utils/theme';
import { ProgressBar } from 'react-native-paper';
// import {useAuthContext} from '../../context/auth/AuthContext'
import ObjectID from 'bson-objectid';
import { apiImageUplpoad } from '../../utils/fetcher';
const PhotoUpload = ({ navigation }) => {
  // context

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [cameraReady, setCameraReady] = useState(false);
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [photo, setPhoto] = useState(null);
  const cameraRef = useRef(null);
  const modalizeRef = useRef(null);

  const takePicture = async () => {
    if (cameraRef.current) {
      if (cameraReady) {
        let snap = await cameraRef.current.takePictureAsync({
          quality: 1,
          exif: false,
          skipProcessing: true,
          base64: false,
        });
        if (photo === null) {
          setPhoto(snap);
          modalizeRef.current?.open();
        }
      } else {
        errorMessage('camera not ready');
      }
    }
  };
  // handlers
  const handlePreviewClosed = () => {
    setPhoto(null);
    setSending(false);
  };

  const uploadComplete = (res) => {
    successMessage('image uploaded sucessfully');
    navigation.navigate('SellOutput', { image: JSON.stringify(res) });
  };
  const uploaFailed = (message) => {
    errorMessage('image upload failed' + message);
    setSending(false);
  };

  const uploadProgress = (progressValue) => {
    setProgress(progressValue);
  };
  const handleUpload = () => {
    setSending(true);
    let imageName = 'output-image-' + ObjectID() + '.jpg';
    apiImageUplpoad(
      imageName,
      photo,
      uploadComplete,
      uploaFailed,
      uploadProgress
    );
  };
  // effects
  useEffect(() => {
    const bootstrap = async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    bootstrap();
  }, []);
  // useEffect();
  if (hasPermission === null) {
    return (
      <Block center middle>
        <ActivityIndicator size="large" />
      </Block>
    );
  }
  if (hasPermission === false) {
    return (
      <Block center middle>
        <Text h4 center>
          No access to camera
        </Text>
      </Block>
    );
  }
  return (
    <Block background>
      <Header backTitle="Photo of item" />
      <Block center>
        <Block flex={3} space="evenly">
          <Camera
            flashMode={Camera.Constants.FlashMode.off}
            ratio="1:1"
            pictureSize="1280,1280"
            ref={cameraRef}
            onCameraReady={() => setCameraReady(true)}
            onMountError={(err) => errorMessage('Camera Error' + err.message)}
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
          </Camera>
          <Block marginTop={SIZES.base}>
            <Text black mtregular h4 center>
              Take a photo of your item
            </Text>
            <Text muted body mtmedium center marginTop={SIZES.padding}>
              This help us identify the item
            </Text>
          </Block>
        </Block>
        <Block middle>
          <Button onPress={takePicture} transparent height={68} width={68}>
            <ImageIcon name="camera" />
          </Button>
        </Block>
      </Block>
      <Modalize
        ref={modalizeRef}
        withHandle={true}
        handlePosition="inside"
        modalHeight={SIZES.height * 0.8}
        onClosed={() => handlePreviewClosed()}
      >
        <Block
          white
          paddingHorizontal={SIZES.padding}
          marginTop={SIZES.padding * 2}
          space="between"
        >
          <Text center h3 grey mtregular marginTop={SIZES.padding}>
            Image Preview
          </Text>
          {photo === null ? (
            <ActivityIndicator />
          ) : (
            <Image
              style={{
                width: SIZES.width * 0.9,
                height: SIZES.width * 0.9,
                marginTop: SIZES.padding,
              }}
              source={{ uri: photo.uri }}
            />
          )}
          {sending ? (
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
            <Button marginTop={SIZES.padding} onPress={handleUpload}>
              <Text center h4 mtmedium white>
                Upload
              </Text>
            </Button>
          )}
        </Block>
      </Modalize>
    </Block>
  );
};

export default PhotoUpload;
