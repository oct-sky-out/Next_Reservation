import React, { useEffect, useRef } from 'react';
import SliderInput from '../../styles/common/SliderInput';

interface IProps {
  minValue: any;
  maxValue: any;
  minRef: React.RefObject<HTMLInputElement>;
  maxRef: React.RefObject<HTMLInputElement>;
  minThumbRef: React.RefObject<HTMLDivElement>;
  maxThumbRef: React.RefObject<HTMLDivElement>;
  minValueOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxValueOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minValueDescription?: string;
  maxValueDescription?: string;
  className?: string;
}

const MultipleRangeInput: React.FC<IProps> = ({
  minValue,
  maxValue,
  minRef,
  maxRef,
  minThumbRef,
  maxThumbRef,
  minValueOnChange,
  maxValueOnChange,
  minValueDescription,
  maxValueDescription,
  className,
}) => {
  const rangeRef = useRef<HTMLDivElement>(null);
  const onInputPrices = (
    e: React.FormEvent<HTMLInputElement>,
    targetDirection: 'left' | 'right'
  ) => {
    const min = +e.currentTarget.min;
    const max = +e.currentTarget.max;

    if (targetDirection === 'left') {
      const percent = ((+e.currentTarget.value - min) / (max - min)) * 100;
      maxRef.current &&
        (e.currentTarget.value =
          '' + Math.min(+e.currentTarget.value, +maxRef.current.value - 3));
      minThumbRef.current && (minThumbRef.current.style.left = percent + '%');
      rangeRef.current && (rangeRef.current.style.left = percent + '%');
    }

    if (targetDirection === 'right') {
      const percent = ((+e.currentTarget.value - min) / (max - min)) * 100;
      minRef.current &&
        (e.currentTarget.value =
          '' + Math.max(+e.currentTarget.value, +minRef.current.value + 3));
      maxThumbRef.current &&
        (maxThumbRef.current.style.right = 100 - percent + '%');
      rangeRef.current && (rangeRef.current.style.right = 100 - percent + '%');
    }
  };

  useEffect(() => {
    const MAX = 100;
    if (maxThumbRef.current && maxRef.current)
      maxThumbRef.current.style.right = MAX - +maxRef.current.value + '%';
    if (minThumbRef.current && minRef.current)
      minThumbRef.current.style.left = minRef.current.value + '%';
    if (rangeRef.current) {
      rangeRef.current.style.left = minThumbRef.current?.style.left || '0%';
      rangeRef.current.style.right = maxThumbRef.current?.style.right || '0%';
    }
  }, []);

  return (
    <div className={`${className} relative`}>
      {/* Real Slider */}
      <SliderInput
        type="range"
        ref={minRef}
        className="top-1/4"
        min="0"
        max="100"
        value={minValue}
        onChange={minValueOnChange}
        step="0.1"
        onInput={(e) => {
          onInputPrices(e, 'left');
        }}
      />
      <SliderInput
        type="range"
        ref={maxRef}
        className="top-1/4"
        min="0"
        max="100"
        value={maxValue}
        onChange={maxValueOnChange}
        step="0.1"
        onInput={(e) => {
          onInputPrices(e, 'right');
        }}
      />
      <div
        ref={rangeRef}
        className="absolute h-1/2 bg-green-500 top-1/4 rounded-full z-2 right-0 left-0"
      />
      <div className="absolute w-full h-1/2 mx-1 bg-green-100 top-1/4 rounded-full z-1" />
      <div
        ref={minThumbRef}
        style={{ transform: 'translate(-10px, 6px)' }}
        className="absolute w-6 h-6 rounded-full bg-green-300 -translate-x-9 z-2 left-0"
      />
      <div
        ref={maxThumbRef}
        style={{ transform: 'translate(10px, 6px)' }}
        className="absolute w-6 h-6 rounded-full bg-green-300 translate-x-9 z-2 right-0"
      />
      {minValueDescription && (
        <div className="absolute -bottom-10 left-0">
          <span>최저 : {minValueDescription}</span>
        </div>
      )}
      {maxValueDescription && (
        <div className="absolute -bottom-10 right-0">
          <span>최고 : {maxValueDescription}</span>
        </div>
      )}
    </div>
  );
};

export default React.memo(MultipleRangeInput);
