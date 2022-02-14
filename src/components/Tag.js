import React from "react";
import tw, { styled } from "twin.macro";
import StyledLink from "./StyledLink";

/**
 * StyledLink에 새로운 스타일 적용
 */
const TagStyledLink = styled(StyledLink)`
  ${tw`text-sm text-gray-400`}
`;

/**
 * 태그 표시
 */
const Tag = ({ name }) => {
  // tags/... -> 기존의 링크에 붙여짐 ex) blog/a/ -> blog/a/tags/...
  // /tags/... -> 기존 링크를 무시하고 이동 ex) homepage.com/tags/...
  return <TagStyledLink to={`/tags/${name}`}>#{name}</TagStyledLink>;
};

export default Tag;
