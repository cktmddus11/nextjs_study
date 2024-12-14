# SECTION 7 서버 액션
## 49. 7.1 서버액션을 소개합니다. 
```typescript
// form 서버 액션 예제
async function createReviewAction(formData: FormData){
  "use server";
  console.log(formData);
}
...
export default function Page(){
  return <form action={createReviewAction}>
    <input name="content" placeholder="리뷰를 입력해주세요." />
    <button type="submit">리뷰 작성</button>
  </form>
}
```
- submit 호출 시 createReviewAction 함수가 호출.
- 폼 데이터는 formData 객체로 전달.
- 크롬 네트워크 탭
    - Headers 에 Next-Action 항목으로 해쉬값으로 전달되는 것을 볼 수 있음.
    - Payload에 폼 데이터가 전달되는 것을 볼 수 있음.
- 서버 액션을 사용하면 내부적으로 api 호출을 하는 것처럼 사용할 수 있음.
- 서버 액션은 비동기 함수이므로 비동기 함수를 호출하는 것처럼 사용해야 함.
-

### 사용하는 이유
- client component를 만들던지, api handler 만들던지 하는 방법이 있지만
    - 서버 액션을 사용하면 보다 쉽게 사용할 수 있음.
- 서버측에서만 데이터를 처리하기 때문에 보안성이 높음.
- 간편하게 서버측에서 실행하는 동작을 정의하기 위함.


## 50. 7.2 리뷰 추가 기능 구현하기
- 리뷰 추가 api 호출 코드 구현
    - 서버에서 명령어 실행 npx prisma studio => 데이터베이스 데이터 확인가능.
- 서버 액션 코드 분리하기
    - src/actions/create-review.action.ts
    - 별도의 코드로 분리할 때는 'use server'는 코드의 최상단에 위치해야함.
- 폼 데이터 전달 시 폼 데이터에 포함되지 않은 값을 전달하기 위해서는 hidden 속성을 사용해야함.
    - onChange 가 없으면 에러를 발생시킴 =>  readOnly 속성으로 에러 방지.


## 50. 7.4) 리뷰 재검증 구현하기
- 리뷰 작성 후 리뷰 목록에서 작성한 리뷰를 확인할 수 있도록 구현.
    - revalidatePath 함수를 사용하여 페이지를 재검증.
        - 리뷰 목록이 포함된 페이지인 book 상세 화면 전체를 서버에서 리렌더링됨.
        - 데이터 캐싱을 해둔 fetch도 캐시가 초기화되며 다시 데이터를 가져오게 됨.        
```typescript
import { revalidatePath } from "next/cache";

revalidatePath(`/book/${bookId}`);
```
- revalidatePath 함수는 서버 컴포넌트 또는 서버 액션에서 사용할 수 있음.
- generateStaticParams(full route cache)는 재검증 되지 않음.
  - production 모드 빌드 내용의 app > book > [id] > page.tsx 파일을 확인해보면 캐싱 내용을 확인할 수 있지만 새로 작성한 리뷰는 캐싱 내용에 포함되지 않음. 
  즉 full route cache는 무효화된 캐시임.
  - 서버에서는 동적 페이지를 만드는것처럼 다시 렌더링 됨.


## 50. 7.5 다양한 재검증 방식 알아보기
```typescript
// 1. 특정주소의 해당하는 페이지만 재검증
revalidatePath(`/book/${bookId}`);
revalidatePath(`/book/${bookId}`, 'page');

// 2. 특정경로의 모든 동적 페이지를 제검증
revalidatePath("/book/[id]", "page");

// 3. 특정 레이아웃을 갖는 모든 페이지 재검증
revalidatePath("/(with-searchbar)", "layout");

// 4. 모든 데이터 재검증
revalidatePath("/", "layout");

// 5. 태그 기준. 데이터 캐시 재검증
revalidateTag(`review-${bookId}`);
```

```typescript
const response = await fetch("https://api.example.com/data", {
  next: { tags: [`review-${bookId}`] }
});
```
