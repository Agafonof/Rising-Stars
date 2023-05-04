import { Image, SafeAreaView, Text, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import CameraButton from '../UI/components/CameraButton';
import * as ImagePicker from 'expo-image-picker';
import { useEffect, useState } from 'react';
import Button from '../UI/components/Button';
import { setImage } from '../redux/user/userSlice';
import { loadPhotoAction } from '../redux/game/gameAction';
import { styles } from '../UI/style/styleLoadLabraryPhotoPage';

export default function LoadLabraryPhoto({ navigation }) {
  const dispatch = useAppDispatch();
  const [photo, setPhoto] = useState(null);
  const user = useAppSelector((state) => state.user);
  const [photoInSelector, setPhotoInSelector] = useState(false);

  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    // setPhoto('test');
    setPhoto(result.assets[0].base64);

  };

  if (hasGalleryPermission === false) {
    return <Text>Нет доступа к фотопленке</Text>;
  }

  const setPicture = () => {
    dispatch(setImage(photo));
    const userEdited = { ...user };
    userEdited.img = photo;
    dispatch(loadPhotoAction(userEdited));
    navigation.navigate('LoadPhotoPage');
  };

  useEffect(() => {
    if (user.img) {
      console.log(
        '============================= Load Library navigation ============================='
      );
      navigation.navigate('LoadPhotoPage');
    }
  }, [user.img]);

  return (
    <SafeAreaView>
      <View style={styles.cameraContainer}>
        {!photo ? (
          <View>
            <Button
              handler={() => {
                pickImage();
              }}
              title={'Выбрать из галереи'}
            />
          </View>
        ) : (
          <>
            <Image source={{ uri: "data:image/png;base64," +photo }} style={{ width: '100%', height: "80%" }} />
            <Button
              handler={setPicture}
              title={'Подтвердить'}
              // icon="check"
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
}
