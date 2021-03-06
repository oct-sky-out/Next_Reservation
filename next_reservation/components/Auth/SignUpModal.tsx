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
          title: '??????????????? ????????????.',
          text: '??????????????? ????????? ??????????????????!',
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

  //* useEffect ???????????? ????????? ?????? ??? ????????????, ???????????? ??? ?????? ????????????.
  useEffect(() => {
    dispatch(loadingAction.setLoading(false));
    if (successData.type === 'success') {
      Swal.fire({
        icon: 'success',
        title: '????????????!',
        text: '???? ???????????????! ????????? ?????? ??? ?????????????????????!????',
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
                brithDay: new Date().toISOString(),
                token: '',
                userPicture: '',
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
          title: '????????? ?????????',
          text: `????????? ???????????? ???????????????.`,
        });
      }
      if (failureData.code !== AuthErrorCodes.EMAIL_EXISTS)
        Swal.fire({
          icon: 'error',
          title: `????????? ?????? ?????? ??????. ${failureData.code}`,
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
                ????????? ??????
              </label>
              <Input
                data-testid="email"
                type="email"
                className="form-control"
                id="email-input"
                placeholder="???????????? ??????????????????."
                icon={<FiMail />}
                value={allInputValue.email}
                onChange={(e) => changeInputValue('email', e)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="name-input" className="form-label">
                ??????
              </label>
              <Input
                data-testid="name"
                type="name"
                id="name-input"
                placeholder="????????? ??????????????????."
                icon={<AiOutlineUser />}
                value={allInputValue.name}
                onChange={(e) => changeInputValue('name', e)}
              />
            </div>
            <label htmlFor="brithDay-input" className="form-label">
              ????????????
            </label>
            <div className="mb-3 brithDay-wrapper">
              <div className="brithDay-wrapper year-select">
                <Selector
                  data-testid="brithYear"
                  className="brithYear"
                  options={Years}
                  disableOption="???"
                  value={allInputValue.year}
                  onChange={(e) => {
                    changeInputValue('year', e);
                  }}
                />
                <span>???</span>
              </div>
              <div className="brithDay-wrapper month-select">
                <Selector
                  data-testid="brithMonth"
                  className="brithMonth"
                  options={Months}
                  disableOption="???"
                  value={allInputValue.month}
                  onChange={(e) => {
                    changeInputValue('month', e);
                  }}
                />
                <span>???</span>
              </div>
              <div className="brithDay-wrapper month-select">
                <Selector
                  data-testid="brithDay"
                  className="brithDay"
                  options={Days}
                  disableOption="???"
                  value={allInputValue.day}
                  onChange={(e) => changeInputValue('day', e)}
                />
                <span>???</span>
              </div>
            </div>
            <div>
              <label
                htmlFor="brithDay-input"
                className="text-red-500 form-label"
              >
                ??????!
              </label>
              <div className="mb-6">
                <p className="p-2 text-red-500">
                  ??? 18??? ????????? ????????? ??????????????? ???????????????. ???????????????
                  ??????????????? ???????????? ?????????, ?????? ????????? ????????? ????????? ??????
                  ????????????.
                </p>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="password-input" className="form-label">
                ????????????
              </label>
              <Input
                data-testid="pwd1"
                type={getCheckState().passwordField}
                id="password-input"
                placeholder="??????????????? ??????????????????."
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
                  ???????????? ????????? ??????????????????????????????.
                </span>
                <span className="block flex items-center text-base">
                  {validation.password1.includedNumAndSign ? (
                    <AiOutlineCheck className="mr-1" color="#48cfae" />
                  ) : (
                    <AiOutlineClose className="mr-1" color="red" />
                  )}
                  ???????????? "!, @, #, $, %, ^, &, *, _, +, =, ~"???
                  ??????????????????????????????.
                </span>
                <span className="block flex items-center text-base">
                  {validation.password1.length8 ? (
                    <AiOutlineCheck className="mr-1" color="#48cfae" />
                  ) : (
                    <AiOutlineClose className="mr-1" color="red" />
                  )}
                  8?????? ????????????????????????.
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label htmlFor="check-password" className="form-label">
                ???????????? ??????
              </label>
              <Input
                data-testid="pwd2"
                type={getCheckState().checkPaswordField}
                id="check-password"
                placeholder="???????????? ????????? ?????? ?????? ??? ????????? ?????????."
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
                  '??????'
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
