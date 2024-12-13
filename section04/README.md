## 36. 4.1) 앱 라우터의 데이터 페칭
### 사전렌더링 중...

```typescript
// 서버컴포넌트 (+ 비동기함수)
export async function Page(props){
    const posts = await fetch('<https://api.example.com/posts>')
    const data = await posts.json()

    return (
        <div>
            {data.map(post => (
                    <div key={post.id}>{post.title}</div>
                ))}
        </div>
    )
}
```
클라이언트 컴포넌트에는 Async 키워드를 사용할 수 없었음.
: 브라우저 동작에서 문제를 일으킬 수 있기 때문에 권장되지 않음.

| 구분 | Pages Router | App Router |
| --- | --- | --- |
| 데이터 페칭 위치 | 페이지 레벨에서만 가능 | 모든 컴포넌트에서 가능 |
| 캐싱 방식 | `getStaticProps`로 빌드 시 캐싱 | React의 자동 메모이제이션과 fetch 캐싱 |
| 코드 작성 | 특별한 함수 사용<br>(`getStaticProps`, `getServerSideProps`) | 일반적인 async/await 사용 |
| 성능 | 전체 페이지 로딩 | 컴포넌트 단위 스트리밍 가능 |
| 유연성 | 정해진 패턴으로만 사용 가능 | 더 유연한 데이터 페칭 패턴 구현 가능 |


### 환경변수 .env
1. `NEXT_PUBLIC_`: 클라이언트와 서버 모두에서 접근 가능
2. 접두사 없음: 서버 사이드에서만 접근 가능

> 주의사항:
> - `NEXT_PUBLIC_` 접두사가 없는 환경 변수는 클라이언트에서 접근 불가
> - 민감한 정보(API 키, 비밀번호 등)는 절대 `NEXT_PUBLIC_`을 사용하지 마세요
> - 환경 변수 변경 시 서버 재시작 필요

```typescript

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/book/random`);

```
## 36. 4.2) 데이터 캐시
fetch 메서드를 활용해 불러운 데이터를 Next 서버에서 보관하는 기능

### 데이터 캐시
불필요한 데이터 요청의 수를 줄여서 웹 서비스의 성능을 크게 개선할 수 있음.

```typescript
const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, {
    cache: 'no-store' // 옵션 : 'force-cache', 'no-cache', 'no-store'
});
```
```typescript
const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`, {
    next: {
        revalidate: 10 // 10초 후 재요청
    } // 옵션 : revalidate, tags
});
```
### 캐시 옵션(fetch 메서드에서만 사용 가능)
- `no-store` (fetch 기본값)
    - 데이터 패칭의 결과를 저장하지 않는 옵션
    - 캐싱을 아예 하지 않도록 설정하는 옵션
    - 데이터를 캐시에서 가져오지 않음. 서버에서 데이터를 가져옴.
    [NO_STORE](../img/NO_STORE.png)
- `force-cache`
    - 요청의 결과를 무조건 캐싱함.
    - 한번 호출된 이후에는 다시는 호출되지 않음.
    - 데이터를 캐시에서 가져옴. 캐시가 없으면 서버에서 가져옴.
- `no-cache`: 데이터를 캐시에서 가져오지 않음. 서버에서 데이터를 가져옴.

### Next.js 15 캐시 변경
- 데이터 캐시 옵션 변경
    - 원래는 기본적으로 `force-cache` 옵션이 적용되어 있었음.
    - 이제는 기본적으로 `no-store` 옵션이 적용됨.
