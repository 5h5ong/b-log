import { graphql } from "gatsby";
import * as React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import PostPreview from "../components/PostPreview";

// styles
const Main = styled.main`
  ${tw`p-64`}
`;
const H1 = styled.h1`
  ${tw`
    font-mono
    text-5xl
    mb-16
  `}
`;

// markup
const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Main>
        <title>Home Page</title>
        <H1>It's b:LOG</H1>
        <p>No bLog posts Found.</p>
      </Main>
    );
  } else {
    return (
      <Main>
        <title>Home Page</title>
        <H1>It's b:LOG</H1>
        {posts.map((post) => {
          const {
            fields: { slug },
          } = post;
          const { title, date } = post.frontmatter;
          return <PostPreview title={title} date={date} to={slug} />;
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
