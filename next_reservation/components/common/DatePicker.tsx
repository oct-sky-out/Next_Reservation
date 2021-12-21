import ko from 'date-fns/locale/ko';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import DatePickerStyle from '@/styles/common/DatePicker';

interface IProps {
  className?: string;
}

const DatePicker: React.FC<IProps> = ({ className }) => {
  return (
    <DatePickerStyle>
      <ReactDatePicker
        onChange={() => console.log('a')}
        locale={ko}
        className={`w-full ${className}`}
      />
    </DatePickerStyle>
  );
};

export default DatePicker;
