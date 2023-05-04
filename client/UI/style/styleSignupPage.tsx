import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#transparent',
        alignItems: 'center',
        justifyContent: 'center',
      },
      text: {
        color: '#FF7777',
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 15,
      },
      inputContainer: {
        width: '76%',
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
      },
      input: {
        flexGrow: 1,
        paddingVertical: 20,
        borderWidth: 2,
        borderColor: '#FF7777',
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        color: 'white',
        backgroundColor: '#414141',
      },
      icon: {
        position: 'absolute',
        bottom: 34,
        right: 10,
      },
      button: {
        backgroundColor: '#6C6087',
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FF7777',
        minWidth: 280,
        textAlign: 'center',
      },
      buttonText: {
        color: '#FF7777',
        fontSize: 14,
        fontWeight: 'bold',
      },
});
