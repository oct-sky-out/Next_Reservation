import React from 'react';

interface IProps {
  proceduerText: string;
}

const RegisterLeftSideProcedureInformation: React.FC<IProps> = ({
  proceduerText,
}) => {
  return (
    <div className="col-start-1 flex justify-center items-center">
      <h1 className="text-white text-5xl">{proceduerText}</h1>
    </div>
  );
};

export default RegisterLeftSideProcedureInformation;
