import * as reactRedux from 'react-redux';
import { useMockStore } from '../../store/index';
import * as customSelecor from '../../store/index';

const store = useMockStore;
const dispatchMock = jest.fn(store.dispatch);
store.dispatch = dispatchMock;

export let useSelectorMock = jest.spyOn(customSelecor, 'useSelector');
export let useDispatchMock = dispatchMock;

export const mockStoreValue = {
  loginForm: {
    email: '',
    password: '',
  },
  data: {
    type: '',
    email: '',
    isLogged: false,
  },
  error: {
    type: '',
    code: '',
    message: '',
  },
};
