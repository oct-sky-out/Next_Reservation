import reset from 'styled-reset';
import { createGlobalStyle, css } from 'styled-components';
import palette from '../palette/palette';

const globalStyle = css`
  ${reset};
  * {
    box-sizing: border-box;
  }
  body {
    font-family: 'IBM Plex Sans KR', sans-serif;
    color: ${palette.snow};
  }
`;

const GlobalStyle = createGlobalStyle`${globalStyle};`;

export default GlobalStyle;
