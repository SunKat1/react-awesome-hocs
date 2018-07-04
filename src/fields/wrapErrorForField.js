import React from "react";
import styled from "styled-components";

const DefaultErrComp = styled.h6`
  color: red;
`;

const DefaultBlock = styled.div`
  display: ${({ fluid = false }) => (fluid ? "flex" : "block")};
`;

export const wrapErrorForField = (
  FieldComponent,
  ErrorComponent = DefaultErrComp,
  StyledBlock = DefaultBlock
) => ({ errorMsg, ...props }) => {
  console.log('use wrapper');

  return (
    <StyledBlock>
      <FieldComponent {...props} />
      { errorMsg && <ErrorComponent>{errorMsg}</ErrorComponent> }
    </StyledBlock>
  );
}
export default wrapErrorForField;
