/**
 * @jest-environment node
 */
import { firestroeAdmin } from '../../../firebaseAdmin';

test('모든 유저의 등록된 료칸 가져오기', async () => {
  //* return type = FirebaseFirestore.QueryDocumentSnapshot<FirebaseFirestore.DocumentData>[]
  const ryokanCollection = firestroeAdmin().collection('RegisterRyokans');
  await (
    await ryokanCollection.orderBy('title').startAt(0).limit(1).get()
  ).docs.forEach((doc) =>
    expect(doc.data().ryokanManager).toBe('kms3335k@naver.com')
  );
});
