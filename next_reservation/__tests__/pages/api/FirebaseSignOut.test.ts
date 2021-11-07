/**
 * @jest-environment node
 */
import { USER_COLLECTION } from '../../../fireStoreDB';
import {
  doc,
  DocumentData,
  getDoc,
  setDoc,
  Timestamp,
} from 'firebase/firestore';

test('로그아웃 | 리덕스의 이메일로 파이어베이스 스토어에서 사용자 조회 후 로그인 상태 fasle 변환', async () => {
  let documentData: DocumentData | undefined = {
    name: '',
    userPicture: '',
    brithDay: Timestamp.fromDate(new Date(Date.now())),
    isLogged: false,
    email: '',
  };

  documentData = (
    await getDoc(doc(USER_COLLECTION, 'abc123@google.com'))
  ).data();
  if (documentData !== undefined) {
    await setDoc(doc(USER_COLLECTION, 'abc123@google.com'), {
      ...documentData,
      data: {
        type: '',
        email: '',
        brithDay: 0,
        name: '',
        userPicture: new Object(null),
      },
      brithDay: new Date(documentData.brithDay.seconds * 1000),
      isLogged: false,
    });
  }
});
