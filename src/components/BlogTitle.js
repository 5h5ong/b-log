import React from "react";
import tw from "twin.macro";
import StyledLink from "./StyledLink";

const StyledH1 = tw.h1`
  flex
  items-center
  justify-center
  text-5xl
  font-mono
  mb-16
`;

const BlogTitle = ({ title }) => {
  return (
    <StyledLink to="/">
      <StyledH1>{title}</StyledH1>
    </StyledLink>
  );
};

export default BlogTitle;
