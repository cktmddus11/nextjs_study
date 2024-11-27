import style from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
import {ReactNode} from "react";
// import books from '@/mock/books.json';
import BookItem from "@/components/book-item";
import {InferGetStaticPropsType} from "next";
import fetchBooks from "@/lib/fetch-books";
import fetchRandomBooks from "@/lib/fetch-random-books"; // @ : src typescript
import Head from "next/head"; // _document import 주의

export const getStaticProps = async () => {
    try {
        // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수
        // const allBooks = await fetchBooks();
        // const recoBooks = await fetchRandomBooks();

        // console.log("인덱스 페이지")
        // 병렬 호출 처리
        const [allBooks, recoBooks] = await Promise.all([
            fetchBooks(),
            fetchRandomBooks()
        ]);

        return {
            props: { // props 객체를 리턴해주어야함.
                allBooks,
                recoBooks
            },
            //   revalidate:3, // revalidate : 재생성하다.
        }
    }catch(error){
        console.error('Error in getStaticProps:', error);
        return {
            props: {
                allBooks: [], // 기본 값 반환
                recoBooks: [] // 기본 값 반환
            },
        };
    }
}
// 1. 사전렌더링 - 서버 실행 2. 브라우저 js 번들 렌더링
export default function Home({
                                 allBooks,
                                 recoBooks
                             }: InferGetStaticPropsType<typeof getStaticProps>) { // Home 컴포넌트도 즉 객체이므로 getLayout 함수 추가 가능.
   // console.log(allBooks);

    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                {
                    recoBooks.map((book) =>
                        <BookItem key={book.id} {...book}/>
                    )
                }
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                {
                    allBooks.map((book) =>
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

// console.log(data);
// useEffect(() => {
//     console.log(window);
// }, []);

// export const getServerSideProps = () => {
//     // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수
//     // 한번만 실행됨? 서버측에서 실행
//     console.log("서버사이드 프롭스");
//
//     const data = "hello";
//     return {
//         props: { // props 객체를 리턴해주어야함.
//             data,
//         }
//     }
// }