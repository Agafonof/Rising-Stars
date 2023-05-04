import React, { useEffect, useRef, useState } from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { styles } from '../UI/style/styleTakePhotoPage';
import { Camera, CameraType, FlashMode } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import CameraButton from '../UI/components/CameraButton';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setImage } from '../redux/user/userSlice';
import { loadPhotoAction } from '../redux/game/gameAction';

export default function TakePhoto({ navigation }) {
  const user = useAppSelector((state) => state.user);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [type, setType] = useState(CameraType.front);
  const [flash, setFlash] = useState(FlashMode.off);
  const cameraRef = useRef(null);

  const dispatch = useAppDispatch();

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  useEffect(() => {
    if (user.img) {
      console.log(
        '============================= Take Photo navigation ============================='
      );
      navigation.navigate('LoadPhotoPage');
    }
  }, [user.img]);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync({base64: true, quality: 0.1});
        // setPhoto('test');
        setPhoto(data.base64);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const setPicture = () => {
    dispatch(setImage(photo));
    const userEdited = { ...user };
    userEdited.img = photo;
    dispatch(loadPhotoAction(userEdited));
    navigation.navigate('LoadPhotoPage');
  };

  return (
    <View style={styles.cameraContainer}>
      {!photo ? (
        <>
          <Camera
            style={{ width: '100%', height: '80%' }}
            type={type}
            flashMode={flash}
            ref={cameraRef}
          ></Camera>
          <View>
            <CameraButton
              title={'take a picture'}
              icon="camera"
              onPress={takePicture}
            />
            <CameraButton
              onPress={toggleCameraType}
              title={'Flip Camera'}
              icon="ccw"
            />
          </View>
        </>
      ) : (
        <>
          <Image
            source={{ uri: "data:image/png;base64," +photo }}
            style={{ width: '100%', height: '80%' }}
          />
          <CameraButton
            onPress={setPicture}
            title={'Подтвердить'}
            icon="check"
          />
          <CameraButton
            onPress={() => setPhoto(null)}
            title={'Переснять'}
            icon="retweet"
          />
        </>
      )}
    </View>
  );
}
