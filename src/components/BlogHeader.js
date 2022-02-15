import React from "react";
import tw from "twin.macro";
import Seo from "./Seo";
import BlogTitle from "./BlogTitle";

const HeaderContainer = tw.div`mt-20 mb-32`;

/**
 * 블로그의 헤더.
 * @param title 헤더에 표시될 문자열
 * @param seo Seo에 사용될 문자열
 */
const BlogHeader = ({ title, seo }) => {
  return (
    <HeaderContainer>
      <Seo title={seo} />
      <BlogTitle title={title} />
    </HeaderContainer>
  );
};

export default BlogHeader;
