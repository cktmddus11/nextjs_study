export default async function Page({ // 비동기 컴포넌트 async
                                 searchParams,
                             }: {
    searchParams: Promise<{ q: string }>;
}) {
    // console.log(props);
    const {q} = await searchParams;
    return <div>Search 페이지 : {q}</div>
}