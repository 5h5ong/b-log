import { graphql } from "gatsby";
// import * as React from "react";
import * as React from "react";
import tw from "twin.macro";
import BlogHeader from "../components/BlogHeader";
import PostPreview from "../components/PostPreview";
import Seo from "../components/Seo";

const Main = tw.main`
  p-64
`;

const Header = () => {
  return (
    <>
      <Seo title="Home Page" />
      <BlogHeader title="It's b:LOG" />
    </>
  );
};

// markup
const IndexPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes;

  if (posts.length === 0) {
    return (
      <Main>
        <Header />
        <p>No bLog posts Found.</p>
      </Main>
    );
  } else {
    return (
      <Main>
        <Header />
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
