import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();
    console.log(router);
    // const q = router.query.q;
    const { q } = router.query;
    // console.log(q);
    return <h1> Search{q}</h1>;

}