import { Link } from "gatsby";
import React from "react";
import styled from "styled-components";
import tw from "twin.macro";

/**
 * Gatsby의 Link 기본 스타일을 제거하고 새로 적용하여 만듬
 */
const StyledLink = styled((props) => <Link {...props} />)`
  ${tw`text-black no-underline hover:text-gray-600`}
`;

export default StyledLink;
