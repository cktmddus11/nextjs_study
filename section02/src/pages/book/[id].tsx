import {ReactNode} from "react";
import SearchableLayout from "@/components/searchable-layout";
import style from './[id].module.css';
import fetchBookDetail from "@/lib/fetch-books-detail";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
    console.log(context);
    const id = context.params!.id; // undefined 일수도 있음

    const bookDetail = await fetchBookDetail(Number(id));

    return {
        props: {
            bookDetail
        }
    }
}
export default function Page({bookDetail}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    if(!bookDetail){
        return "문제가 발생했습니다. 다시 시도하세요."
    }
    const {
        id,
        title,
        subTitle,
        description,
        author,
        publisher,
        coverImgUrl
    } = bookDetail;


    // console.log(router);
    return <>
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