import {useRouter} from "next/router";
import {ReactNode} from "react";
import SearchableLayout from "@/components/searchable-layout";

export default function Page() {
    const router = useRouter();
    console.log(router);
    // const q = router.query.q;
    const { q } = router.query;
    // console.log(q);
    return <h1> Search {q}</h1>;

}
Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}