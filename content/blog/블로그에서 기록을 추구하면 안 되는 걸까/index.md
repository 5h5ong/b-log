---
title: 블로그에서 기록을 추구하면 안 되는 걸까
date: "2022-02-05"
tags: ["gatsby", "guide"]
---

저는 어디다 적어두는 걸 좋아합니다. 그래요. 다 좋지만, 결국 마음에 드는 노트 앱을 찾지 못했던 게 모든 문제의 시작이었습니다...
Google Keeps, Simplenote, Obsidian.md, Joplin, Onenote, Turtl... 으악!

그렇게 도자기를 깨 부수는 장인의 심정으로 두 눈에 불을 켜고 다닌 결과 그럭저럭 마음에 드는 노트 앱을 찾을 수 있었어요!
그 이름하야 바로 `Notion`!

꽤 마음에 들었어요! 이렇게 저렇게 대충 배치해도 생각보다 보기도 좋고 정리하기도 쉽구요. 거기에다 남자의 마음을 울리는 데이터베이스까지, 이거 못 참거든요.

그래도 마음 속 한 켠에는 쪼~금. 아주 쪼오~~~금 불편했습니다. `Notion`은 오프라인 저장을 지원하지 않았거든요!!

자고로 기록이란 제 두 손아귀에 원본이 쥐어 져야만 편안한 기분이 들지 않겠어요? 언젠가 `Notion`이 오프라인 저장을 지원해 주리라 믿었지만 결국 저를 배신해버린 겁니다. 그렇게 나오신다 이 말이죠? 까라면 까라지..

결국 목마른 놈이 우물을 판다고 하죠?

그렇게 모든, 진짜로 모든 것! 을 직접 가질 수 있는 방법이 없나 찾아보다 결국 블로그의 마수에 빠지게 된 겁니다. 어찌 이럴수가.

# Gatsby

