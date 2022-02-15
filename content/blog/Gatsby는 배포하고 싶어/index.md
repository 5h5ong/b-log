---
title: Gatsby는 배포하고 싶어!
date: 2022-02-15
tags: ["gatsby", "deploy", "github", "guide"]
---

멋진 블로그를 만들면 무슨 소용인가요! 인터넷에서 접근할 수 있어야 비로소 반듯한 블로그가 되는 법 입니다.

그래서 고민을 시작했습니다. 어디에 배포해야 잘 배포했다고 소문이 날까?
Gatsby Cloud도 있구요, Netlity도 있고.. 선택지가 꽤 많습니다. 대체 무엇을 써야 하는가?!?

# Github Pages

![역사적인 배포지 발표 장면.png](2022-02-15-1.png)

여러 조건을 따진 결과 이번 블로그 배포지의 영광을 `Github Pages`가 차지하게 되었습니다! 모두 축하해 주세요!

Github Pages는 무려 **무료**입니다! 과금 걱정은 이제 그만! 그저 올려 놓으면 그저 끝이라는 거에요! **무료!!**

# 배포는 어캐 해요?

걱정하지 마시라, 별로 설정할 것도 없습니다.

## Gatsby 빌드

그냥 코드를 생짜로 올려버리면 될까요? 아닙니다. 실제 배포를 하기 위해서는 코드를 빌드 해주는 작업이 필요합니다.
Gatsby가 생짜 코드를 예쁘게 다듬어서 배포 환경에서 제대로 작동할 수 있게 만드는 거에요.

```shell
npm run build
```

다음 명령어를 실행하면 gatsby build가 실행됩니다. 모든 작업이 끝나면 `public`이라는 디렉토리가 생성됐을 거에요.
배포에 사용되는 것이 바로 저 디렉토리 입니다!

## master

저는 하나의 저장소에 원래 파일과 빌드 파일을 같이 넣어두기로 결정 했습니다.

이를 위해 먼저 원래 파일을 Github에 올려줄 거에요. 원래처럼 저장소를 하나 만들고 master에 푸시 해주세요.
이제 저장소의 master branch에서 원래 파일들을 볼 수 있어요!

## gh-pages

```shell
npm install --save-dev gh-pages
```

이제 배포하는 것만이 남았네요. 이번에 수고 해주실 패키지는 바로 `gh-pages` 입니다.
우리가 원하는 임의의 브랜치에 업로드를 할 수 있게 해 줄 거에요.

코드에 쓰이진 않으니 dev dependency에 넣어주세요.

```shell
gh-pages -d public -b gh-pages
```

`gh-pages`는 다음과 같이 쓰입니다. 디렉토리, public을. 브랜치, gh-pages에 업로드한다. 이렇게 이해하면 됩니다.

Github은 `gh-pages`라는 브랜치가 있을 때 그 브랜치의 파일을 토대로 Github Pages를 배포해요.
물론 Github Pages에 사용할 브랜치를 설정에서 직접 설정할 수도 있답니다!
하지만 저는 설정할 일도 없이 자연스럽게 이뤄지는 이 방식이 훨씬 더 마음에 들어요.

## 끝?

```js
const userName = "testUser";
const repositoryName = "example";
return `https://${userName}.github.io/${repositoryName}`;
```

다음 주소에서 확인해 보세요. 블로그가 보이나요? 축하합니다. 여러분들은 이제 배포도 정복해 버린겁니다!

## scripts 설정

다만 위의 저 명령어들을 배포할 때마다 쳐야 한다면 꽤 귀찮을 겁니다. 하다 못해 아예 명령어를 잊어 버릴지도 몰라요!

그래서 `package.json`의 scripts에 배포 명령어를 만들어 둘 거에요!

```json
"scripts": {
  ...
  "build": "gatsby build --prefix-paths",
  "clean": "gatsby clean",
  "deploy": "npm run clean && npm run build && gh-pages -d public -b gh-pages"
}
```

명령어 순서는 다음과 같습니다.

1. public, .cache 정리
2. 빌드
3. Github에 배포

혹시나 생길 오류를 아예 없애기 위해 `gatsby clean`을 통해 정리한 다음 배포를 진행하게 만들어 줬습니다.

이제 배포를 하고 싶으면 단순히 `npm run deploy`만 입력하면 된다구요! 너무 간단하지 않나요?

# 알아둬야 할 것

```js
const userName = "testUser";
const repositoryName = "example";
// return `https://${userName}.github.io/${repositoryName}`;
return `https://${userName}.github.io/`;
```

사실 Github Pages 배포의 정석은 저장소의 이름을 `${userName}.github.io`로 만들어 그 안에 파일을 업로드하는 거에요.
이렇게 배포하면 상단과 같은 주소로 배포된 사이트에 접속할 수 있게 돼요. 뒤에 `${repositoryName}`이 붙지 않는 형태죠.

**"그렇다면 너는 왜 그렇게 하지 않았나?"** 라고 물어 보신다면 저는 예전에 이미 배포한 서비스가 하나 있거든요!
그 애가 이미 github.io를 사용하고 있어서 다른 방법을 찾아야 했어요.
배포한 서비스를 밀어버리고 거기에 블로그를 넣어도 되겠지만 어떻게 그러겠어요, 내 손으로 만들었는데!

그 방식 때문에 약간의 문제가 발생했어요. Gatsby는 저 뒤의 `${repositoryName}` 같은 건 듣도 보지도 못했거든요.
결국 Gatsby는 그걸 무시해 버려요. 링크에 `${respositoryName}`이 빠져 버리는 거에요.
그럼 어떻게 될까요? 물론 개박살이죠! 하하!!

![오마이갓 비상사태 큰일났다 X..](2022-02-15-13-11-12.png)

그럼 무엇을 해야 될까요? 바로 prefix가 등장할 차례입니다.

## pathPrefix

```js
const respositoryName = "test";

{
  ...
  pathPrefix: process.env.NODE_ENV === "production" ? `/${repositoryName}` : "/",
}

const before = "https://.../";
const after = `https://.../${repositoryName}`;

```

`pathPrefix`는 url 뒤에 새로운 prefix를 붙여주는 역할을 합니다. 이를 통해 Gatsby에게 `${repositoryName}`을 알려줄 수 있게 되는 거죠.
거기에 `NODE_ENV`로 prefix의 적용을 다르게 만들 수도 있습니다.

```shell
gatsby build --prefix-paths
```

그리고 설정에 명시된 prefix를 적용하기 위해선 빌드 때 `--prefix-paths`를 붙여줘야 해요.

기억하세요! `pathPrefix`!
