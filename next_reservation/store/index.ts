import { AnyAction, Store } from 'redux';
import { HYDRATE, createWrapper, MakeStore } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSignInAndUp from './userSignInAndUp';
import ryokanForm from './ryokanForm';
import registerFormIsValid from './registerFormIsValid';
import modalOpenStateSlice from './modalOpen';
import rootSaga from './sagas';
import loadingSlice from './lodaing';
import searchRoomSlice from './searchRoom';
import searchResultsRoomsSlice from './searchResultsRyokans';
import ryokanDetailSlice from './ryokanDetail';
import reservationSlice from './reservation';
import myReservationsSlice from './myReservations';
import isRenderdSlice from './isRenderd';

// 여러개의 리듀서 컴바인
const rootReducer = combineReducers({
  user: userSignInAndUp.reducer,
  ryokanForm: ryokanForm.reducer,
  registerIsValid: registerFormIsValid.reducer,
  modalState: modalOpenStateSlice.reducer,
  loading: loadingSlice.reducer,
  searchRoom: searchRoomSlice.reducer,
  searchResultRyokan: searchResultsRoomsSlice.reducer,
  ryokanDetail: ryokanDetailSlice.reducer,
  reservation: reservationSlice.reducer,
  myReservations: myReservationsSlice.reducer,
  isRendered: isRenderdSlice.reducer,
});

// 스토어 타입
export type RootState = ReturnType<typeof rootReducer>;

let initialRootState: RootState;

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    if (state === initialRootState) {
      return {
        ...state,
        ...action.payload,
      };
    }
    return state;
  }
  return rootReducer(state, action);
};

const sagaMiddleware = createSagaMiddleware();

const initStore: MakeStore<Store<RootState>> = () => {
  const store = configureStore({
    reducer,
    middleware: [sagaMiddleware],
    devTools: true,
  });

  sagaMiddleware.run(rootSaga);
  initialRootState = store.getState();
  return store;
};

export const useMockStore = configureStore({
  reducer,
  middleware: [sagaMiddleware],
});

export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;

export const wrapper = createWrapper<Store<RootState>>(initStore);
