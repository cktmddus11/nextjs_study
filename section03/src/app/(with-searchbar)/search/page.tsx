import books from "@/mock/books.json";
import BookItem from "@/components/book-item";

export default function Page({
  searchParams,
}: {
  searchParams: {
    q?: string;
  };
}) {
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

// import ClientComponent from "@/app/component/client-component";

// export default async function Page({ // 비동기 컴포넌트 async
//     searchParams,
// }: {
//     searchParams: Promise<{ q: string }>;
// }) {
//     // console.log(props);
//     const { q } = await searchParams;
//     return (
//         <div>
//             <div>Search 페이지 : {q}</div>
//             <ClientComponent> {/* 서버 컴포넌트에 클라이언트 컴포넌트를 포함시키지 않았을 때는 rsc 만 주는데 클라이언트 컴포넌트를 추가하면
//             rsc + client component 를 줌.*/}
//                 <></>
//             </ClientComponent>
//         </div>
//     );
// }

