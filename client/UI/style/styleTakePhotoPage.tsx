import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  cameraContainer: {
    // flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    borderRadius: 0,
  },
  cameraButton: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#transparent',
  },
  cameraText: {
    fontSize: 16,
    color: 'black',
    marginLeft: 10,
  },
});
