import { call, put, takeLatest } from 'redux-saga/effects';
import { registerRyokanActions } from '../../registerRyokan';
import axios from '@/lib/api';

type photoUploadType = ReturnType<
  typeof registerRyokanActions.uploadPhotoStart
>;

const uploadFirebaseStorage = async ({
  payload: formData,
}: photoUploadType) => {
  try {
    const { data } = await axios.post('/api/file/fileUpload', formData);
    return { result: data };
  } catch (err: any) {
    console.error(err);
  }
};

function* photoUploadSaga(action: photoUploadType) {
  yield call(uploadFirebaseStorage, action);
}

export default function* watchPhotoUpload() {
  yield takeLatest('register/uploadPhotoStart', photoUploadSaga);
}
