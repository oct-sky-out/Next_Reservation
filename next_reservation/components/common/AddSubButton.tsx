import { useCallback } from 'react';

interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
  addCallback?: () => any;
  subCallback?: () => any;
  deps: any[];
  disabledValue?: boolean;
}

const AddSubButtom: React.FC<IProps> = ({
  disabledValue,
  addCallback,
  subCallback,
  deps,
  children,
  ...props
}) => {
  const AddOrSub = useCallback(
    (
      { currentTarget: { value } }: React.MouseEvent<HTMLButtonElement>,
      addCallback,
      subCallback
    ) => {
      if (value === 'add') addCallback();
      if (value === 'sub') subCallback();
    },
    [...deps]
  );
  return (
    <button
      className={`w-10 h-10 border-2 ${
        disabledValue ? 'border-gray-500 text-gray-500' : 'border-emerald'
      }  rounded-full`}
      disabled={disabledValue || false}
      onClick={(e) => AddOrSub(e, addCallback, subCallback)}
      {...props}
    >
      {children}
    </button>
  );
};

export default AddSubButtom;
