import React from "react";
import tw from "twin.macro";
import StyledLink from "./StyledLink";

const Title = tw.h1`
  flex
  items-center
  justify-center
  text-5xl
  font-mono
  mb-16
`;

const BlogHeader = ({ title }) => {
  return (
    <StyledLink to="/">
      <Title>{title}</Title>
    </StyledLink>
  );
};

export default BlogHeader;
