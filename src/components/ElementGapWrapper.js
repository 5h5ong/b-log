import React from "react";
import tw from "twin.macro";

const StyledWrapper = tw.div`
  mb-16
`;

/**
 * children의 수직 간격을 띄움
 */
const ElementGapWrapper = ({ children }) => {
  return <StyledWrapper>{children}</StyledWrapper>;
};

export default ElementGapWrapper;
