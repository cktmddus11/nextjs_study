import { notFound } from "next/navigation";
import style from "./page.module.css";

// export const dynamicParams = false;
// export function generateStaticParams() {
//   return [{ id: "1" }, { id: "2" }, { id: "3" }];
// }

async function BookDetail({ bookId }: { bookId: string }) {
  const encodedId = encodeURIComponent(bookId);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${encodedId}`
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

function ReviewEditor() {

  async function createReviewAction(formData: FormData){
    "use server";
    //console.log("server action call")
    console.log(formData);

    const content = formData.get("content");
    const rating = formData.get("rating");
    const author = formData.get("author");

    console.log(content, rating, author);
  }

  return <section>
    <form action={createReviewAction}>
      <input name="content" placeholder="리뷰를 입력해주세요." />
      <input name="rating" placeholder="별점을 입력해주세요."/> 
      <input name="author" placeholder="작성자를 입력해주세요." />
      <button type="submit">리뷰 작성</button>
    </form>
  </section>
}

export default async function Page({
  params,
}: {
  params: { id: string };
}) {
  const bookId = params.id;
  return (
    <div className={style.container}>
      <BookDetail bookId={bookId} />
      <ReviewEditor />
    </div>
  );
}
