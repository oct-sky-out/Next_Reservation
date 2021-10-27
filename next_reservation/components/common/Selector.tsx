import React from 'react';
import { v4 } from 'uuid';
import CommonSelectorStyle from '../../styles/common/Selector';

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: string[];
  disableOption: string;
  className?: string;
}

const Selector: React.FC<IProps> = ({
  options = [],
  disableOption,
  className,
  ...props
}) => {
  return (
    <CommonSelectorStyle>
      <select className={`form-select ${className}`} {...props}>
        <option value={disableOption} disabled>
          {disableOption}
        </option>
        {options.map((option) => (
          <option key={v4()} value={option}>
            {option}
          </option>
        ))}
      </select>
    </CommonSelectorStyle>
  );
};

export default Selector;
