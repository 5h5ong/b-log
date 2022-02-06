import React from "react";
import StyledLink from "./StyledLink";

/**
 * 포스트의 타이틀, 날짜를 표시함. 클릭 시 해당 포스트로 이동함.
 */
const PostPreview = ({ title, date, to }) => {
  return (
    <StyledLink to={to}>
      <h1>{title}</h1>
      <p>{date}</p>
    </StyledLink>
  );
};

export default PostPreview;
