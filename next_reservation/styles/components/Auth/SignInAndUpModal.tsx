import styled from 'styled-components';
import palette from '../../palette/palette';

const SignUpModalStyle = styled.div<{ signInOrUp: string }>`
  .sign-${(props) => props.signInOrUp} {
    ${(props) => {
      return props.signInOrUp === 'in' ? ` height : 430px;` : ` height: 730px;`;
    }}
    width: 600px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  .sign-${(props) => props.signInOrUp}-wrapper {
    ${(props) => {
      return props.signInOrUp === 'in'
        ? `.yasumi-logo-txt{
          margin: 0 auto;
          margin-bottom:50px;
    }`
        : '';
    }}
    width: 100%;
    height: 100%;
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
      width: 100%;
      height: 50px;
      background-color: #48cfae;
      font-size: 1.3rem;
      color: #fffafa;
    }
    ${(props) => {
      return props.signInOrUp === 'up'
        ? `.brithDay-wrapper {
      display: flex;
      align-items: center;
      .year-select,
      .month-select,
      .day-select {
        width: 120px;
        justify-content: space-evenly;
      }
    }`
        : '';
    }}
  }
`;

export default SignUpModalStyle;
