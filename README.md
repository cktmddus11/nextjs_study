# Next.js 를 소개합니다. 
## 어떤 기술일까?
- React.js 전용 웹 개발 Framework
- React.js 를 보다 더 강력하고 편하게 사용할 수 있는 기능들을 제공함.
    - 페이지 라우팅
    - 빌트인 최적화 기능
    - 다이나믹 HTML 스트리밍
=> React.js의 확장판
- Next.js는 Library가 아닌 Framework 이기 때문에

``` 
- 기능 구현의 주도권이 누구에게 있는가에 따라 Library, Framework 가 달라짐.

Framework(주도권이 개발자에게 없다) - Next.js, Remix
=> 자유도가 낮다. 
   프레임워크가 제공하는 기능을 이용하거나 허용하는 범위내에서만 
   추가 도구 사용 가능
Library(주도권이 개발자에게 있다) - React.js, JQuery
=> 자유도가 높다. 기본기능 외 제공 X
    기능 구현을 원하는 방향으로 진행한다. 
    쓰고싶은 도구, 쓰고싶은 기술을 쓴다.
```

## 특징?
- Next.js 는 Library가 아닌 Framework 입니다.


# 사전 렌더링 이해하기
## 사전 렌더링 
- 브라우저의 요청에 사전에 렌더링이 완료된 HTML 을 응답하는 렌더링 방식
- Client Side Rendering 의 단점을 효율적으로 해결하는 기술

[사전렌더링](사전렌더링.PNG)  

## Client Side Rendering(CSR)
- React.js 앱의 기본적인 렌더링 방식
- 클라이언트(브라우저)에서 직접 화면을 렌더링하는 방식


# Page Router 를 소개합니다. 
> 안정적인 라우터   
> React Router처럼 페이징 라우팅 기능을 제공함.

- pages 폴더를 기준으로 라우팅됨.
- 동적경로 ~/item/100 같은 페이지를 만드려면 폴더를 pages/item/[id].js  로 생성


- npx create-next-app@14 section02
- npm run dev

## 프로젝트 구조 확인
- public - 동적 파일
- src
    - pages : 경로에 맞는 페이지
    - styles

- _app.tsx : 모든 페이지의 부모역할을 하는 root 컴포넌트
    => layout이나 공통 비즈니스 로직을 작성할 수 있음.
- _document.tsx : 모든 페이지에 공통적으로 적용해야하는 html 코드 설정.
    => meta 태그, font, chracter set, Third party code
- next.config.mjs : next앱의 설정 관리