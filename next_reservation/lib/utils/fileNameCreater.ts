import { v4 } from 'uuid';

const fileNameCreater = (fullFileName: string | null) => {
  // 파일 이름, 확장자 빼오기
  if (!fullFileName) return `default_Photo_${v4()}`;

  const splitFile = fullFileName.split('.');
  const fileName = splitFile.shift();
  const fileExtension = splitFile[splitFile.length - 1];

  return `${fileName}_${v4()}.${fileExtension}`;
};

export default fileNameCreater;
