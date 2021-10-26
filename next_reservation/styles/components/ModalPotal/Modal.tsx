import styled from 'styled-components';

const ModalStyle = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 2;
  .modal-background {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background-color: #ffffff00;
  }
`;

export default ModalStyle;
