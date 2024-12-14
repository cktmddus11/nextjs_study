import { notFound } from "next/navigation";
import style from "./page.module.css";
import { createReviewAction } from "@/actions/create-review.action";
import { useActionState } from "react";
import { ReviewData } from "@/types";
import ReviewItem from "@/components/review-item";
import ReviewEditor from "@/components/review-editor";

// export const dynamicParams = false;
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const encodedId = encodeURIComponent(bookId);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${encodedId}`
    , { cache: 'force-cache' }
  );

  console.log(response);
  if (!response.ok) {
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다...</div>;
  }

  const book = await response.json();

  const {
    id,
    title,
    subTitle,
    description,
    author,
    publisher,
    coverImgUrl,
  } = book;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}
async function ReviewList({
  bookId
}: {
  bookId: string
}) {
  const response = await fetch(`
    ${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${bookId}
    `, { next: { tags: [`review-${bookId}`] } });

  if (!response.ok) {
    throw new Error(`Review Fetch Failed : ${response.statusText}`)
  }

  //const reviews = await response.json(); // 이렇게만하면 type오류 발생하므로 type을 지정해줌.
  const reviews: ReviewData[] = await response.json();
  // console.log(seviews);
  
  return <section>
    {reviews.map((review: any) =>
      <ReviewItem key={`review-item-${review.id}`} {...review} />
    )}
  </section>
}


export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const bookId = params.id;
  return ( // 리뷰 작성 시 리뷰 목록이 재검증되도록 구현했기 때문에 아래 컴포넌트들이 다시렌더링 됨.
    <div className={style.container}>
      <BookDetail bookId={bookId} />
      <ReviewEditor bookId={bookId} />
      <ReviewList bookId={bookId} />
    </div>
  );
}
