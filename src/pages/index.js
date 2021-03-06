import { graphql } from "gatsby";
import * as React from "react";
import tw from "twin.macro";
import BlogHeader from "../components/BlogHeader";
import ElementGapWrapper from "../components/ElementGapWrapper";
import PostPreview from "../components/PostPreview";

const Main = tw.main`max-w-screen-lg m-auto`;

const Header = () => {
  return <BlogHeader title="It's b:Log" seo="Home Page" />;
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
          const { title, date, tags } = post.frontmatter;
          return (
            <ElementGapWrapper>
              <PostPreview title={title} date={date} tags={tags} to={slug} />
            </ElementGapWrapper>
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
          tags
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
