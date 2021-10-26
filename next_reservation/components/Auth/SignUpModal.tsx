import SignUpStyle from '../../styles/components/Auth/SignUpModal';

const SignUp = () => {
  return (
    <SignUpStyle>
      <div className="sign-up">
        <div className="sign-up-wrapper">
          <form>
            <div className="mb-3">
              <label htmlFor="email-input" className="form-label">
                이메일 주소
              </label>
              <input type="email" className="form-control" id="email-input" />
            </div>
            <div className="mb-3">
              <label htmlFor="password-input" className="form-label">
                비밀번호
              </label>
              <input
                type="password"
                className="form-control"
                id="password-input"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="check-password" className="form-label">
                비밀번호 확인
              </label>
              <input
                type="password"
                className="form-control"
                id="check-password"
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
