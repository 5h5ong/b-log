import React from "react";
import tw, { styled } from "twin.macro";

const Container = styled.div`
  /* left:100%을 통해 toc의 parent 가장 오른쪽으로 배치함. */
  ${tw`
  relative
  left-full
  pl-20
  `}

  ul {
    ${tw`
    list-none
    pl-4
    `}
  }

  li {
    ${tw`first:m-0 mt-3`}
  }

  a {
    ${tw`
    text-black 
    no-underline
    `}
  }
`;

const Contents = tw.div`
  fixed
  w-96
`;

const Toc = ({ html }) => {
  return (
    <Container>
      <Contents dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  );
};

export default Toc;
