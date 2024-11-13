# SSG (Static Site Generation) 
 Next.js에서 사전 렌더링 방식 중 하나로, 빌드 타임에 페이지를 미리 생성하는 방식입니다.   
 즉, 애플리케이션이 빌드될 때 모든 페이지를 정적 HTML로 만들어 두고, 사용자가 해당 페이지를    
 요청할 때 서버는 사전 렌더링된 HTML 파일을 바로 제공하게 됩니다.

### SSG의 특징
- **빠른 응답 속도**: 페이지가 미리 생성되어 있어 서버에서 빠르게 제공할 수 있습니다.
- **SEO 친화적**: 정적 HTML 파일이므로 검색 엔진 크롤러가 쉽게 읽을 수 있습니다.
- **데이터 고정**: 생성된 페이지는 빌드 이후에 업데이트되지 않기 때문에, 최신 데이터를 반영하려면 재빌드가 필요합니다. 그러나 `Incremental Static Regeneration (ISR)`을 통해 부분적 갱신이 가능합니다.

### 예제 코드
```typescript
import { GetStaticProps } from 'next';

interface BookDetailProps {
  bookDetail: {
    id: number;
    title: string;
    author: string;
  };
}

export const getStaticProps: GetStaticProps<BookDetailProps> = async () => {
  // 빌드 시점에 API 호출하여 데이터 가져오기
  const res = await fetch('https://api.example.com/books/1');
  const bookDetail = await res.json();

  return {
    props: {
      bookDetail,
    },
  };
};

const BookDetailPage = ({ bookDetail }: BookDetailProps) => {
  return (
    <div>
      <h1>{bookDetail.title}</h1>
      <p>Author: {bookDetail.author}</p>
    </div>
  );
};

export default BookDetailPage;
```

### 설명
- `getStaticProps`: 페이지를 빌드 시점에 렌더링하기 위해 호출됩니다. 반환된 데이터는 페이지의 props로 전달됩니다.
- **데이터 갱신**: 페이지를 재빌드하지 않는 한, 이 방식으로 생성된 페이지는 언제나 동일한 데이터를 제공합니다.

### 언제 SSG를 사용해야 할까?
- 페이지의 내용이 자주 변경되지 않고, 정적인 콘텐츠를 주로 다룰 때.
- 블로그, 문서 사이트, 제품 상세 페이지 등 콘텐츠가 정기적으로 업데이트되지 않는 경우.

이 방식은 Next.js의 강력한 기능 중 하나로, 높은 성능과 SEO 최적화가 필요한 프로젝트에 적합합니다.

 ---- 
# 동적 경로 렌더링 - getStaticPaths
이 오류는 `getStaticPaths` 또는 `getStaticProps` 함수와 관련된 문제일 가능성이 큽니다. `getStaticPaths`에서 반환되는 경로나 `getStaticProps`에서 데이터 가져오기 과정에서 예기치 않은 오류가 발생할 수 있습니다. 이 문제를 해결하기 위해 몇 가지 확인 사항이 있습니다.

### 확인 및 디버깅 방법

1. **`getStaticPaths`의 반환 값 확인**:
    - `getStaticPaths` 함수가 올바른 경로를 반환하는지 확인하세요. 반환 객체에는 `paths` 배열과 `fallback` 속성이 있어야 합니다.
   ```typescript
   export const getStaticPaths = async () => {
     const res = await fetch('https://api.example.com/books');
     const data = await res.json();

     const paths = data.map((book: { id: number }) => ({
       params: { id: book.id.toString() },
     }));

     return {
       paths,
       fallback: false, // 또는 true / 'blocking'
     };
   };
   ```

2. **`getStaticProps`에서 예외 처리**:
    - API 호출이나 데이터 처리 과정에서 예외가 발생할 수 있습니다. `try-catch` 블록으로 감싸서 오류를 처리하세요.
   ```typescript
   export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
     try {
       const res = await fetch(`https://api.example.com/books/${params?.id}`);
       if (!res.ok) {
         throw new Error('Failed to fetch data');
       }
       const bookDetail = await res.json();

       return {
         props: {
           bookDetail,
         },
       };
     } catch (error) {
       console.error('Error fetching book details:', error);
       return {
         notFound: true, // 페이지가 없을 경우
       };
     }
   };
   ```

3. **데이터 포맷 및 타입 체크**:
    - 반환된 데이터의 구조가 예상과 일치하는지 확인하세요. `params?.id`가 `undefined`일 수 있으니 안전하게 다루어야 합니다.

4. **의존성 및 빌드 환경 점검**:
    - `npm install` 또는 `yarn` 명령어를 실행해 의존성 문제를 해결하세요.
    - 환경 변수가 필요한 경우 `.env` 파일 설정을 확인하고 `next.config.js`에서 환경 변수를 불러올 수 있는지 점검합니다.

### 로그 확인
- `console.error`를 `getStaticProps`나 `getStaticPaths` 내부에 추가해 어떤 단계에서 문제가 발생하는지 확인하세요.