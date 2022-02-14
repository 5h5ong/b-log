/**
 * `gatsby-node.js`에서 모든 마크다운의 페이지를 생성함
 */

const { createFilePath } = require("gatsby-source-filesystem");
const path = require("path");

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const tagPage = path.resolve(`./src/templates/tag-page.js`);

  const result = await graphql(`
    query {
      allMarkdownRemark(sort: { fields: [frontmatter___date], order: ASC }) {
        nodes {
          id
          fields {
            slug
          }
        }
        group(field: frontmatter___tags) {
          fieldValue
        }
      }
    }
  `);

  const posts = result.data.allMarkdownRemark.nodes;
  const tags = result.data.allMarkdownRemark.group;

  /**
   * Create blog post page
   */
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

  /**
   * Create tag detail page
   */
  if (tags.length > 0) {
    tags.forEach((tagObject) => {
      const { fieldValue } = tagObject;
      createPage({
        path: `/tags/${fieldValue}`,
        component: tagPage,
        context: {
          tag: fieldValue,
        },
      });
    });
  }
};

/**
 * Graphql의 특정 node에 field를 추가함
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