[The Fastest Frontend Framework for Headless CMS's | Gatsby (gatsbyjs.com)](https://www.gatsbyjs.com/)

그래서 선택했습니다! Gatsby! 리엑트를 기반으로 깔끔한 정적 사이트를 만들어주는 프레임워크라니, 정말 완벽하지 않나요..?

## 준비물

- Gatsby (세 번 별표, 빨간줄 쫘악)
- 세기의 대문호의 시그널을 받은 기가 막힌 마크다운

다음과 같은 준비물이 필요합니다.

## 해봅시다!

Gatsby는 그저 근본입니다. 간단하게 마크다운을 저장하고 다룰 수 있게 만들어주기 때문이에요!

Gatsby를 설치했다면, 이어서 아래의 패키지를 설치하세요.

- gatsby-source-filesystem
- gatsby-transformer-remark

설치를 마쳤다면, `gatsby-config.js`를 설정해줘야 합니다.

### 마크다운

```jsx
// `gatsby-config.js`
plugins: [
  {
    resolve: `gatsby-source-filesystem`,
    options: {
      name: `blog`,
      path: `${__dirname}/content/blog`,
    },
  },
  `gatsby-transformer-remark`,
];
```

먼저 우리의 기가 막힌 마크다운이 어디에 있는지 Gatsby에게 알려줘야 합니다. 이 때 필요한 것이 바로 `gatsby-source-filesystem` 이에요.

마크다운을 어디에 저장할지 지정해 줄 수 있어요. 예시의 경우는 `/content/blog`에 마크다운들이 위치해야 되겠죠?

다음은 마크다운을 실제로 사용할 수 있게 만들어줘야 합니다. `gatsby-transformer-remark` 보이죠? 저게 마크다운을 파싱해서 사용 가능한 형식으로 바꿔줍니다.
마크다운 안의 정보를 비로소 블로그에 표시해 줄 수 있는거죠!

이 과정까지 진행했다면, 여러분들은 이제 블로그를 만들 첫 발자국을 땐 겁니다. 와!

### 블로그 페이지 생성

다음으로 가져온 마크다운들의 정보를 활용해 페이지를 만들어줘야 합니다.

#### 템플릿 페이지

먼저 마크다운을 표시할 페이지의 틀을 만들어줘야 합니다.

```jsx
// templates/blog-post.js
const BlogPostTemplate = ({ data }) => {
  // 마크다운 가져오기
  const { markdownRemark } = data;
  // 마크다운 제일 앞의 메타데이터(title, date), 파싱된 html
  const { frontmatter, html } = markdownRemark;

  return (
    <>
      <header>
        <h1>{frontmatter.title}</h1>
        <p>{frontmatter.date}</p>
      </header>
      <section dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
};

export default BlogPostTemplate;

// 페이지 생성 때 들어온 context의 id로 query
export const pageQuery = graphql`
  query BlogPostBySlug($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
```

템플릿 페이지는 간단히 다음의 과정을 거칩니다!

1. graphql을 통해 필요한 마크다운 데이터 가져오기
2. 그걸로 페이지 표시하기
3. Profit!

그 중에서 graphql query를 이해하지 못할 수도 있어요. 아니, id는 대체 어디서 들어온담?

그 답은 바로 다음 섹션에 있습니다! 새로운 페이지를 만드는 과정에서 context를 통해 마법이 일어나게 되는 거에요!

#### 페이지 생성

[Gatsby Node APIs](https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/)

템플릿 페이지를 만들었다면 이제 진짜 페이지를 만들 차례입니다.

이 때 사용하는 게 `gatsby-node.js`라는 파일입니다. 이 파일 안에서 동적으로 페이지들을 만들 수 있어요.

```typescript
exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  // 템플릿 페이지 가져오기
  const blogPost = path.resolve(`./src/templates/blog-post.js`);

  // 모든 마크다운 파일의 데이터 가져오기
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

  // 마크다운 파일들의 데이터
  const posts = result.data.allMarkdownRemark.nodes;

  // 마크다운 파일이 존재할 때, 하나씩 반복하며 새로운 페이지 생성
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const {
        id,
        fields: { slug },
      } = post;

      // 페이지 생성
      createPage({
        // 생성될 페이지의 주소
        path: slug,
        // 생성될 페이지의 컴포넌트(템플릿 페이지)
        component: blogPost,
        // 페이지 컴포넌트에 포함될 props, GraphQL query의 augments로 사용할 수 있음
        context: {
          id: id,
        },
      });
    });
  }
};
```

- slug
  - content/blog/ 아래의 디렉토리의 이름부터 주소에 포함됨
  - ex) content/blog/test -> https://.../test

위의 섹션에서 graphql query의 id를 어떻게 받아오냐? 라고 의문을 가지신 분들, 모두 잠시 멈춰주시길 바랍니다.

상단의 context가 보이시나요? 저 부분이 바로 핵심입니다. 저기로 넘어가는 데이터들을 Graphql query의 augments로 사용할 수 있어요!

그렇기 때문에 위에서 적절한 마크다운 데이터를 받아와 표시해줄 수 있던 것 이랍니다. 어때요, 완전 멋지지 않아요?

#### 잠깐만!

![](2022-02-07-13-13-08.png)

그런데 이 상태로 돌려보면 막상 잘 되지 않을거에요. Graphql의 fields는 원래 존재하지 않거든요! 짜잔, 사실 속으신 거에요~

라고 할 수는 없고, 직접 만들어줘야 해요!

```typescript
/**
 * node에 페이지의 주소를 담은 slug field를 추가함
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
```

위와 같이 `gatsby-node.js`에 slug field를 만들어 페이지를 접근하는데 쓰일 주소를 넣어줘야 해요.
이 과정이 없으면 query할 때 slug에 아무 값도 없어 제대로 동작하지 않아요.

### 페이지 보여주기

축하합니다! 이제 여러분들은 마크다운을 기반으로 생성된 페이지를 만들 수 있게 됐어요.

물론, 주소로 페이지를 접근할 수 있게 됐다는 소리이기도 합니다. 한 번 들어가보세요. 쩔어주는 페이지가 여러분을 기다리고 있습니다.

하지만 블로그에서 가장 중요한 과정이 남았어요. 우리 모두 구질구질하게 주소를 입력해서 글을 찾아보진 않죠?

바로 생성된 블로그의 글들을, 페이지들을, 사람들에게 보여줘야 한다는 것!

```jsx
const IndexPage = ({ data }) => {
  // 페이지들 가져오기
  const posts = data.allMarkdownRemark.nodes;

  // 페이지가 있으면 보여주기, 없으면 없다고 표시
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
          const {
            fields: { slug },
          } = post;
          const { title, date } = post.frontmatter;
          return (
            <Link to={slug}>
              <h2>
                <span>{title}</span>
              </h2>
              <div>{date}</div>
            </Link>
          );
        })}
      </main>
    );
  }
};

export default IndexPage;

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
```

query를 통해 모든 페이지 데이터를 가져온 다음 모두 표시해 주는거에요!
이제 여러분들은 블로그의 마크다운 페이지에 접근할 수 있는 페이지까지 만들어 냈습니다!

여기서 더 무엇이 필요할까요? 축하합니다. 여러분들은 마침내 가장 기본적인 블로그를 만들어 냈습니다!

이제는 여러분들의 차례입니다. 마음대로 주무르세요! 세상 모든 사람들이 반할만한 개쩌는 블로그를 만들어 보세요!!
