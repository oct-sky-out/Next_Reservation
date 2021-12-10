import { all } from 'redux-saga/effects';
import watchSignIn from './user/userSignInSaga';
import watchSignUp from './user/userSignUpSaga';
import watchBedroomCountAndPersonnel from './ryokanRegister/registerBedrooms';
import watchPhotoUpload from './ryokanRegister/registerPhotos';

export default function* rootSaga() {
  yield all([
    watchSignIn(),
    watchSignUp(),
    watchBedroomCountAndPersonnel(),
    watchPhotoUpload(),
  ]);
}
