import React from 'react';
import LeftSideInformationStyles from 'styles/components/Register/RegisterLeftSideProcedureInformation';

interface IProps {
  proceduerText: string;
}

const RegisterLeftSideProcedureInformation: React.FC<IProps> = ({
  proceduerText,
}) => {
  return (
    <LeftSideInformationStyles>
      <div className="h-full col-start-1 flex justify-center items-center left-side-description">
        <h1 className="text-white text-5xl regist-proceduer-text animate-fadeInAndUpForm">
          {proceduerText}
        </h1>
      </div>
    </LeftSideInformationStyles>
  );
};

export default RegisterLeftSideProcedureInformation;
