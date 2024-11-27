import {ReactNode, useEffect, useState} from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import fetchBooks from "@/lib/fetch-books";
import {useRouter} from "next/router";
import {BookData} from "@/types";
import Head from "next/head";

// SSG 로 GetStaticPropsContext query 조회 불가 - 빌드과정에서만 실행되기 떄문.
// export const getStaticProps = async (context: GetStaticPropsContext) => {
//     // console.log(context);
//     const q = context.query.q;
//     // console.log(q);
//     const searchBooks = await fetchBooks(q as string);
//
//     return {
//         props: {
//             searchBooks
//         },
//     }
// }

export default function Page() {
    const [searchBooks, setSearchBooks] = useState<BookData[]>([]);
//export default function Page({searchBooks} : InferGetServerSidePropsType<typeof getServerSideProps>) {
    const router = useRouter();
    const q = router.query.q;

    const fetchSearchResult = async () => {
        const data = await fetchBooks(q as string);
        setSearchBooks(data);
    };


    useEffect(() => {
        if (q) {
            // 검색결과를 불러오는 로직
            fetchSearchResult();
        }
    }, [q]);

    return (
        <div>
            <Head>
                <title>한입북스 - 검색결과</title>
                <meta property="og:image" content="/thumbnail.png"/>
                <meta property="og:title" content="한입북스"/>
                <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요"/>
            </Head>
            {
                searchBooks.map((book) =>
                    <BookItem key={book.id} {...book} />
                )
            }
        </div>
    );

}
Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}


//import {useRouter} from "next/router";
// const router = useRouter();
// console.log(router);
// // const q = router.query.q;
// const { q } = router.query;
// // console.log(q);
// return <h1> Search {q}</h1>;