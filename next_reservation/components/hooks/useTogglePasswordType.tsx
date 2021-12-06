import { useCallback, useReducer } from 'react';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

type ActionType = { type: 'PWD_FIELD' | 'CHECK_PWD_FIELD' };

const initState = {
  passwordField: 'password',
  checkPaswordField: 'password',
};

const reducer = (state: typeof initState, action: ActionType) => {
  switch (action.type) {
    case 'PWD_FIELD':
      if (state.passwordField === 'password')
        return { ...state, passwordField: 'text' };
      else return { ...state, passwordField: 'password' };
    case 'CHECK_PWD_FIELD':
      if (state.checkPaswordField === 'password')
        return { ...state, checkPaswordField: 'text' };
      else return { ...state, checkPaswordField: 'password' };
    default:
      return state;
  }
};

const usePasswordType = () => {
  const [checkState, dispatch] = useReducer(reducer, initState);

  const getCheckState = () => checkState;

  const isShowing = useCallback(
    (state: string, filedType: 'PWD_FIELD' | 'CHECK_PWD_FIELD') =>
      state === 'password' ? (
        <AiFillEyeInvisible
          data-testid="changeTypeText"
          onClick={() => dispatch({ type: filedType })}
        />
      ) : (
        <AiFillEye
          data-testid="changeTypePassword"
          onClick={() => dispatch({ type: filedType })}
        />
      ),
    [checkState]
  );

  return { getCheckState, isShowing };
};

export default usePasswordType;
