import { graphql } from "gatsby";
import React from "react";

export default function Template({ data }) {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  return (
    <div>
      {/* Title and Date */}
      <div>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
      </div>
      {/* Show Markdown Content. */}
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        slug
        title
      }
    }
  }
`;
