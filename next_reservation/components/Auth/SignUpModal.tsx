import React, { useCallback, useReducer, useState } from 'react';
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import Input from '../common/Input';
import SignUpStyle from '../../styles/components/Auth/SignUpModal';

type ActionType = { type: 'PWD_FIELD' | 'CHECK_PWD_FIELD' };

const SignUp = () => {
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

  const [checkState, dispatch] = useReducer(reducer, initState);
  const [allInputValue, setAllInputValue] = useState({
    email: '',
    name: '',
    password1: '',
    password2: '',
  });

  const changeInputValue = useCallback(
    (
      prop: 'email' | 'name' | 'password1' | 'password2',
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setAllInputValue({ ...allInputValue, [prop]: e.target.value });
    },
    [allInputValue]
  );

  const isShowing = useCallback(
    (state: string, filedType: 'PWD_FIELD' | 'CHECK_PWD_FIELD') =>
      state === 'password' ? (
        <AiFillEyeInvisible onClick={() => dispatch({ type: filedType })} />
      ) : (
        <AiFillEye onClick={() => dispatch({ type: filedType })} />
      ),
    [checkState]
  );

  return (
    <SignUpStyle>
      <div className="sign-up">
        <div className="sign-up-wrapper shadow-xl">
          <form>
            <div className="mb-3">
              <label htmlFor="email-input" className="form-label">
                이메일 주소
              </label>
              <Input
                type="email"
                className="form-control"
                id="email-input"
                placeholder="이메일을 입력해주세요."
                icon={<FiMail />}
                value={`${allInputValue.email}`}
                onChange={(e) => changeInputValue('email', e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name-input" className="form-label">
                이름
              </label>
              <Input
                type="name"
                id="name-input"
                placeholder="이름을 입력해주세요."
                icon={<AiOutlineUser />}
                value={`${allInputValue.name}`}
                onChange={(e) => changeInputValue('name', e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password-input" className="form-label">
                비밀번호
              </label>
              <Input
                type={`${checkState.passwordField}`}
                id="password-input"
                placeholder="비밀번호를 입력해주세요."
                icon={isShowing(checkState.passwordField, 'PWD_FIELD')}
                value={`${allInputValue.password1}`}
                onChange={(e) => changeInputValue('password1', e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="check-password" className="form-label">
                비밀번호 확인
              </label>
              <Input
                type={`${checkState.checkPaswordField}`}
                id="check-password"
                placeholder="비밀번호 확인을 위해 한번 더 입력해 주세요."
                icon={isShowing(
                  checkState.checkPaswordField,
                  'CHECK_PWD_FIELD'
                )}
                value={`${allInputValue.password2}`}
                onChange={(e) => changeInputValue('password2', e)}
              />
            </div>
            <button
              type="submit"
              className="btn submit-btn"
              disabled={
                !(
                  allInputValue.email &&
                  allInputValue.name &&
                  allInputValue.password1 &&
                  allInputValue.password2
                )
              }
            >
              가입
            </button>
          </form>
        </div>
      </div>
    </SignUpStyle>
  );
};

export default SignUp;
