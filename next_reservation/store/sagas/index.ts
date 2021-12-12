import { all, fork } from 'redux-saga/effects';
import watchSignIn from './user/userSignInSaga';
import watchSignUp from './user/userSignUpSaga';
import watchBedroomCountAndPersonnel from './ryokanRegister/registerBedrooms';
import {
  watchPhotoUpload,
  watchPhotoDelete,
  watchPhotoModify,
} from './ryokanRegister/registerPhotos';

export default function* rootSaga() {
  yield all([
    fork(watchSignIn),
    fork(watchSignUp),
    fork(watchBedroomCountAndPersonnel),
    watchPhotoUpload(),
    watchPhotoDelete(),
    watchPhotoModify(),
  ]);
}
