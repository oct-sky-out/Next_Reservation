import styled from 'styled-components';
import palette from '../../palette/palette';

const SignUpModalStyle = styled.div`
  .sign-up {
    width: 600px;
    height: 500px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  .sign-up-wrapper {
    border: 1px solid ${palette.gary_b0};
    border-radius: 20px;
    color: ${palette.black};
    width: 100%;
    height: 100%;
    background-color: ${palette.snow};
    opacity: 1;
    padding: 40px;
    .submit-btn {
      border: none;
      width: 110px;
      height: 50px;
      background-color: #48cfae;
      font-size: 1.3rem;
      color: #fffafa;
    }
  }
`;

export default SignUpModalStyle;
