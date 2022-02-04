import styled from 'styled-components';

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100vw;
  height: 120px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  background-color: #fff;
  box-shadow: #00000008;
  border-bottom: 2px solid #48cfae;
  z-index: 30;
  .header-wrapper {
    display: flex;
    height: 80px;
    align-items: center;
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
