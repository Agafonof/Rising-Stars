import { all } from 'redux-saga/effects';
import initWebSocketWatcher from './gameSaga';


export default function* rootSaga() {
  yield all([initWebSocketWatcher()]);
}
