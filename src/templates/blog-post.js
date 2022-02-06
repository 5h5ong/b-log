import React from "react";
import { graphql } from "gatsby";
import styled from "styled-components";
import tw from "twin.macro";

const Container = styled.div`
  ${tw`max-w-screen-md m-auto my-40`}
`;

const Header = styled.header`
  ${tw`mb-14`}
`;

const BlogTitle = styled.h1`
  ${tw`text-4xl`}
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
    text-6xl 
    before:text-gray-300
    before:content-['#']
    before:ml-[-2rem]
    `}
  }
  h2 {
    ${tw`
    text-5xl 
    before:text-gray-300
    before:content-['##']
    before:ml-[-3.25rem]
    `}
  }
  h3 {
    ${tw`
    text-4xl 
    before:text-gray-300
    before:content-['###']
    before:ml-[-3.6rem]
    `}
  }
  h4 {
    ${tw`
    text-3xl 
    before:text-gray-300
    before:content-['####']
    before:ml-[-4rem]
    `}
  }
  h5 {
    ${tw`
    text-2xl 
    before:text-gray-300
    before:content-['#####']
    before:ml-[-4rem]
    `}
  }
  h6 {
    ${tw`
    text-xl 
    before:text-gray-300
    before:content-['######']
    before:ml-[-4rem]
    `}
  }
`;

const BlogPostTemplate = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <Container>
      <Header>
        <BlogTitle>{frontmatter.title}</BlogTitle>
        <p>{frontmatter.date}</p>
      </Header>
      <Section dangerouslySetInnerHTML={{ __html: html }} />
    </Container>
  );
};

export default BlogPostTemplate;

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
