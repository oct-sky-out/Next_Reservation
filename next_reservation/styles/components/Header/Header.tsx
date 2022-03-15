import styled from 'styled-components';

const Container = styled.div`
  position: sticky;
  top: 0;
  width: 100vw;
  height: 80px;
  display: flex;
  align-items: center;
  padding: 0 8px;
  background-color: #fff;
  box-shadow: #00000008;
  border-bottom: 2px solid #48cfae;
  z-index: 30;
  .header-wrapper {
    height: 80px;
    align-items: center;
  }
`;

export default Container;
