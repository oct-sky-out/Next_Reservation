import styled from 'styled-components';
import palette from '../../styles/palette/palette';

const DatePickerStyle = styled.div`
  .react-datepicker {
    border-radius: 40px;
    filter: drop-shadow(0 10px 8px rgb(0 0 0 / 0.04))
      drop-shadow(0 4px 3px rgb(0 0 0 / 0.1));
  }
  .react-datepicker__month-container {
    width: 550px;
    padding: 1rem;
  }
  .react-datepicker__triangle {
    display: none;
  }
  .react-datepicker__header {
    background-color: #fff;
    border-bottom: none;
  }
  .react-datepicker__week,
  .react-datepicker__current-month {
    margin-bottom: 1rem;
  }
  .react-datepicker__current-month {
    font-size: 1.3rem;
    line-height: 1.75rem;
  }
  .react-datepicker__day,
  .react-datepicker__day-name {
    width: 40px;
    height: 40px;
    margin-right: 1.5rem;
  }
  .react-datepicker__day {
    padding-top: 6px;
    border-radius: 50%;
  }
  .react-datepicker__day--keyboard-selected {
    border-radius: 50%;
    background-color: ${palette.emerald};
  }
  .react-datepicker__navigation.react-datepicker__navigation--previous,
  .react-datepicker__navigation.react-datepicker__navigation--next {
    top: 50%;
    .react-datepicker__navigation-icon:before {
      width: 15px;
      height: 15px;
      border-width: 2px 2px 0 0;
    }
    .react-datepicker__navigation-icon--next:before {
      left: -15px;
    }
    .react-datepicker__navigation-icon--previous: before {
      right: -20px;
    }
  }
`;

export default DatePickerStyle;
