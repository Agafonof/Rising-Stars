import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 100,
        backgroundColor: 'rgba(32, 32, 32, 0.7)',
        paddingHorizontal: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 2,
        borderColor: '#FF7777',
        marginBottom: 30
      },
      scrollView: {
        flexGrow: 1,
        backgroundColor: '#transparent',
        alignItems: 'center',
        justifyContent: 'center',
      },
      leftContainer: {
        // flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
      },
      profileContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 10,
      },
      exitContainer: {
        justifyContent: 'center',
        // marginTop: 10,
      },
      textProf: {
        marginLeft: 10,
        marginBottom: 15,
        flexGrow: 1,
        color: '#FF7777',
        fontSize: 25,
        fontWeight: 'bold',
      },
      rightContainer: {
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      buttonMainPage: {
        marginTop: 15,
        backgroundColor: '#6C6087',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF7777',
        minWidth: 200,
        textAlign: 'center',
        marginBottom: 15,
      },
      buttonText: {
        color: '#FF7777',
        fontSize: 24,
        fontWeight: 'bold',
      },
      buttonOpen: {
        backgroundColor: '#6C6087',
        marginBottom: 10,
      },
      text: {
        color: '#FF7777',
        fontSize: 36,
        fontWeight: 'bold',
        marginBottom: 15,
      },
});
