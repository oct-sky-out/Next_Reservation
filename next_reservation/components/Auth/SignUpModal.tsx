import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { useSelector } from '@/store/index';
import { userSignInAndUpActions } from '@/store/userSignInAndUp';
import { loadingAction } from '@/store/lodaing';
import { getAuth, AuthErrorCodes } from 'firebase/auth';
import { clientApp } from '../../firebaseClient';
import { AiOutlineCheck, AiOutlineClose, AiOutlineUser } from 'react-icons/ai';
import { FiMail } from 'react-icons/fi';
import Swal from 'sweetalert2';
import Loader from 'react-loader-spinner';
import usePasswordType from '../hooks/useTogglePasswordType';
import Input from '../common/Input';
import Selector from '../common/Selector';
import { Years, Months, Days } from '@/lib/staticData/Date';
import SignUpStyle from '@/styles/components/Auth/SignInAndUpModal';
import DefaultUserPicture from '../../public/static/user/default_user_picture.png';

interface IProps {
  closeModal: () => void;
}

type AllInputValuePropType =
  | 'email'
  | 'name'
  | 'year'
  | 'month'
  | 'day'
  | 'password1'
  | 'password2';

const SignUpModal: React.FC<IProps> = ({ closeModal }) => {
  //* Next js router
  const router = useRouter();
  //* redux
  const dispatch = useDispatch();
  const { successData, failureData, loading } = useSelector((selector) => {
    return {
      successData: selector.user.data,
      failureData: selector.user.error,
      loading: selector.loading,
    };
  });
  //* password Type Change CustomHook
  const { getCheckState, isShowing } = usePasswordType();
  //* Set email passwords Validation
  const [validation, setValidation] = useState({
    email: false,
    password1: {
      includedNameOrEmail: false,
      length8: false,
      includedNumAndSign: false,
    },
  });
  //* User SignUp Form
  const [allInputValue, setAllInputValue] = useState({
    email: '',
    name: '',
    year: '1900',
    month: '1',
    day: '1',
    password1: '',
    password2: '',
  });
  //* useCallback
  const changeInputValue = useCallback(
    (
      prop: AllInputValuePropType,
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLSelectElement>
    ) => {
      if (prop === 'email') {
        const isMatch = e.target.value.match(
          /^[A-Za-z]([-_\.]?[\dA-Za-z])*@[\dA-Za-z]([-_\.]*[\dA-Za-z])*\.[A-Za-z]{2,3}$/gi
        );
        if (isMatch !== null) setValidation({ ...validation, [prop]: true });
      }

      if (prop === 'password1') {
        const includedNumAndSign = e.target.value.match(/([!@#$%^&*_+=~])+/gi);
        const length8 = e.target.value.length >= 8;
        const includedNameOrEmail = !(
          e.target.value.includes(
            allInputValue.email.slice(0, allInputValue.email.indexOf('@'))
          ) || e.target.value.includes(allInputValue.name)
        );

        setValidation({
          ...validation,
          [prop]: {
            ...validation['password1'],
            includedNumAndSign: Boolean(includedNumAndSign),
            length8: length8,
            includedNameOrEmail: includedNameOrEmail,
          },
        });
      }

      setAllInputValue({ ...allInputValue, [prop]: e.target.value });
    },
    [allInputValue, validation]
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

      dispatch(loadingAction.setLoading(true));

      const sendValue = {
        email: allInputValue.email,
        name: allInputValue.name,
        year: allInputValue.year,
        month: allInputValue.month,
        day: allInputValue.day,
        password: allInputValue.password1,
        isLogged: true,
        userPicture: DefaultUserPicture,
      };
      dispatch(userSignInAndUpActions.userSignUp(sendValue));
    },
    [allInputValue]
  );

  //* useEffect 회원가입 스토어 감지 후 업데이트, 회원가입 후 자동 로그아웃.
  useEffect(() => {
    dispatch(loadingAction.setLoading(false));
    if (successData.type === 'success') {
      Swal.fire({
        icon: 'success',
        title: '가입완료!',
        text: '👏 축하합니다! 이메일 인증 후 로그인해주세요!👏',
        timer: 3000,
      }).then(() => {
        getAuth(clientApp)
          .signOut()
          .then(() => {
            closeModal();
          })
          .then(() => {
            dispatch(
              userSignInAndUpActions.userSignInOrUpSuccess({
                type: '',
                email: '',
                name: '',
                brithDay: new Date(),
                token: '',
                userPicture: { src: '', width: 0, height: 0 },
              })
            );
          })
          .then(() => {
            router.push('/');
          });
      });
    }
    if (failureData.type === 'error') {
      if (failureData.code === AuthErrorCodes.EMAIL_EXISTS) {
        Swal.fire({
          icon: 'error',
          title: '중복된 이메일',
          text: `중복된 이메일이 존재합니다.`,
        });
      }
      if (failureData.code !== AuthErrorCodes.EMAIL_EXISTS)
        Swal.fire({
          icon: 'error',
          title: `예기치 못한 에러 발생. ${failureData.code}`,
          text: `Error : ${failureData.message}`,
        });
      dispatch(
        userSignInAndUpActions.userSignInOrFailure({
          type: '',
          code: '',
          message: '',
        })
      );
    }
  }, [successData, failureData]);

  return (
    <SignUpStyle signInOrUp="up">
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
                  className="brithYear"
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
                  className="brithMonth"
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
                  className="brithDay"
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
                type={getCheckState().passwordField}
                id="password-input"
                placeholder="비밀번호를 입력해주세요."
                icon={isShowing(getCheckState().passwordField, 'PWD_FIELD')}
                value={allInputValue.password1}
                onChange={(e) => changeInputValue('password1', e)}
              />
              <div className="mt-2">
                <span className="block flex items-center text-base">
                  {validation.password1.includedNameOrEmail ? (
                    <AiOutlineCheck className="mr-1" color="#48cfae" />
                  ) : (
                    <AiOutlineClose className="mr-1" color="red" />
                  )}
                  아이디나 이름이 포함되어있어야합니다.
                </span>
                <span className="block flex items-center text-base">
                  {validation.password1.includedNumAndSign ? (
                    <AiOutlineCheck className="mr-1" color="#48cfae" />
                  ) : (
                    <AiOutlineClose className="mr-1" color="red" />
                  )}
                  특수문자 "!, @, #, $, %, ^, &, *, _, +, =, ~"가
                  포함되어있어야합니다.
                </span>
                <span className="block flex items-center text-base">
                  {validation.password1.length8 ? (
                    <AiOutlineCheck className="mr-1" color="#48cfae" />
                  ) : (
                    <AiOutlineClose className="mr-1" color="red" />
                  )}
                  8자리 이상이어야합니다.
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="check-password" className="form-label">
                비밀번호 확인
              </label>
              <Input
                data-testid="pwd2"
                type={getCheckState().checkPaswordField}
                id="check-password"
                placeholder="비밀번호 확인을 위해 한번 더 입력해 주세요."
                icon={isShowing(
                  getCheckState().checkPaswordField,
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
                  allInputValue.password2 &&
                  validation.email &&
                  validation.password1.includedNumAndSign &&
                  validation.password1.length8 &&
                  validation.password1.includedNameOrEmail
                )
              }
            >
              <div className=" w-full h-full flex justify-center items-center ">
                {loading ? (
                  <Loader type="Oval" color="#fff" height="40" width="40" />
                ) : (
                  '가입'
                )}
              </div>
            </button>
          </form>
        </div>
      </div>
    </SignUpStyle>
  );
};

export default SignUpModal;
