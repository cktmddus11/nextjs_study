// import books from "@/mock/books.json";
import BookItem from "@/components/book-item";
import { BookData } from "@/types";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    searchParams: Promise<{ q: string }>;
   // q?: string;
  };
}) {
  const { q } = await searchParams;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book?q=${q}`);
  if (!response.ok) return <div>오류가 발생했습니다....</div>
  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}


