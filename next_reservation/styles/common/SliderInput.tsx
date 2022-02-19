import styled from 'styled-components';

const SliderInput = styled.input`
  position: absolute;
  pointer-events: none;
  -webkit-appearance: none;
  z-index: 3;
  height: 14px;
  width: 100%;
  opacity: 0;
  &::-ms-track {
    -webkit-appearance: none;
    background: transparent;
    color: transparent;
  }
  &::-moz-range-track {
    -moz-appearance: none;
    background: transparent;
    color: transparent;
  }
  &:focus::-webkit-slider-runnable-track {
    background: transparent;
    border: transparent;
  }
  &:focus {
    outline: none;
  }
  &::-ms-thumb {
    pointer-events: all;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 0px;
    border: 0 none;
    background: red;
  }
  &::-moz-range-thumb {
    pointer-events: all;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 0px;
    border: 0 none;
    background: red;
  }
  &::-webkit-slider-thumb {
    pointer-events: all;
    width: 2.25rem;
    height: 2.25rem;
    border-radius: 0px;
    border: 0 none;
    background: red;
    -webkit-appearance: none;
  }
  &::-ms-fill-lower {
    background: transparent;
    border: 0 none;
  }
  &::-ms-fill-lower {
    background: transparent;
    border: 0 none;
  }
  &::-ms-tooltip {
    display: none;
  }
`;
export default SliderInput;
