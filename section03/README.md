# 섹션 3 : App Router 시작하기

## 29.3.1) App Router 시작하기
### 변경되거나 추가되는 사항
- React 18 신규 기능 추가
- 데이터 패칭 방식 변경
- 레이아웃 설정 방식 변경
- 페이지 라우팅 설정 방식 변경
### 크게 변경되지 않는 사항
- 네비게이팅(Navigating)
- 프리페칭(Pre-Fetching)
- 사전 렌더링(Pre-Rendering)

### section03 생성 명령어
- npx create-next-app@latest section03 : next js 의 최신버전 앱 생성
- typescript, eslint, app router

### 폴더 구조 살펴보기
- page.tsx - 페이지
- layout.tsx - 레이아웃


## 30.3.2) 페이지 라우팅 설정하기
### queryString 
- 디렉토리 구조 : app/search/page.tsx
ex) search?id=4 
  - searchParam 객체의 Promise형태로 존재함.
### urlParameter
- 디렉토리 구조 : app/book/[id]/page.tsx
ex) book/3
- params 객체가 Promise 형태로 존재함.

## 31.3.3) 레이아웃 설정하기
### 레이아웃
- layout.tsx, page.tsx : layout 컴포넌트 안에 page가 포함된 구조
- layout.tsx가 있는 폴더경로 하위 폴더가 존재한다면 하위폴더에는 중첩되어 layout이 적용됨.
```bash
📂 app
├── 📂 dashboard
│   ├── layout.tsx        # /dashboard에 적용되는 레이아웃
│   ├── page.tsx          # /dashboard 페이지
│   └── 📂 settings
│       └── page.tsx      # /dashboard/settings 페이지

```
- layout.tsx - 자식 컴포넌트인 page 컴포넌트를 children props 로 전달해줘야함.
```typescript
// app/dashboard/layout.tsx
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>Dashboard Navigation</nav>
      <main>{children}</main>
    </div>
  );
}

```

### 라우트 그룹
- 경로상에는 영향을 미치지 않는 플더.
- 그룹으로 묶인 경로에 동일한 layout 을 적용하기 위해서
ex) search, index page 적용시

## 32. 3.4) 리액트 서버 컴포넌트 이해하기
### React Server Component 이해하기
- React Server Component
  - React 18v 부터 새롭게 추가된, 새로운 유형의 컴포넌트
  - 서버측에서만 실행되는 컴포넌트(브라우저에서 실행 X)

- page router 에서는
  - js bundle 을 만들때 필요한 페이지와 연관된 모든 컴포넌트를 번들링하기 때문에 불필요하게 용량이 커짐
  - 해결 방안 : 상호작용이 없는 컴포넌트들 즉 브라우저에서 하이드레이션 될 필요없는 컴포넌트를 번들에서 제외하기

- 서버컴포넌트 : 서버측에서 사전 렌더링을 진행할 때 딱한번 실행됨
- 클라이인트 컴포넌트 : 사전 렌더링 진행할 때 한번, 하이드레이션 진행할 때 한번. 총 2번 실행.
> 페이지의 대부분을 서버 컴포넌트로 구성할 것을 권장.   
> 클라이언트 컴포넌트는 꼭 필요한 경우에만 사용할 것.



- page.tsx : 기본적으로 서버 컴포넌트
  - useEffect 등 클라이언트에서 실행되는 함수 사용 불가    
    => 클라이언트 컴포넌트로 변경할 컴포넌트 상단에 "use client"; 

## 어떨때 클라이언트 컴포넌트, 서버 컴포넌트?
- 상호작용이 있는 컴포넌트    
  ex) search bar

## co-location
- searchbar.tsx 같이 page, layout 제외한 컴포넌트, app 폴더에 다 모아놔도 됨.


## 33. 3.5) 리엑트 서버 컴포넌트 주의사항
### React Server Component 주의사항
1. **서버 컴포넌트**에는 브라우저에서 실행될 코드가 포함되면 안됨.   
ex) React Hooks, 이벤트 핸들러, 브라우저에서 실행되는 기능을 담고 있는 라이브러리
2. 클라이언트 컴포넌트는 클라이언트에서만 실행되지 않음.   

   | 서버 컴포넌트                                                        |                                                              클라이언트 컴포넌트                                                               |
   |----------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------:|
   | 서버측에서만 실행되는 컴포넌트 <br> => 서버측에서만 실행되기 때문에 번들링하여 클라이언트에게 전달하지 않음 | - 사전 렌더링을 위해 서버에서 1번 실행    <br>     ~  하이드레이션을 위해 브라우저에서 1번 실행 <br> => 서버와 클라이언트에서 모두 실행됨    <br>=> 브라우저에서 실행되기 때문에 클라이언트로 번들링되어 전송됨. |

