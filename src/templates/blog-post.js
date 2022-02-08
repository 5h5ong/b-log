import * as React from "react";
import { graphql } from "gatsby";
import tw, { styled } from "twin.macro";
import Seo from "../components/Seo";
import BlogHeader from "../components/BlogHeader";
import Toc from "../components/Toc";

const Container = tw.div`
  my-40
`;

const SectionContainer = tw.div`
  max-w-screen-md m-auto
`;

const Header = tw.header`
  max-w-screen-lg
  m-auto
  mb-28
`;

const BlogTitle = tw.h1`
  mb-0
  text-6xl
`;

/**
 * Markdown Style
 */
const Section = styled.section`
  p {
    ${tw`text-lg`}
  }
  code {
    ${tw`text-sm`}
  }
  h1 {
    ${tw`
    text-5xl 
    before:text-gray-300
    before:content-['#']
    before:ml-[-2rem]
    `}
  }
  h2 {
    ${tw`
    text-4xl 
    before:text-gray-300
    before:content-['##']
    before:ml-[-3.25rem]
    `}
  }
  h3 {
    ${tw`
    text-3xl 
    before:text-gray-300
    before:content-['###']
    before:ml-[-3.6rem]
    `}
  }
  h4 {
    ${tw`
    text-2xl 
    before:text-gray-300
    before:content-['####']
    before:ml-[-4rem]
    `}
  }
  h5 {
    ${tw`
    text-xl 
    before:text-gray-300
    before:content-['#####']
    before:ml-[-4rem]
    `}
  }
  h6 {
    ${tw`
    text-lg
    before:text-gray-300
    before:content-['######']
    before:ml-[-4rem]
    `}
  }
`;

const BlogPostTemplate = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html, tableOfContents } = markdownRemark;

  return (
    <>
      <BlogHeader title="b:LOG" />
      <Container>
        <Seo title={frontmatter.title} />
        <Header>
          <BlogTitle>{frontmatter.title}</BlogTitle>
          <span>{frontmatter.date}</span>
        </Header>
        <SectionContainer>
          <Toc html={tableOfContents} />
          <Section dangerouslySetInnerHTML={{ __html: html }} />
        </SectionContainer>
      </Container>
    </>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      tableOfContents
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
