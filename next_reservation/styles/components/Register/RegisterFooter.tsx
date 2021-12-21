import styled from 'styled-components';
import palette from '../../palette/palette';

const RegisterFooterStyle = styled.div<{ step: number }>`
  height: 120px;
  .step-line {
    width: calc((100% / 10) * ${(props) => props.step});
    height: 3px;
    position: absolute;
    top: 0;
    left: 0;
  }
  .btn {
    background-color: ${palette.emerald};
    border: none;
    border-radius: 9999px;
    padding: 1rem 2rem;
  }
`;

export default RegisterFooterStyle;
