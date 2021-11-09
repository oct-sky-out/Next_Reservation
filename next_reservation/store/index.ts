import { AnyAction } from 'redux';
import { HYDRATE, createWrapper, MakeStore } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import {
  useSelector as useReduxSelector,
  TypedUseSelectorHook,
} from 'react-redux';
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import userSignInAndUp from './userSignInAndUp';
import rootSaga from './sagas';

// 여러개의 리듀서 컴바인
const rootReducer = combineReducers({
  user: userSignInAndUp.reducer,
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

const initStore: MakeStore<any> = () => {
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

export const wrapper = createWrapper(initStore);
