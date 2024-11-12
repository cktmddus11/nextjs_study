SSR(Server-Side Rendering) 예제는 Next.js에서 데이터가 서버에서 렌더링된 후 클라이언트로 전달되는 방식을 보여줍니다. `getServerSideProps` 함수는 페이지 요청마다 호출되며, 이 함수에서 반환된 `props`는 컴포넌트에 전달됩니다.

### Next.js SSR 예제
```typescript
import { GetServerSideProps } from 'next';

interface BookData {
  id: number;
  title: string;
  author: string;
}

interface Props {
  bookDetail: BookData;
}

// `getServerSideProps` 함수는 페이지 요청 시 서버에서 실행됩니다.
export const getServerSideProps: GetServerSideProps<Props> = async (context) => {
  const { id } = context.query; // 쿼리에서 ID를 가져옴
  const response = await fetch(`https://api.example.com/books/${id}`);
  const bookDetail: BookData = await response.json();

  return {
    props: {
      bookDetail,
    },
  };
};

const BookDetailPage = ({ bookDetail }: Props) => {
  return (
    <div>
      <h1>{bookDetail.title}</h1>
      <p>Author: {bookDetail.author}</p>
      <p>ID: {bookDetail.id}</p>
    </div>
  );
};

export default BookDetailPage;
```

### 설명
- **`getServerSideProps`**:
    - 서버에서 실행되어 페이지가 요청될 때마다 데이터를 가져옴.
    - 페이지 컴포넌트에 전달할 `props`를 반환.
- **`context` 객체**:
    - 요청에 대한 정보(예: `query`, `params`, `req`, `res` 등)를 포함.
- **`fetch`**:
    - 외부 API나 백엔드 서버에 요청해 데이터를 가져옴.
- **`BookDetailPage`**:
    - SSR로 받은 데이터를 렌더링하는 React 컴포넌트.

### 동작 방식
1. 클라이언트가 페이지를 요청하면 `getServerSideProps`가 서버에서 실행.
2. 필요한 데이터를 가져와 `props`로 반환.
3. 컴포넌트가 서버에서 전달된 `props`를 이용해 렌더링.
4. 클라이언트는 서버에서 렌더링된 HTML을 받음.

이렇게 하면 페이지의 초기 로딩 시 서버에서 데이터를 미리 렌더링하기 때문에 SEO가 개선되고, 페이지 초기 로딩 속도가 향상될 수 있습니다.


`InferGetServerSidePropsType`은 Next.js에서 제공하는 TypeScript 유틸리티 타입입니다. `getServerSideProps`의 반환 타입을 자동으로 추론하여, 컴포넌트에 전달되는 `props`의 타입을 쉽게 지정할 수 있도록 해줍니다.

### 사용 예시

```typescript
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

export const getServerSideProps: GetServerSideProps<{ bookDetail: BookData }> = async (context) => {
  const response = await fetch(`https://api.example.com/books/${context.query.id}`);
  const bookDetail = await response.json();

  return {
    props: {
      bookDetail,
    },
  };
};

const BookDetailPage = ({ bookDetail }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div>
      <h1>{bookDetail.title}</h1>
      <p>Author: {bookDetail.author}</p>
      <p>ID: {bookDetail.id}</p>
    </div>
  );
};

export default BookDetailPage;
```

### 설명
- **`InferGetServerSidePropsType<typeof getServerSideProps>`**:
    - `getServerSideProps` 함수가 반환하는 `props`의 타입을 자동으로 추론하여, 컴포넌트에 전달되는 `props`의 타입을 지정할 수 있게 해줍니다.
- **이점**:
    - 코드의 중복을 줄이고, `getServerSideProps`의 반환 타입을 자동으로 가져올 수 있어 유지보수성이 높아집니다.
    - `props` 타입을 수동으로 작성할 필요가 없습니다.

### 어떻게 동작하나요?
- `InferGetServerSidePropsType`은 `getServerSideProps` 함수의 반환 타입을 가져와 해당 타입의 `props`를 추출하여 사용합니다.
- 예를 들어, `getServerSideProps`가 `{ props: { bookDetail: BookData } }`를 반환하면, `InferGetServerSidePropsType<typeof getServerSideProps>`는 `{ bookDetail: BookData }` 타입으로 해석됩니다.