import React, { useCallback, useReducer, useState } from 'react';
import { getFirestore } from 'firebase/firestore';
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import Input from '../common/Input';
import Selector from '../common/Selector';
import { Years } from '../../lib/staticData/Years';
import { Months } from '../../lib/staticData/Months';
import { Days } from '../../lib/staticData/Days';
import SignUpStyle from '../../styles/components/Auth/SignUpModal';

type ActionType = { type: 'PWD_FIELD' | 'CHECK_PWD_FIELD' };
type AllInputValuePropType =
  | 'email'
  | 'name'
  | 'year'
  | 'month'
  | 'day'
  | 'password1'
  | 'password2';

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
    year: '1900',
    month: '1',
    day: '1',
    password1: '',
    password2: '',
  });

  const changeInputValue = useCallback(
    (
      prop: AllInputValuePropType,
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      setAllInputValue({ ...allInputValue, [prop]: e.target.value });
    },
    [allInputValue]
  );

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
                data-testid="email"
                type="email"
                className="form-control"
                id="email-input"
                placeholder="이메일을 입력해주세요."
                icon={<FiMail />}
                value={allInputValue.email}
                onChange={(e) => changeInputValue('email', e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name-input" className="form-label">
                이름
              </label>
              <Input
                data-testid="name"
                type="name"
                id="name-input"
                placeholder="이름을 입력해주세요."
                icon={<AiOutlineUser />}
                value={allInputValue.name}
                onChange={(e) => changeInputValue('name', e)}
              />
            </div>
            <label htmlFor="brithDay-input" className="form-label">
              생년월일
            </label>
            <div className="mb-3 brithDay-wrapper">
              <div className="brithDay-wrapper year-select">
                <Selector
                  data-testid="brithYear"
                  options={Years}
                  disableOption="년"
                  value={allInputValue.year}
                  onChange={(e) => {
                    changeInputValue('year', e);
                  }}
                />
                <span>년</span>
              </div>
              <div className="brithDay-wrapper month-select">
                <Selector
                  data-testid="brithMonth"
                  options={Months}
                  disableOption="월"
                  value={allInputValue.month}
                  onChange={(e) => {
                    changeInputValue('month', e);
                  }}
                />
                <span>월</span>
              </div>
              <div className="brithDay-wrapper month-select">
                <Selector
                  data-testid="brithDay"
                  options={Days}
                  disableOption="일"
                  value={allInputValue.day}
                  onChange={(e) => changeInputValue('day', e)}
                />
                <span>일</span>
              </div>
            </div>
            <div>
              <label
                htmlFor="brithDay-input"
                className="text-red-500 form-label"
              >
                주의!
              </label>
              <div className="mb-6">
                <p className="p-2 text-red-500">
                  만 18세 이상의 성인만 회원가입이 가능합니다. 생년월일은
                  호스트에게 공개되지 않으며, 허위 작성시 아무런 책임을 지지
                  않습니다.
                </p>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password-input" className="form-label">
                비밀번호
              </label>
              <Input
                data-testid="pwd1"
                type={checkState.passwordField}
                id="password-input"
                placeholder="비밀번호를 입력해주세요."
                icon={isShowing(checkState.passwordField, 'PWD_FIELD')}
                value={allInputValue.password1}
                onChange={(e) => changeInputValue('password1', e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="check-password" className="form-label">
                비밀번호 확인
              </label>
              <Input
                data-testid="pwd2"
                type={checkState.checkPaswordField}
                id="check-password"
                placeholder="비밀번호 확인을 위해 한번 더 입력해 주세요."
                icon={isShowing(
                  checkState.checkPaswordField,
                  'CHECK_PWD_FIELD'
                )}
                value={allInputValue.password2}
                onChange={(e) => changeInputValue('password2', e)}
              />
            </div>
            <button
              type="submit"
              data-testid="submit"
              className="btn submit-btn"
              disabled={
                !(
                  allInputValue.email &&
                  allInputValue.name &&
                  allInputValue.year &&
                  allInputValue.month &&
                  allInputValue.day &&
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
