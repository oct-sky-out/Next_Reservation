import { call, put, select, takeLatest, all } from 'redux-saga/effects';
import { ryokanFormActions } from '../../ryokanForm';
import axios from '@/lib/api';
import { RootState } from '../../index';

type photoUploadType = ReturnType<typeof ryokanFormActions.uploadPhotoStart>;
type photoDeleteType = ReturnType<typeof ryokanFormActions.deletePhoto>;
type photoModifyType = ReturnType<typeof ryokanFormActions.modifyPhoto>;

const getUploadedPhotos = (state: RootState) => state.ryokanForm.photos;

// Photo Upload
const uploadFirebaseStorage = async ({
  payload: formData,
}: photoUploadType) => {
  try {
    const { data } = await axios.post<{ photoUrl: string; photoName: string }>(
      '/api/file/fileUpload',
      formData
    );
    if (!data.photoUrl) throw { message: '사진 업로드 실패' };
    return { result: data };
  } catch (err: any) {
    console.error(err);
  }
};

function* photoUploadSaga(action: photoUploadType) {
  const { result } = yield call(uploadFirebaseStorage, action);
  yield put(
    ryokanFormActions.setPhoto({
      photoUrl: result.photoUrl,
      photoName: result.photoName,
    })
  );
}

// Photo Delete
const deleteFirebaseStorage = async ({ payload }: photoDeleteType) => {
  try {
    const { data } = await axios.post<{
      state: string;
      removePhotoName: string;
    }>('/api/file/fileDelete', { removePhotoFileName: payload });
    // 성공시 data에는 success가 들어옴
    return { result: data };
  } catch (err: any) {
    console.error(err);
  }
};

function* deletePhotoSaga(action: photoDeleteType) {
  try {
    const { result } = yield call(deleteFirebaseStorage, action);
    if (result.state !== 'success')
      throw { message: '사진 삭제에 실패하였습니다.' };

    const photos = getUploadedPhotos(yield select());
    const deletedPhotos = photos.filter(
      (photo) => photo.photoName !== result.removePhotoName
    );

    yield put(ryokanFormActions.setPhotos(deletedPhotos));
  } catch (err: any) {
    console.error(err);
  }
}

// Photo modify
const modifyFirebaseStorage = async ({ payload }: photoModifyType) => {
  try {
    const { data } = await axios.post<{
      photoUrl: string;
      photoName: string;
    }>('/api/file/fileModify', payload.formData, {
      params: {
        photoName: payload.photoName,
      },
    });
    return { result: data };
  } catch (err: any) {
    console.error(err);
  }
};

function* modifyPhotoSaga(action: photoModifyType) {
  try {
    const { result } = yield call(modifyFirebaseStorage, action);
    const photos = getUploadedPhotos(yield select());
    const modifiedPhoto = photos.map((photo, index) => {
      if (index === action.payload.photoNo) {
        return { photoName: result.photoName, photoUrl: result.photoUrl };
      }
      return photo;
    });
    yield put(ryokanFormActions.setPhotos(modifiedPhoto));
  } catch (err: any) {
    console.error(err);
  }
}

export function* watchPhotoUpload() {
  yield takeLatest('ryokanForm/uploadPhotoStart', photoUploadSaga);
}
export function* watchPhotoDelete() {
  yield takeLatest('ryokanForm/deletePhoto', deletePhotoSaga);
}
export function* watchPhotoModify() {
  yield takeLatest('ryokanForm/modifyPhoto', modifyPhotoSaga);
}
