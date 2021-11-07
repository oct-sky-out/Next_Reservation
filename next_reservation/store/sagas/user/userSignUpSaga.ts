import { call, put, takeLatest } from 'redux-saga/effects';
import { userSignInAndUpActions } from '../../user/userSignInAndUp';
import {
  AuthError,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  getAuth,
} from 'firebase/auth';
import { clientApp } from '../../../firebaseClient';
import { setDoc, doc, Timestamp, FirestoreError } from 'firebase/firestore';
import { USER_COLLECTION } from '../../../fireStoreDB';
import { SignUpFormType } from 'types/reduxActionTypes/ReduxUserActionTypes';

const signUpApi = async ({
  email,
  name,
  year,
  month,
  day,
  password,
  userPicture,
}: SignUpFormType) => {
  try {
    const auth = getAuth(clientApp);
    const brithDay = new Date(`${year}.${month}.${day}`);
    const createUserRes = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await sendEmailVerification(createUserRes.user);
    await setDoc(doc(USER_COLLECTION, email), {
      email,
      name,
      brithDay,
      isLogged: false,
      userPicture,
    });

    return {
      result: {
        type: 'success',
        email: createUserRes.user.email,
        name,
        brithDay,
        userPicture,
      },
    };
  } catch (error: AuthError | FirestoreError | any) {
    throw {
      type: 'error',
      code: error.code,
      message: error.message,
    };
  }
};

function* fetchSignInSaga({
  payload,
}: ReturnType<typeof userSignInAndUpActions.userSignUp>) {
  try {
    const { result } = yield call(signUpApi, payload);
    yield put(userSignInAndUpActions.userSignInOrUpSuccess(result));
  } catch (error: any) {
    const data = error;
    yield put(userSignInAndUpActions.userSignInOrFailure(data));
  }
}

// SIGNUP DISPATCH EVENT WATCH
export default function* watchSignUp() {
  yield takeLatest('user/userSignUp', fetchSignInSaga);
}
