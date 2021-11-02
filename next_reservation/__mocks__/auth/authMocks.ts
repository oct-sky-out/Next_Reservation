import * as reactRedux from 'react-redux';
import * as customSelecor from '../../store/index';

export let useSelectorMock = jest.spyOn(customSelecor, 'useSelector');
export let useDispatchMock = jest.spyOn(reactRedux, 'useDispatch');

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
