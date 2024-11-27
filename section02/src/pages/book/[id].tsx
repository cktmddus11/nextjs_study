import {ReactNode} from "react";
import SearchableLayout from "@/components/searchable-layout";
import style from './[id].module.css';
import fetchBookDetail from "@/lib/fetch-books-detail";
import {GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType} from "next";
import {useRouter} from "next/router";
import Head from "next/head";


export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [  // 렌더링 될 수있는 페이지 id 설정
            // url param은 무조건 string 으로 주어야함.
            {params: {id: "1"}},
            {params: {id: "2"}},
            {params: {id: "3"}}
        ],
        fallback: true,
        // 대체, 대비책 : paths 에 지정하지 않은 페이지 렌더링이요청됐을 때 어떻게 처리할것인지
        // false : 404 Notfound
        // blocking : SSR 방식
        // true : SSR 방식 + 데이터가 없는 폴백 상태의 페이지부터 반환
    };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
    console.log(context);
    const id = context.params!.id; // undefined 일수도 있음

    const bookDetail = await fetchBookDetail(Number(id));
    if (!bookDetail) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            bookDetail
        }
    }
}

export default function Page({
                                 bookDetail,
                             }: InferGetStaticPropsType<typeof getStaticProps>) {
    const router = useRouter();

    if (router.isFallback) {
        return(
            <> {/* SSG fallback true 상태일 때 SEO(meta) 설정을 위해*/}
                <Head>
                    <title>한입북스</title>
                    <meta property="og:image" content="/thumbnail.png"/>
                    <meta property="og:title" content="한입북스"/>
                    <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요"/>
                </Head>
                <div>로딩중입니다</div>
            </>
        )
    }
    if (!bookDetail) return "문제가 발생했습니다 다시 시도하세요";

    const {
        // id,
        title,
        subTitle,
        description,
        author,
        publisher,
        coverImgUrl
    } = bookDetail;


    // console.log(router);
    return <>
        <Head>
            <title>{title} </title>
            <meta property="og:image" content={coverImgUrl}/>
            <meta property="og:title" content={title}/>
            <meta property="og:description" content={description}/>
        </Head>
        <div className={style.container}>
            <div style={{backgroundImage: `url('${coverImgUrl}')`}}
                 className={style.cover_img_container}>
                <img src={coverImgUrl}/>
            </div>
            <div>
                <div className={style.title}>{title}</div>
                <div className={style.subTitle}>{subTitle}</div>
                <div className={style.author}>{author} | {publisher}</div>
            </div>
            <div className={style.description}>{description}</div>
        </div>
    </>;
}
Page.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}

// const router = useRouter();
// const {id} = router.query;