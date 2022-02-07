---
title: tailwindcss와 함께하는 Gatsby
date: "2022-02-07"
---

# 선생님, 저는 CSS가 싫어요!

CSS, 웹의 숙명과도 같지만 막상 작업에 들어가면 살짝 질리는 느낌이 있습니다. 왜? 너무 귀찮거든요!

보더 넣어주고, 마진 넣어주고. 중앙 정렬 해주고 텍스트 크기 맞춰주고.. 어 저거 조금 어울리지 않는 거 같은데?
다시 마진 쪼금 수정해주고, 또 마음에 안들죠? 또 수정하죠? 네, CSS의 연옥에 빠져버린 겁니다.

![GATSBY_EMPTY_ALT](2022-02-06-23-17-49.png)

결국 저는 미래의 저에게 시그널을 보낼 수 밖에 없었습니다. 미래의 나. 감당할 수 있겠어.. 이 "어둠"을...?

![](2022-02-06-23-50-02.png)

안돼!! 블로그에서도 그런 일을? 절대, 이 것만큼은 양보할 수 없었어요!!
그렇게 결정된 겁니다. 블로그는 TailwindCss를 쓰자. 거기에 Styled Components까지 쓰까먹자!

## Styled Components

Styled Components는 때놓을 수 없는 저의 영혼의 동반자와도 같은 친구입니다.
사실 Gatsby 문서에서는 `emotion`과 `Tailwind`를 엮어쓰는 걸 보여주지만 이미 암묵적 거래관계를 맺고 있는 Styled Components를 포기할 수 없었어요.

어떻게 영혼의 동반자를 포기합니까? 안 그래요, 여러분?

여러분들은 이러지 마세요...

### 설정

```shell
npm install gatsby-plugin-styled-components styled-components babel-plugin-styled-components
```

설치 후, `gatsby.config.js`의 `plugins`에 다음과 같이 명시 해주세요.

```js
module.exports = {
  plugins: [`gatsby-plugin-styled-components`],
};
```

이제 Styled Components를 사용할 준비가 완료 됐습니다! 다음으로 넘어가 봅시다.

## Tailwind CSS

**`TailwindCSS`가 무엇이냐?** 라고 물어본다면 대답해 드리는 게 인지상정.

... 뭐 대단한 건 없구요, 기존에 열심히 작성하던 css를 훨씬 간단한 표현으로 줄여 쓸 수 있다는 거에요.

예를 들어 **특정 부분에 마우스를 가져다 대면 텍스트의 색깔을 정열의 빨간색으로 바꾸게 해주고 싶다.**
이 걸 구현하려면 css는 ::hover 안에 색깔을 입력하고.. 그런 과정을 거쳐야 했지만 과연 Tailwind는 어떻게 적어낼 수 있느냐!

```plain
hover:text-red-900
```

저 아름다움이 보이시나요? 마우스를 가져다 대면 텍스트를 새빨간 색으로! 저리 단순하게 작성이 가능합니다!

저, 사랑에 빠져버린 걸지두..

그럼 한번 Gatsby에서 사용할 수 있게 만들어 봅시다!

### 설정

tailwind는 보통 html element의 class를 통해 스타일을 적용합니다. 하지만 저는 이번에 그러지 않을 거에요.

대신 Styled Components에 `tw.macro`을 이용해 tailwind를 써 볼 겁니다!

조금 설명을 해보자면 `tw.macro`는 babel의 macro를 통해 만들어진 tailwind plugin 입니다. 이걸로 쉽게 tailwind를 사용할 수 있어요.

```shell
npm install tailwindcss
```

```shell
npm install -D twin.macro
```

위와 같이 tailwind와 twin.macro를 설치해 주세요.

다음으로 tailwind의 config를 만들어 줘야 하는데요. 있어도 되고 없어도 되지만 저는 일단 만들어 놓겠습니다.

```shell
npx tailwindcss init
```

실행하고 나면 `tailwind.config.js`라는 파일이 생성됩니다.

