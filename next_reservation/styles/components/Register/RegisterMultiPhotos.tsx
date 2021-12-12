import styled from 'styled-components';

const MultiPhotosStyles = styled.div`
  input[type='file'] {
    cursor: grab;
  }
  .photo-modify-button {
    opacity: 0;
    transition-property: opacity;
    transition-duration: 0.5s;
    transition-timing-function: ease-out;
  }

  .photo-wrapper {
    &:hover {
      .photo-modify-button {
        opacity: 1;
        transition-property: opacity;
        transition-duration: 0.5s;
        transition-timing-function: ease-in;
      }
    }
  }
  #file-upload-button {
    display: none;
  }
`;

export default MultiPhotosStyles;
