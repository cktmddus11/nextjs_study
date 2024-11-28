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
