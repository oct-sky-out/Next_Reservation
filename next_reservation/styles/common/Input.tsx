import styled from 'styled-components';
import palette from '../../styles/palette/palette';

const CommonInputStyle = styled.div<{ iconExist: boolean }>`
  .input-wrapper {
    position: relative;
    .form-control {
      width: 100%;
      height: 50px;
      padding: ${({ iconExist }) =>
        iconExist ? '0 44px 0 11px' : '0 0 0 11px'};
      font-size: 1.25rem;
      line-height: 1.75rem;
      ::placeholder {
        color: ${palette.gary_aa};
      }
    }

    .icon-wrapper {
      position: absolute;
      right: 11px;
      top: 0px;
      height: 46px;
      display: flex;
      align-items: center;
    }
  }
`;

export default CommonInputStyle;
