import {ReactNode} from "react";
import SearchableLayout from "@/components/searchable-layout";
import books from '@/mock/books.json'
import BookItem from "@/components/book-item";
import {useRouter} from "next/router";

export default function Page() {
    // const filterBooks = books.filter((book) => book.title )

    return <div>
        {
        books.map((book) =>
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