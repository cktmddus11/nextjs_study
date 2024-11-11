// CSS Module
import style from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
import {ReactNode, useEffect} from "react";
import books from '@/mock/books.json';
import BookItem from "@/components/book-item";
import {InferGetServerSidePropsType} from "next"; // @ : src typescript

export const getServerSideProps = () => {
    // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수
    // 한번만 실행됨? 서버측에서 실행
    // window.location; 서버 스크립트 사용 불가능.
    console.log("서버사이드 프롭스");

    const data = "hello";
    return {
        props: { // props 객체를 리턴해주어야함.
            data,
        }
    }
}
// 1. 사전렌더링 - 서버 실행 2. 브라우저 js 번들 렌더링
export default function Home({
                                 data
                             }: InferGetServerSidePropsType<typeof getServerSideProps>) { // Home 컴포넌트도 즉 객체이므로 getLayout 함수 추가 가능.
    console.log(data);
    useEffect(() => {
        console.log(window);
    }, []);

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