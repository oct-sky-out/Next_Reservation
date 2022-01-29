const selectElementSelector = (value: string) => {
  return (
    findKeyAfterDispatch: (objKey: string | undefined) => void,
    selectorType: { [key: string]: string }
  ) => {
    const objectKey = Object.keys(selectorType).find(
      (key) => selectorType[key] === value
    );
    findKeyAfterDispatch(objectKey);
  };
};

export default selectElementSelector;
