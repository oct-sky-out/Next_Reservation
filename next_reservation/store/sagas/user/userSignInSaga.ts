import { call, put, takeLatest } from 'redux-saga/effects';
import { LoginFormType, userSignInActions } from '../../user/userSignIn';
import axios from '../../../lib/api';
import {
  IFirebaseSignUpError,
  IFirebaseSignUpResult,
} from '../../../pages/api/auth/FirebaseSignUp';

const signUpApi = ({ email, password }: LoginFormType) => {
  return axios.post<IFirebaseSignUpResult>('/api/auth/FirebaseSignIn', {
    email,
    password,
  });
};

function* fetchSignInSaga({
  payload,
}: ReturnType<typeof userSignInActions.userSignIn>) {
  try {
    const { data } = yield call(signUpApi, payload);
    yield put(userSignInActions.userSignInSuccess(data));
  } catch (error: any) {
    const { data } = error.response;
    yield put(userSignInActions.userSignInFailure(data));
  }
}

// SIGNUP DISPATCH EVENT WATCH
export default function* watchSignUp() {
  yield takeLatest('user/userSignIn', fetchSignInSaga);
}
