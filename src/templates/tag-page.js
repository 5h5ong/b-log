import { graphql } from "gatsby";
import React from "react";
import tw from "twin.macro";
import BlogHeader from "../components/BlogHeader";
import ElementGapWrapper from "../components/ElementGapWrapper";
import PostPreview from "../components/PostPreview";

const PostContainer = tw.div`max-w-screen-xl m-auto`;

const TagPageTemplate = ({ data, pageContext }) => {
  const { tag } = pageContext;
  const { edges, totalCount } = data.allMarkdownRemark;
  return (
    <>
      <BlogHeader title={` Tags ; ${tag}`} />
      <PostContainer>
        {edges.map(({ node: { fields, frontmatter } }) => (
          <ElementGapWrapper>
            <PostPreview
              title={frontmatter.title}
              date={frontmatter.date}
              to={fields.slug}
            />
          </ElementGapWrapper>
        ))}
      </PostContainer>
    </>
  );
};

export default TagPageTemplate;

export const pageQuery = graphql`
  query ($tag: String) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      # What is edges? Meaning?
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
