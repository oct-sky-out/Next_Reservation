import { call, select, put, takeLatest } from 'redux-saga/effects';
import { registerFormValidAction } from '@/store/registerFormIsValid';
import { RootState } from '@/store/index';

const getBedroomListAndPersonnel = (state: RootState) => ({
  bedroomList: state.ryokanForm.bedrooms.bedroomList,
  personnelCount: state.ryokanForm.bedrooms.personnel,
});

type callSagaArgType = ReturnType<typeof getBedroomListAndPersonnel>;

const checkBedroomCountAndPersonnel = ({
  bedroomList,
  personnelCount,
}: callSagaArgType) => {
  let isNotBedCountZero: boolean = true;
  Object.values(bedroomList).forEach((bedroom) => {
    for (const bed of bedroom) {
      if (!bed.count) {
        isNotBedCountZero = false;
        break;
      }
    }
  });
  if (personnelCount && isNotBedCountZero) return { result: true };
  return { result: false };
};

function* observationBedroomCountAndPersonnel() {
  const bedRoomListAndPersonnelCountObject = getBedroomListAndPersonnel(
    yield select()
  );
  const { result } = yield call(
    checkBedroomCountAndPersonnel,
    bedRoomListAndPersonnelCountObject
  );
  yield put(registerFormValidAction.setValid(result));
}

export default function* watchBedroomCountAndPersonnel() {
  yield takeLatest(
    [
      'ryokanForm/setBedroom',
      'ryokanForm/setBedroomList',
      'ryokanForm/setBedroomCount',
      'ryokanForm/setPersonnel',
    ],
    observationBedroomCountAndPersonnel
  );
}
