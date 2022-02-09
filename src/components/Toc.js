import React from "react";
import tw, { styled } from "twin.macro";

const Container = styled.div`
  /* left:100%을 통해 toc의 parent 가장 오른쪽으로 배치함. */
  ${tw`
  relative
  left-full
  pl-28
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

  p {
    ${tw`truncate`}
  }

  a {
    ${tw`
    text-gray-600 hover:text-gray-900 text-sm
    no-underline
    `}
  }
`;

const Contents = styled.div`
  ${tw`
  fixed w-80 rounded-3xl p-5 
  `}
  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
`;

const Toc = ({ html }) => {
  return (
    <Container>
      <Contents dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  );
};

export default Toc;
