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