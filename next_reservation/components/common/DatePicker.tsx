import ko from 'date-fns/locale/ko';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerStyle from '@/styles/common/DatePicker';
import React from 'react';

interface IProps {
  selected: Date | null;
  placeholderText: string;
  monthCount?: number;
  startDate?: Date;
  endDate?: Date;
  minDate?: Date;
  className?: string;
  name?: string;
  disabled?: boolean;
  onChange: (date: Date, e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DatePicker: React.FC<IProps> = ({
  selected,
  placeholderText,
  monthCount,
  startDate,
  endDate,
  minDate,
  name,
  className,
  disabled,
  onChange,
}) => {
  return (
    <DatePickerStyle>
      <ReactDatePicker
        selected={selected ? new Date(selected) : null}
        placeholderText={placeholderText}
        monthsShown={monthCount || 1}
        dateFormat="yyyy-MM-dd"
        onChange={onChange}
        name={name}
        locale={ko}
        className={`border-1 border-gray-400 rounded p-2 ${className}`}
        disabledKeyboardNavigation={true}
        startDate={startDate}
        endDate={endDate}
        minDate={minDate}
        disabled={disabled}
      />
    </DatePickerStyle>
  );
};

export default DatePicker;
