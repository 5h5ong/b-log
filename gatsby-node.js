/**
 * `gatsby-node.js`에서 모든 마크다운의 페이지를 생성함
 */

const { createFilePath } = require("gatsby-source-filesystem");
const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);

  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);

  const posts = result.data.allMarkdownRemark.nodes;

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const {
        id,
        fields: { slug },
      } = post;
      createPage({
        path: slug,
        component: blogPost,
        context: {
          id: id,
        },
      });
    });
  }
};

/**
 * MarkdownRemark의 slug에 값을 넣음
 * @remarks
 * 없으면 slug에 값이 없어 에러뜸
 */
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: "slug",
      node,
      value,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type Fields {
      slug: String
    }

    type MarkdownRemark implements Node {
      fields: Fields
    }
  `);
};
