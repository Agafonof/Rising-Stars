import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    cameraContainer: {
        // flex: 1,
        backgroundColor: '#transparent',
        justifyContent: 'center',
        alignItems: 'center',
      },
      cameraButton: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#transparent',
      },
      profileButton: {
        height: 70,
        width: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#transparent',
        borderWidth: 2,
        borderRadius: 50,
        borderColor: '#FF7777' 
      },
      exitButton: {
        height: 70,
        width: 70,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#transparent',
        // borderWidth: 2,
        // borderRadius: 50,
        // borderColor: '#FF7777' 
      },
      cameraText: {
        fontSize: 16,
        color: 'black',
        marginLeft: 10,
      },
});
