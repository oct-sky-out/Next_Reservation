import styled from 'styled-components';

const RegisterRyokanStyle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .left-side-description {
    background: linear-gradient(45deg, rgba(0, 50, 119), rgba(0, 220, 150));
  }
  .regist-proceduer-text,
  .register-form {
    animation-name: fadeInAndUpForm;
    animation-duration: 1s;
    animation-iteration-count: none;
  }
  .list-group-item {
    display: flex;
  }

  @keyframes fadeInAndUpForm {
    0% {
      transform: translateY(25%);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

export default RegisterRyokanStyle;
