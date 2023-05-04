import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    flexGrow: 1,
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
  list: {
    backgroundColor: '#transparent',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FF7777',
    minWidth: 250,
    marginBottom: 10,
  },
  modal: {
    width: '80%',
    height: '70%',
    marginHorizontal: '10%',
    marginVertical: '15%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  modalView: {
    width: '88%',
    height: 350,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    overflow: 'hidden', // скрыть содержимое за границами модального окна
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonModal: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 20,
    padding: 10,
    minWidth: 200,
    elevation: 2,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  input: {
    flexGrow: 1,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: '#FF7777',
    borderRadius: 10,
    paddingHorizontal: 112,
    marginBottom: 15,
    color: 'black',

  },
});
