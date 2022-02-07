import React from "react";
import tw from "twin.macro";
import StyledLink from "./StyledLink";

const Container = tw.div`
  inline-flex
  content-center
`;
const Text = tw.span`
  flex
  items-center
  text-xl
`;

const HomeButton = () => {
  return (
    <StyledLink to="/">
      <Container>
        <Text>{"<"} Go to Home</Text>
      </Container>
    </StyledLink>
  );
};

export default HomeButton;
