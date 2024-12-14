import { createReviewAction } from "@/actions/create-review.action";
import style from "./review-editor.module.css";

export default function ReviewEditor({ bookId }: { bookId: string }) {

    return <section>
        <form className={style.form_container}
            action={createReviewAction}>
            <input name="bookId" value={bookId} hidden readOnly /> {/** value 는 있지만 onChange 가 없으면 에러를 발생시킴. readOnly 속성으로 에러 방지 */}
            <textarea required name="content" placeholder="리뷰를 입력해주세요." />
            <div className={style.submit_container}>
                <input required name="author" placeholder="작성자를 입력해주세요." />
                <button type="submit">리뷰 작성</button>
            </div>
        </form>
    </section>
}