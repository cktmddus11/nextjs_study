// CSS Module
import style from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
import {ReactNode} from "react";
import books from '@/mock/books.json';
import BookItem from "@/components/book-item"; // @ : src typescript

export default function Home() { // Home 컴포넌트도 즉 객체이므로 getLayout 함수 추가 가능.
    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                {
                    books.map((book) =>
                        <BookItem key={book.id} {...book}/>
                    )
                }
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                {
                    books.map((book) =>
                        <BookItem key={book.id} {...book}/>
                    )
                }
            </section>

        </div>
    );
}

Home.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}

// <h1 className={style.h1}>index??</h1>
// <h2 className={style.h2}>index??</h2>