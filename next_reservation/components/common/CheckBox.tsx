import React from 'react';

interface IProps extends React.InputHTMLAttributes<HTMLInputElement> {
  labelText: string;
  labelClassName?: string;
}

const CheckBox: React.FC<IProps> = ({
  labelText,
  labelClassName,
  className,
  ...props
}) => {
  return (
    <>
      <label
        className={`${labelClassName === undefined ? '' : labelClassName}`}
      >
        <div className="flex items-center">
          <input
            {...props}
            className={`form-checkbox border-2 border-gray-400 rounded text-emerald h-6 w-6 mr-3 my-auto inline-block ${className}`}
            type="checkbox"
          />
          <span className="my-auto inline-block font-xl">{labelText}</span>
        </div>
      </label>
    </>
  );
};

export default CheckBox;
