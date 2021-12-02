import React from 'react';
import CommonInputStyle from '../../styles/common/Input';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
}
const Input: React.FC<IProps> = ({ icon, className, ...props }) => {
  return (
    <CommonInputStyle iconExist={!!icon}>
      <div className="input-wrapper">
        <input className={`form-control ${className}`} {...props} />
        <div className="icon-wrapper">{icon ? icon : null}</div>
      </div>
    </CommonInputStyle>
  );
};

export default React.memo(Input);
