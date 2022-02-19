import React, { useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import SearchFilterRyokanType from './SearchFilterRyokanType';
import SearchFilterRyokanPrice from './SearchFilterRyokanPrice';
import SearchFilterConvenienceSpace from './SearchFilterConvenienceSpace';

const SearchFilter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const [priceFilterOpend, setPriceFilterOpend] = useState(false);
  return (
    <div className={className} {...props}>
      <SearchFilterRyokanType />
      <OutsideClickHandler onOutsideClick={() => setPriceFilterOpend(false)}>
        <SearchFilterRyokanPrice
          priceFilterOpend={priceFilterOpend}
          setPriceFilterOpend={setPriceFilterOpend}
        />
      </OutsideClickHandler>
      <SearchFilterConvenienceSpace />
    </div>
  );
};

export default SearchFilter;
