"use client"
import {createReviewAction} from "@/actions/create-review.action";
import style from "./review-editor.module.css";
import {useActionState, useEffect} from "react";

export default function ReviewEditor({bookId}: { bookId: string }) {

    const [state, formAction, isPending] = useActionState(
        createReviewAction,
        null
    );

    useEffect(() => {
        // createReviewAction 처리 실패시 useActionState
        // 에러 에러핸들링
        if (state && !state.status) {
            alert(state.error);
        }
    }, [state])

    return <section>
        <form className={style.form_container}
              action={formAction}>
            <input name="bookId"
                   value={bookId} hidden
                   readOnly/> {/** value 는 있지만 onChange 가 없으면 에러를 발생시킴. readOnly 속성으로 에러 방지 */}
            <textarea disabled={isPending} required name="content" placeholder="리뷰를 입력해주세요."/>
            <div className={style.submit_container}>
                <input required
                       disabled={isPending}
                       name="author"
                       placeholder="작성자를 입력해주세요."/>
                <button type="submit" disabled={isPending}>
                    {isPending ? "..." : "리뷰 작성"}
                </button>
            </div>
        </form>
    </section>
}