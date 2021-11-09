import React from 'react';
import CommonInputStyle from '../../styles/common/Input';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon: JSX.Element | null;
}
const Input: React.FC<IProps> = ({ icon, className, ...props }) => {
  return (
    <CommonInputStyle iconExist={!!icon}>
      <div className="input-wrapper">
        <input className={`form-control ${className}`} {...props} />
        <div className="icon-wrapper">{icon}</div>
      </div>
    </CommonInputStyle>
  );
};

export default React.memo(Input);
