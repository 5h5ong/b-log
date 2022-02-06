import { graphql, Link } from "gatsby";
import * as React from "react";
import styled from "styled-components";
import tw from "twin.macro";

// styles
const Main = styled.main`
  ${tw`p-64`}
`;
const H1 = styled.h1`
  ${tw`
    text-5xl
  `}
`;

// markup
const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Main>
        <title>Home Page</title>
        <H1>It's basic bLog</H1>
        <p>No bLog posts Found.</p>
      </Main>
    );
  } else {
    return (
      <Main>
        <title>Home Page</title>
        <H1>It's basic bLog</H1>
        {posts.map((post) => {
          const {
            fields: { slug },
          } = post;
          const { title, date } = post.frontmatter;
          return (
            <>
              <Link to={slug}>
                <h2>
                  <span>{title}</span>
                </h2>
                <div>{date}</div>
              </Link>
            </>
          );
        })}
      </Main>
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
        }
        id
        fields {
          slug
        }
      }
    }
  }
`;

export default IndexPage;
