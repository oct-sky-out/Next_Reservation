import { all, fork } from 'redux-saga/effects';
import watchSignIn from './user/userSignInSaga';
import watchSignUp from './user/userSignUpSaga';
import watchBedroomCountAndPersonnel from './ryokanRegister/registerBedrooms';
import {
  watchPhotoUpload,
  watchPhotoDelete,
  watchPhotoModify,
} from './ryokanRegister/registerPhotos';
import {
  watchAccountPhotoModify,
  watchAccountPhotoRemove,
  watchAccountPhotoUpload,
} from './user/changeAccoutPhotoSaga';

export default function* rootSaga() {
  yield all([
    fork(watchSignIn),
    fork(watchSignUp),
    fork(watchBedroomCountAndPersonnel),
    watchPhotoUpload(),
    watchPhotoDelete(),
    watchPhotoModify(),
    watchAccountPhotoUpload(),
    watchAccountPhotoRemove(),
    watchAccountPhotoModify(),
  ]);
}
