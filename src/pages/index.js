import { graphql, Link } from "gatsby";
import * as React from "react";

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};

// markup
const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <main style={pageStyles}>
        <title>Home Page</title>
        <h1>It's basic bLog</h1>
        <p>No bLog posts Found.</p>
      </main>
    );
  } else {
    return (
      <main style={pageStyles}>
        <title>Home Page</title>
        <h1>It's basic bLog</h1>
        {posts.map((post) => {
          const { title, slug } = post.frontmatter;
          return (
            <h2>
              <Link to={slug}>
                <span>{title}</span>
              </Link>
            </h2>
          );
        })}
      </main>
    );
  }
};

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          slug
        }
      }
    }
  }
`;

export default IndexPage;
