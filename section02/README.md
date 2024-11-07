# 2.1) Page Router 를 소개합니다. 
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

# 2.3) 페이지 라우팅 설정하기
- 페이지 라우팅 생성시 
    - 방법 1 : search.tsx 
    - 방법 2 : folder search > index.tsx
- 폴더 중첩 또는 해당 폴더에 경로명 파일을 생성하여 중첩된 페이징 라우팅이 가능.


## 동적 페이지 생성 및 동적 값 읽기
두 방식 동일하게 useRouter을 이용해서 query 객체에서 값을 읽을 수 있다.
```js
import { useRouter } from "next/router";
 const router = useRouter();
 const { q } = router.query;
```

### queryString 읽기
- import { useRouter } from "next/router";
- 기본 컴포넌트가 렌더링되고 queryString 을 이으면서 화면이 렌더링되기 때문에 두번 렌더링 된다. 따라서 두번째에 router 객체에 query 속성에 값을 읽어온다. 


### URL Parameter 
- ./book/100, ./book/200 과 같은 동적 페이지 생성시
    - book 폴더 하위에 [id].tsx 라는 파일을 생성하면 동적경로와 대응하게 됨.
    - [] 안에 있는 값이 키값이 되어 저장됨.
- ./book/123/4324 과 같은 여러개의 값을 보내고 있으면
    - [...id].tsx 와 같이 파일을 생성한다.(Catch All Segment)
    - ... 는 여러개의 id가 들어갈 수 있다는 의미 
    - query 객체에는 배열형태로 저장되어있음.
- ./book 을 했을때는 404 not found 로 뜨게 됨 
    - url parameter을 받도록 해두었기 때문에 
    - => book 페이지를 만들어주면 되지 않나 하지만 이거보다
    - [[...id]].jsx 와 같이 대괄호로 한번더 감싸주면 id가 있든 없든 대응이 가능하다. (Optional Catch All Segement)

## Not Found 페이지 만들기
- pages/404.tsx 파일 생성해서 기본 page 컴포넌트 리턴해주기.