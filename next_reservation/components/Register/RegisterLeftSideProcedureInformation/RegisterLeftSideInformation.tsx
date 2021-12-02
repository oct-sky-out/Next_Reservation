import React from 'react';
import LeftSideInformationStyles from 'styles/components/Register/RegisterLeftSideProcedureInformation';

interface IProps {
  proceduerText: string;
}

const RegisterLeftSideProcedureInformation: React.FC<IProps> = ({
  proceduerText,
}) => {
  return (
    <LeftSideInformationStyles className="col-start-1 row-start-1 row-end-3">
      <div className="h-full  flex justify-center items-center left-side-description">
        <h1 className="text-white text-5xl p-8 regist-proceduer-text animate-fadeInAndUpForm">
          {proceduerText}
        </h1>
      </div>
    </LeftSideInformationStyles>
  );
};

export default RegisterLeftSideProcedureInformation;
