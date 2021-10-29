import React, { useCallback, useReducer, useState } from 'react';
import { useRouter } from 'next/router';
import { userAction } from '../../store/user';
import { useDispatch } from 'react-redux';
import { AuthErrorCodes } from 'firebase/auth';
import axios from '../../lib/api/Axios';
import { IFirebaseSignUpError } from '../../pages/api/auth/FirebaseSignUp';
import { AiFillEye, AiFillEyeInvisible, AiOutlineUser } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import Swal from 'sweetalert2';
import Input from '../common/Input';
import Selector from '../common/Selector';
import { Years, Months, Days } from '../../lib/staticData/Date';
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
  const router = useRouter();
  const userDispatch = useDispatch();
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

  const isSamePassword = () =>
    allInputValue.password1 === allInputValue.password2;

  const onSignUp = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (!isSamePassword()) {
        return Swal.fire({
          icon: 'error',
          title: '비밀번호가 다릅니다.',
          text: '비밀번호가 같은지 확인해주세요!',
          timer: 3000,
        });
      }
      try {
        const { data } = await axios.post('/api/auth/FirebaseSignUp', {
          email: allInputValue.email,
          name: allInputValue.name,
          year: allInputValue.year,
          month: allInputValue.month,
          day: allInputValue.day,
          password: allInputValue.password1,
        });
        if (data.type === 'success') {
          Swal.fire({
            icon: 'success',
            title: '가입완료!',
            text: '👏 축하합니다! 가입이 완료되었습니다. 👏',
            timer: 3000,
          });
          userDispatch(
            userAction.setLoggedUser({
              email: allInputValue.email,
              name: allInputValue.name,
              brithDay: `${allInputValue.year}.${allInputValue.month}.${allInputValue.day}`,
              userPicture: '/public/static/user/default_user_picture.jpg',
              isLogged: false,
            })
          );
          router.reload();
        }
        if (data.type === 'error') {
          throw {
            code: data.code,
            message: data.message,
          };
        }
      } catch (error: IFirebaseSignUpError | any) {
        if (error.code === AuthErrorCodes.EMAIL_EXISTS) {
          return Swal.fire({
            icon: 'error',
            title: '중복된 이메일.',
            text: `중복된 이메일이 존재합니다.`,
          });
        }
        Swal.fire({
          icon: 'error',
          title: `예기치 못한 에러 발생. ${error.code}`,
          text: `Error : ${error.message}`,
        });
      }
    },
    [allInputValue]
  );

  return (
    <SignUpStyle>
      <div className="sign-up">
        <div className="sign-up-wrapper shadow-xl">
          <form onSubmit={onSignUp}>
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
