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