이러면 설치는 끝났습니다.

다만 여러분, `tw.macro`는 emotion을 기반으로 맞춰져 있다는 사실을 잊으면 안됩니다.
저는 Styled Components를 사용하니 그에 맞춰 `tw.macro`의 설정을 써줘야 해요! 이거 Styled Components 혐오야!!

```json
// package.json
"babelMacros": {
  "twin": {
    "config": "./tailwind.config.js",
    "preset": "styled-components"
  }
}
```

단순해요! `twin.macro`에서 emotion이 아닌 styled components를 사용하겠다는 의미입니다.

그래요. 이제 전부 끝...났으면 좋겠지만 반드시 알아야 될 사실이 하나 있습니다.

#### 컨피그를 빼먹었어요!

이런! 작은 실수를 했네요. 그만 tailwind의 설정을 까먹어 버린거에요! 괜찮습니다. 설정은 적어주면 되는 거니까요.

그런데, Gatsby 선생님이 그렇게 만만하지 않습니다.

```js
// Before
const Main = styled.main`
  ${tw`p-64`}
`;

// After
const Main = tw.main`
  p-64
`;
```

다음과 같이 코드를 바꿨는데 아뿔사, 이 때 설정을 빼먹어 오류가 떠버린 겁니다!

```
 ERROR #98124  WEBPACK

Generating development JavaScript bundle failed

Can't resolve '@emotion/styled' in '/Users/.../project/b-log/src/pages'

If you're trying to use a package make sure that '@emotion/styled' is installed. If you're trying to use
a local file make sure that the path is correct.

File: src/pages/index.js:7:0

failed Re-building development bundle - 0.503s
```

친절하게도 emotion을 빼먹었다고 말해주네요! 여러분들은 쓰라린 속을 붙잡고 설정을 써줬습니다. 그리고 다시 실행!

```
 ERROR #98124  WEBPACK

Generating development JavaScript bundle failed

Can't resolve '@emotion/styled' in '/Users/.../project/b-log/src/pages'

If you're trying to use a package make sure that '@emotion/styled' is installed. If you're trying to use
a local file make sure that the path is correct.

File: src/pages/index.js:7:0

failed Re-building development bundle - 0.503s
```

???

같은 오류가 다시 한 번 발생했습니다. 이게 무슨 일이야! 설정을 줬는데 왜 받아먹질 못해!

파일의 내용이 바뀌지 않았거든요. Gatsby는 파일이 유의미하게 바뀌었을 경우에만 새로이 빌드를 진행합니다.
바뀐 부분이 없으니 같은 에러를 끊임없이 보여주는 거에요!

이걸 해결하기 위해선 어떻게든 파일에 유의미한 변화를 넣어줘야 합니다. import를 살짝 수정하던지, 아님 순서를 살짝
바꿔 주던지 해서 정상적으로 빌드가 이뤄지는 걸 확인하고 Gatsby를 종료한 다음 다시 실행주세요.

다행입니다. 이제 바뀐 설정이 제대로 적용됐습니다...!

이 간단한 걸 해결하려고 1시간 21분을 태운 건 비밀입니다. 고얀 놈...

## 사용 해보기

> 저는 max-width를 정하고 중앙 정렬을 한 다음 위, 아래에 마진을 쪼금 먹여주고 싶구요. 타이틀의 텍스트를 크게 만들었으면 좋겠어요!

```js
const Container = styled.div`
  ${tw`max-w-screen-md m-auto my-40`}
`;

const Title = styled.h1`
  ${tw`text-4xl`}
`;
```

이게 끝입니다!

`Container`에 max-width를 screen-md(768px)로, margin: auto를 통해 중앙정렬, 위, 아래 마진을 40(10rem).

`Title`의 font-size를 4xl(2.25rem)으로.

너무 간단하지 않나요?? 여러분들 모두 tailwind의 세계로 빠져들게 됐나요? 그럼 당장 적용하러 가세요! 저도 마저 즐기러 가겠습니다.

ㅃㅃ!
