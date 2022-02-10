import React from "react";
import StyledLink from "./StyledLink";
import tw from "twin.macro";

const StyledH1 = tw.h1`m-0 mb-3`;
const StyledP1 = tw.p`m-0`;

/**
 * 포스트의 타이틀, 날짜를 표시함. 클릭 시 해당 포스트로 이동함.
 */
const PostPreview = ({ title, date, to }) => {
  return (
    <StyledLink to={to}>
      <StyledH1>{title}</StyledH1>
      <StyledP1>{date}</StyledP1>
    </StyledLink>
  );
};

export default PostPreview;
