import * as React from "react";
import { graphql } from "gatsby";
import tw, { styled } from "twin.macro";
import Toc from "../components/Toc";
import Tag from "../components/Tag";
import { GapHorizontality } from "../styles/gaps";
import BlogHeader from "../components/BlogHeader";

const Container = styled.div`
  ${tw`my-40`};
`;

const SectionContainer = tw.div`
  max-w-screen-md m-auto
`;

const Header = tw.header`
  max-w-screen-lg
  m-auto
  mb-28
`;

const PostTitle = tw.h1`
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

  table {
    ${tw`table-auto p-5 rounded-xl m-auto border border-gray-400 border-solid`}/* border: solid 1px black; */
  }

  th {
    ${tw`pb-4 border-0 border-b border-gray-200 border-solid`}
  }

  td {
    ${tw`p-3 text-gray-600 text-sm`}
  }

  /* Image Caption etc) alt, title... [alt](./...png "title") */
  .gatsby-resp-image-figcaption {
    ${tw`flex justify-center mt-2 text-sm text-gray-500`}
  }

  h1 {
    ${tw`
    text-5xl 
    before:text-gray-300
    before:content-['#']
    before:ml-[-1.6rem]
    `}
  }
  h2 {
    ${tw`
    text-4xl 
    before:text-gray-300
    before:content-['##']
    before:ml-[-2.4rem]
    `}
  }
  h3 {
    ${tw`
    text-3xl 
    before:text-gray-300
    before:content-['###']
    before:ml-[-3rem]
    `}
  }
  h4 {
    ${tw`
    text-2xl 
    before:text-gray-300
    before:content-['####']
    before:ml-[-3.1rem]
    `}
  }
  h5 {
    ${tw`
    text-xl 
    before:text-gray-300
    before:content-['#####']
    before:ml-[-3.3rem]
    `}
  }
  h6 {
    ${tw`
    text-lg
    before:text-gray-300
    before:content-['######']
    before:ml-[-3.5rem]
    `}
  }
`;

const BlogPostTemplate = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html, tableOfContents } = markdownRemark;

  return (
    <>
      <BlogHeader title="b:LOG" seo={frontmatter.title} />
      <Container>
        <Header>
          <PostTitle>{frontmatter.title}</PostTitle>
          <GapHorizontality>
            <span>{frontmatter.date}</span>
          </GapHorizontality>
          {frontmatter.tags?.map((tag) => (
            <GapHorizontality>
              <Tag name={tag} />
            </GapHorizontality>
          ))}
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
        tags
      }
    }
  }
`;
