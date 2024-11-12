import type {BookData} from "@/types.ts";
import Link from "next/link";
import style from "./book-item.module.css";

export default function BookItem({
                                     id,
                                     title,
                                     subTitle,
                                     author,
                                     publisher,
                                   //  description,
                                     coverImgUrl
                                 }: BookData) {
    return <Link href={`/book/${id}`} className={style.container}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={coverImgUrl}/>
        <div>
            <div className={style.title}>{title}</div>
            <div className={style.subTitle}>{subTitle}</div>
            <br/>
            <div className={style.author}>{author} | {publisher}</div>
        </div>

    </Link>
        ;
}