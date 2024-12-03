import BookItem from "@/components/book-item";
import style from "./page.module.css";
import {BookData} from "@/types";
import {JSX} from "react";

// import books from "@/mock/books.json";

// Home 컴포넌트 내부 가독성을 위해 별도의 컴포넌트로 분리함.
async function AllBooks() {
    let allBooks: BookData[] = [];
    try { // try-catch : 네트워크 등 기술적인 문제 처리
        // 비동기 함수에서 반환되는 값은 Promise 객체임
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`);
        // 응답상태에 따른 처리로 HTTP 상태코드 관련 오류 처리.
        if (!response.ok) return <div>오류가 발생했습니다....</div>


        // JSON 데이터를 파싱.
        allBooks = await response.json(); // 파싱된 데이터 반환
    } catch (error) {
        console.error('책 정보를 가져오는데 실패했습니다:', error);
        return [];
    }
    return <div>
        {allBooks.map((book) => ( // 타입오류 allBooks 에서 배열처리하던가 type 처리하던가
            <BookItem key={book.id} {...book} />
        ))}
    </div>
}

async function RecoBooks() {
    let recoBooks : BookData[] = [];
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`);
        if (!response.ok) return <div>오류가 발생했습니다....</div>
        recoBooks = await response.json();
    } catch (error) {
        console.error('책 정보를 가져오는데 실패했습니다:', error);
        return [];
    }
    return <div>
        {recoBooks.map((book) => ( // 타입오류 allBooks 에서 배열처리하던가 type 처리하던가
            <BookItem key={book.id} {...book} />
        ))}
    </div>

}

export default async function Home() {

    return (
        <div className={style.container}>
            <section>
                <h3>지금 추천하는 도서</h3>
                <RecoBooks/>
            </section>
            <section>
                <h3>등록된 모든 도서</h3>
                <AllBooks/>
            </section>
            {/*<main className="flex min-h-screen flex-col items-center justify-center bg-gray-100 text-center">*/}
            {/*    <h1 className="text-4xl font-bold text-blue-500">Hello, Tailwind CSS!</h1>*/}
            {/*    <p className="mt-4 text-gray-600">Next.js App Router with Tailwind CSS</p>*/}
            {/*</main>*/}
        </div>
    );
}
