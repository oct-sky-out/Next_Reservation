import { call, put, takeLatest } from 'redux-saga/effects';
import { userSignInAndUpActions } from '../../user/userSignInAndUp';
import { AuthError, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebaseClient';
import {
  setDoc,
  doc,
  getDoc,
  DocumentData,
  Timestamp,
  FirestoreError,
} from 'firebase/firestore';
import { USER_COLLECTION } from '../../../fireStoreDB';
import { SignInFormType } from 'types/reduxActionTypes/ReduxUserActionTypes';

const signInApi = async ({ email, password }: SignInFormType) => {
  try {
    const loginRes = await signInWithEmailAndPassword(auth, email, password);

    // * 이메일 인증을 하지않으면 오류 발생
    if (!loginRes.user.emailVerified) {
      throw {
        type: 'error',
        code: '이메일 인증을 완료해주세요.',
        message:
          '이메일 인증을 완료해야 로그인이 가능합니다.\n가입하셨던 이메일을 확인하세요.',
      };
    }

    const token = await loginRes.user.getIdToken();

    const document = doc(USER_COLLECTION, email);

    // * 파이어 스토어 해당 유저의 로그인 상태를 true로 만듬
    let documentData: DocumentData | undefined = {
      name: '',
      userPicture: '',
      brithDay: Timestamp.fromDate(new Date(Date.now())),
      isLogged: false,
      email: '',
    };

    documentData = (await getDoc(document)).data();

    if (documentData) {
      const { email, name, brithDay, userPicture } = documentData;
      const dateBrithDay = new Date(brithDay.seconds * 1000);

      setDoc(doc(USER_COLLECTION, email), {
        ...documentData,
        brithDay: dateBrithDay,
        isLogged: true,
      });

      return {
        result: {
          type: 'success',
          email,
          name,
          brithDay: dateBrithDay,
          userPicture,
          token,
        },
      };
    }
    if (!documentData) {
      throw {
        type: 'error',
        code: '유저없음',
        message: '유저를 찾을 수 없습니다.',
      };
    }
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
}: ReturnType<typeof userSignInAndUpActions.userSignIn>) {
  try {
    const { result } = yield call(signInApi, payload);
    yield put(userSignInAndUpActions.userSignInOrUpSuccess(result));
  } catch (error: any) {
    const data = error;
    yield put(userSignInAndUpActions.userSignInOrFailure(data));
  }
}

// SIGNIN DISPATCH EVENT WATCH
export default function* watchSignUp() {
  yield takeLatest('user/userSignIn', fetchSignInSaga);
}
