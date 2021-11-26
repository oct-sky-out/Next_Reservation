import { all } from 'redux-saga/effects';
import watchSignIn from './user/userSignInSaga';
import watchSignUp from './user/userSignUpSaga';
import watchBedroomCountAndPersonnel from './ryokanRegister/registerBedrooms';

export default function* rootSaga() {
  yield all([watchSignIn(), watchSignUp(), watchBedroomCountAndPersonnel()]);
}
