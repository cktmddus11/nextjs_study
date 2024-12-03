import BookItem from "@/components/book-item";
import style from "./page.module.css";
import books from "@/mock/books.json";

export default function Home() {
  return (
      <div className={style.container}>
          <section>
              <h3>지금 추천하는 도서</h3>
              {books.map((book) => (
                  <BookItem key={book.id} {...book} />
              ))}
          </section>
          <section>
              <h3>등록된 모든 도서</h3>
              {books.map((book) => (
                  <BookItem key={book.id} {...book} />
              ))}
          </section>
          {/*<main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center">*/}
          {/*    <h1 className="text-4xl font-bold text-blue-500">Hello, Tailwind CSS!</h1>*/}
          {/*    <p className="mt-4 text-gray-600">Next.js App Router with Tailwind CSS</p>*/}
          {/*</main>*/}
      </div>
  );
}
