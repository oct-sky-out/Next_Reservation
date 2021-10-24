import styled from 'styled-components';

const Container = styled.div`
  position: sticky;
  width: 100%;
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
    align-items: center;
    .header-logo {
      margin-top: 15px;
      height: 80px;
    }
    .header-txt {
      margin-top: 15px;
    }
  }
  .header-auth-btns {
    .header-sign-up-btn,
    .header-sign-in-btn {
      background-color: #48cfae;
      color: #fffafa;
    }
  }
`;

export default Container;
