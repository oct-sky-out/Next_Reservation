import styled from 'styled-components';

const Container = styled.div`
  position: sticky;
  width: 100vw;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  background-color: #fff;
  box-shadow: #00000008;
  z-index: 1;
  .header-wrapper {
    display: flex;
    height: 80px;
    align-items: center;
    .header-logo {
      margin-top: 15px;
    }
    .header-txt {
      margin-top: 15px;
    }
  }
  .header-auth-btns {
    .header-sign-up-btn,
    .header-sign-in-btn {
      margin-top: 15px;
      width: 110px;
      height: 50px;
      background-color: #48cfae;
      font-size: 1rem;
      color: #fffafa;
    }
  }
`;

export default Container;
