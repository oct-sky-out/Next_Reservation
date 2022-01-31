const selectElementSelector = (value: string) => {
  return (
    findKeyAfterDispatch: (objKey: string) => void,
    selectorType: { [key: string]: string }
  ) => {
    const objectKey = Object.keys(selectorType).find(
      (key) => selectorType[key] === value
    );
    typeof objectKey !== 'undefined' && findKeyAfterDispatch(objectKey);
  };
};

export default selectElementSelector;