3. 클라이언트 컴포넌트에서 서버 컴포넌트를 import 할 수 없음.
- JS 번들 시 서버 컴포넌트는 없기 때문에 import 할 수 없지만    
next js 는 서버 컴포넌트를 클리이언트 컴포넌트로 바꿔버린다.
때문에 클라이언트 자식 컴포넌트로 서버 컴포넌트 import 를 자제 해야한다. 
=> 대신 props나 children으로 전달받아 사용해야 한다.
4. 서버 컴포넌트에서 클라이언트 컴포넌트에게 직렬화 되지 않는 Props는 전달 불가능하다.   
런타임 에러남. 
> **직렬화(Serialization)**    
> 객체, 배열, 클래스 등의 복잡한 구조의 데이터를  
> 네트워크 상으로 전송하기 위해 아주 단순한 형태(문자열, Byte)로 변환하는것.
>  - 직렬화 가능한 데이터:
>     - 문자열, 숫자, 불리언 등의 기본 타입
>     - 배열, 객체 (단, 메서드를 포함하지 않는 순수 데이터 객체)
> - 직렬화 불가능한 데이터:
>     - 함수
>     - 클래스 인스턴스
>     - Date 객체
>     - Map, Set 등의 특수 객체
>     - DOM 노드

> **사전 렌더링 과정**
> 1. 페이지를 구성하는 모든 컴포넌트들
> 2. 서버 컴포넌트들만 따로 실행(RSC Payload)
> 3. 완성된 HTML 페이지 
>> **RSC Payload**
>> * 서버 컴포넌트들만 따로 실행되는 과정에서 생성되는 데이터
>> * 이 데이터는 최종적으로 클라이언트에게 전달되어 페이지를 구성하는데 사용됨. 
>> * React Server Component 의 순수한 데이터(결과물)
>> * React Server Component를 직렬화 한 결과 ex) json 형식
>> * RSC Payload에는 서버 컴포넌트의 모든 데이터가 포함됨.
>>      * 서버 컴포넌트의 렌더링 결과
        * 연결된 클라이언트 컴포넌트 위치
        * 클라이언트 컴포넌트에게 전달되는 값

![RSC Payload](../img/RSC_PAYLOAD.png) 

## 34.3.6) 네비게이팅
1) Link 컴포넌트 사용해서 페이지 이동

### Navigating(페이지 이동)
페이지 이동은 Client Side Rendering 방식으로 진행됨.(Page Router 방식)   
![App-Router-Pre-Fetching](../img/App-router-Pre-Fetching.png)

### 서버 컴포넌트에서 클라이언트 컴포넌트 렌더링 비교
1. 클라이언트 컴포넌트를 포함하지 않은 경우 (book/[id]/page.tsx)
- rsc
2. 클라이언트 컴포넌트를 포함한 경우 (search/page.tsx)
- rsc + client component

2) 프로그래밍 방식으로 페이지 이동
- router.push, router.replace 사용
> 1. `next/router` (Pages Router)
> 2. `next/navigation` (App Router)

### 프리패칭(Prefetching)
- 사용자가 특정 페이지를 요청하기 전에 해당 페이지의 리소스를 미리 로드하는 것을 의미합니다
- 빠른 응답 제공
- 네트워크 탭에서 확인 가능

### 빌드 시 두가지 렌더링 방식
| 구분 | Static (○)                    | Dynamic (ƒ) |
|------|-------------------------------|-------------|
| **설명** | prerendered as static content | server-rendered on demand |
| **예시** | page.tsx(root page)           | book/[id]/page.tsx, search/page.tsx |
| **유사한 방식** | SSG (빌드 시 미리 렌더링)             | SSR (요청 시 렌더링) |
| **데이터 패칭** | RSC Payload, JS Bundle        | JS Bundle |



```
npm install @xyflow/react --legacy-peer-deps
npm install react-draggable@4.4.6 --legacy-peer-deps
npm install reactflow --legacy-peer-deps
```

```
npm install -D tailwindcss --legacy-peer-deps
npx tailwindcss init
```

# 35. 3.7) 한입북스 UI 구현하기 
### useSearchParams
`useSearchParams`는 Next.js 13 이상의 App Router에서 URL의 쿼리 파라미터를 읽기 위해 사용되는 클라이언트 사이드 훅입니다.

주요 특징:
1. **클라이언트 컴포넌트 전용**: "use client" 지시문이 필요합니다.
2. **읽기 전용**: 쿼리 파라미터를 읽을 수만 있고, 직접 수정은 불가능합니다.
3. **실시간 업데이트**: URL이 변경될 때마다 자동으로 최신 값을 반영합니다.

예시 코드에서는 다음과 같이 사용되고 있습니다:

```typescript:section03/src/components/searchbar.tsx
const searchParams = useSearchParams(); // URL 쿼리 파라미터에 접근
const q = searchParams.get("q");        // 'q' 파라미터의 값을 가져옴
```
참고로, 이전 Pages Router에서는 `useRouter().query`로 쿼리 파라미터에 접근했지만, App Router에서는 `useSearchParams`를 사용해야 합니다.


```
npm install -D tailwindcss --legacy-peer-deps
npx tailwindcss init
```

