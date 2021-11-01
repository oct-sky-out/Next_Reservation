import { all, call } from 'redux-saga/effects';
import watchSignIn from './user/userSignInSaga';

export default function* rootSaga() {
  yield all([watchSignIn()]);
}
