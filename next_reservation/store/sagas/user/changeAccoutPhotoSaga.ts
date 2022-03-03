import { call, put, select, takeLatest } from 'redux-saga/effects';
import { userSignInAndUpActions } from '../../userSignInAndUp';
import axios from '@/lib/api';
import { RootState } from '../../index';

type photoUploadType = ReturnType<
  typeof userSignInAndUpActions.uploadUserPicture
>;
type photoRemoveType = ReturnType<
  typeof userSignInAndUpActions.removeUserPicture
>;
type photoModifyType = ReturnType<
  typeof userSignInAndUpActions.modifyUserPicture
>;

const getEmail = (state: RootState) => state.user.data.email;

const updateImagePath = async (email: string, imagePath: string) => {
  try {
    const { data } = await axios.patch<{ state: string }>(
      '/api/accountImage/ipdateImagePath',
      { email, imagePath }
    );
    return data;
  } catch (err) {
    console.error(err);
  }
};

// * Photo Upload
const uploadFirebaseStorage = async ({
  payload: formData,
}: photoUploadType) => {
  try {
    const { data } = await axios.post<{
      state: string;
      photoUrl: string;
      photoName: string;
    }>('/api/accountImage/upload', formData);
    if (data.state !== 'success') throw { message: '사진 업로드 실패' };
    return { result: data };
  } catch (err: any) {
    console.error(err);
  }
};

function* photoUploadSaga(action: photoUploadType) {
  const { result } = yield call(uploadFirebaseStorage, action);
  yield put(
    userSignInAndUpActions.setUserPicture({
      height: 200,
      width: 200,
      src: result.photoUrl,
    })
  );
  const email = getEmail(yield select());
  yield call(updateImagePath, email, result.photoUrl);
}

// * Photo Delete
const removeFirebaseStorage = async ({ payload }: photoRemoveType) => {
  try {
    const { data } = await axios.post<{
      state: string;
      removePhotoName: string;
      newPhotoPath: string;
    }>('/api/accountImage/remove', { removePhotoFileName: payload });
    if (data.state !== 'success')
      throw { message: '사진 삭제에 실패하였습니다.' };
    return { result: data };
  } catch (err: any) {
    console.error(err);
  }
};

function* removePhotoSaga(action: photoRemoveType) {
  try {
    const { result } = yield call(removeFirebaseStorage, action);
    yield put(
      userSignInAndUpActions.setUserPicture({
        height: 100,
        width: 100,
        src: result.newPhotoPath,
      })
    );
    const email = getEmail(yield select());
    yield call(updateImagePath, email, result.newPhotoPath);
  } catch (err: any) {
    console.error(err);
  }
}

// * Photo modify
const modifyFirebaseStorage = async ({ payload }: photoModifyType) => {
  try {
    const { data } = await axios.post<{
      state: string;
      photoUrl: string;
      photoName: string;
    }>('/api/accountImage/modify', payload.fileBuffer, {
      params: {
        photoName: payload.photoName,
      },
    });
    if (data.state !== 'success')
      throw { message: '사진 삭제에 실패하였습니다.' };
    return { result: data };
  } catch (err: any) {
    console.error(err);
  }
};

function* modifyPhotoSaga(action: photoModifyType) {
  try {
    const { result } = yield call(modifyFirebaseStorage, action);
    yield put(
      userSignInAndUpActions.setUserPicture({
        height: 200,
        width: 200,
        src: result.photoUrl,
      })
    );
    const email = getEmail(yield select());
    yield call(updateImagePath, email, result.photoUrl);
  } catch (err: any) {
    console.error(err);
  }
}

export function* watchAccountPhotoUpload() {
  yield takeLatest('user/uploadUserPicture', photoUploadSaga);
}
export function* watchAccountPhotoRemove() {
  yield takeLatest('user/removeUserPicture', removePhotoSaga);
}
export function* watchAccountPhotoModify() {
  yield takeLatest('user/modifyUserPicture', modifyPhotoSaga);
}
