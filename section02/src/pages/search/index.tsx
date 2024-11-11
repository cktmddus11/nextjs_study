import {ReactNode} from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import fetchBooks from "@/lib/fetch-books";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    // console.log(context);
    const q = context.query.q;
    // console.log(q);
    const searchBooks = await fetchBooks(q as string);

    return {
        props: {
            searchBooks
        },
    }
}

export default function Page({searchBooks} : InferGetServerSidePropsType<typeof getServerSideProps>) {

    return <div>
        {
            searchBooks.map((book) =>
                <BookItem key={book.id} {...book} />
            )
        }
    </div>;

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