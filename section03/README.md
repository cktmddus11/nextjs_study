# 섹션 3 : App Router 시작하기

## 29.3.1) App Router 시작하기

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



- page.tsx : 서버 컴포넌트













