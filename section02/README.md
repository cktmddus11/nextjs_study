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


# 2.3) 네비게이팅
```html
<a></a> # 기존의 a 태그는 csr 방식으로 페이지를 이동시키는 게 아니라
# html 일반적인 방식으로 페이지를 매번 새롭게 요청하는 방식으로 이동시키게 됨.
```
- next.js app => Link 컴포넌트 사용.
- csr 방식으로 페이지 이동하도록 구현
```js
import {useRouter} from "next/router";
 router.push("/test")
```

### pre-fetching 예외
- Link 컴포넌트로는 잘됨.
- 프로그래밍적으로? 페이지 이동을 구현해 놨을 경우 EX) button 으로 클릭시 했을 때는 안됨

### router 객체의 prefetch 이용하기
```js
  useEffect(() => {
    router.prefetch("/test")
  }, []);
```
### 해제
```js
<Link href={'/search'} prefetch={false}>search</Link>

```

# 2.5) API Routes
Next.js 에서 API를 구축할 수 있게 해주는 기능

## API 정의
- pages > api > hello.ts => /api/hello 라는 api 경로로 작동됨.
- NextApiRequest, NextApiResponse 객체 사용   
  [API ROUTES 공식 문서](https://nextjs.org/docs/pages/building-your-application/routing/api-routes)



# 2.6) 스타일링
- app 컴포넌트가 아닌 다른 컴포넌트에서는 global css 바로 import 할 수없음
  => css class 충돌방지를 위해 

## CSS Module
- index.module.css 로 import 후 객체에 담아서 페이지 별로 유니크하게 사용
```js
import style from "./index.module.css";

```

# 2.7) 글로벌 레이아웃 설정하기
- src > components > global-layout.tsx
  - APP 컴포넌트에 GlobalLayout 으로 감싸주기
  - global-layout.module.css import 

```js
// global-layout.tsx
  export default function GlobalLayout({children} : {
    children:ReactNode
  }){
    return <>
```
```js
// _app.tsx
    export default function App({Component, pageProps}: AppProps) {
    // Component : 페이지 역할
    // pageProps : 페이지에 전달할 Props
    return <>
    <GlobalLayout>
    <Component {...pageProps} />
```
- 레이아웃 컴포넌트에는 children 으로 APP 컴포넌트에서 전달하는 PageProps를 받을 수 있도록 함.

# 2.8) 페이지별 레이아웃 설정하기
- 요건 : 검색바는 전체 화면에서 존재하지만 도서 상세 화면에서만 적용되지 않아야함.
  => global 컴포넌트 말고 필요한 페이지에서 컴포넌트를 호출하기

- 구현 : 각 페이지에 getLayout 함수 전달해서 App 컴포넌트에 페이지 컴포넌트 렌더링 할때 getLayout 에 있는 컴포넌트로 감싸서 전달되도록 처리.
```js 
// 각 페이지 컴포넌트
Home.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>
}
```
- App컴포넌트에 Component 파라미터에 각 페이지 컴포넌트가 담겨있음. 그래서 각 페이지에 인수로 전달한 getLayout함수를 Component 객체로 
불러올 수 있음. 
```js 
// app 컴포넌트
    const getLayout = Component.getLayout;
    return <>
        <GlobalLayout>
            {getLayout(<Component {...pageProps} />)}
```
- NextPage 타입 확장
```js
type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactNode) => ReactNode;  //  getLayout? : typescript 선택적 속성 (?) getLayout이 없는 페이지 때문에 옵셔널하게 처리
}
```
- AppProps 타입 확장 
```js
export default function App({Component, pageProps}: AppProps & {
  Component : NextPageWithLayout
}) {

```