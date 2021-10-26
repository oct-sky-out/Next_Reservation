import { useCallback, useReducer } from 'react';
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
              />
            </div>
            <button type="submit" className="btn submit-btn">
              가입
            </button>
          </form>
        </div>
      </div>
    </SignUpStyle>
  );
};

export default SignUp;
