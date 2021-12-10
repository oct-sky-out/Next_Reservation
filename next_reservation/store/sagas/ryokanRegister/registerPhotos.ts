import { call, put, takeLatest, select } from 'redux-saga/effects';
import { registerRyokanActions } from '../../registerRyokan';
import axios from '@/lib/api';
import { RootState } from '../../index';

type photoUploadType = ReturnType<
  typeof registerRyokanActions.uploadPhotoStart
>;

const getUploadedPhotos = (state: RootState) => state.registerRyokan.photos;

const uploadFirebaseStorage = async ({
  payload: formData,
}: photoUploadType) => {
  try {
    const { data } = await axios.post<{ photoUrl: string }>(
      '/api/file/fileUpload',
      formData
    );
    return { result: data.photoUrl };
  } catch (err: any) {
    console.error(err);
  }
};

function* photoUploadSaga(action: photoUploadType) {
  const { result } = yield call(uploadFirebaseStorage, action);
  const photos = getUploadedPhotos(yield select());
  yield put(registerRyokanActions.setPhotos([...photos, result]));
}

export default function* watchPhotoUpload() {
  yield takeLatest('register/uploadPhotoStart', photoUploadSaga);
}
