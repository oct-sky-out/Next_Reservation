import { all } from 'redux-saga/effects';
import watchSignIn from './user/userSignInSaga';
import watchSignUp from './user/userSignUpSaga';

export default function* rootSaga() {
  yield all([watchSignIn(), watchSignUp()]);
}
