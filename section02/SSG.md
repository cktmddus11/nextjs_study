**SSG (Static Site Generation)**는 Next.js에서 사전 렌더링 방식 중 하나로, 빌드 타임에 페이지를 미리 생성하는 방식입니다. 즉, 애플리케이션이 빌드될 때 모든 페이지를 정적 HTML로 만들어 두고, 사용자가 해당 페이지를 요청할 때 서버는 사전 렌더링된 HTML 파일을 바로 제공하게 됩니다.

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