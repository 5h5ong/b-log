import React from "react";
import tw, { styled } from "twin.macro";

const Container = styled.div`
  /* left:100%을 통해 toc의 parent 가장 오른쪽으로 배치함. */
  ${tw`
  relative
  left-full
  pl-16
  leading-9
  `}

  ul {
    ${tw`
    list-none
    pl-4
    `}
  }

  li {
    ${tw`m-0 truncate`}
  }

  p {
    ${tw`m-0 truncate`}
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
  fixed w-72 rounded-3xl p-5 
  `}
  /* toc의 위치를 상단으로 */
  ${(props) => props.setTop && tw`top-10`}

  box-shadow: 20px 20px 60px #d9d9d9, -20px -20px 60px #ffffff;
`;

const Toc = ({ html, setTop }) => {
  return (
    <Container>
      <Contents dangerouslySetInnerHTML={{ __html: html }} setTop={setTop} />
    </Container>
  );
};

export default Toc;
