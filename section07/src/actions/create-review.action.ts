"use server";

import {revalidatePath, revalidateTag} from "next/cache";
import {delay} from "@/util/delay";

export async function createReviewAction(
    // state : any,
    _: any,
    formData: FormData
) {

    console.log(formData);

    const bookId = formData.get("bookId")?.toString(); // props로 받을 수 없기 때문에 form 데이터에 포함시키기
    const content = formData.get("content")?.toString();
    // const rating = formData.get("rating")?.toString();
    const author = formData.get("author")?.toString();

    console.log(content, author, bookId);

    if (!content || !author || !bookId) {
        //return;
        return {
            status : false,
            error : "리뷰내용과 작성자를 입력해주세요"
        }
    }
    try {
        await delay(2000);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/1`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({bookId, content, author}),
        });
        console.log(response.status);

        // revalidatePath(`/book/${bookId}`);
        if(!response.ok){
            throw new Error(response.statusText);
        }

        revalidateTag(`review-${bookId}`)
        return {
            status : true,
            error : ''
        }
    } catch (error) {
        console.error(error);
        //return;
        return {
            status : false,
            error : `리뷰 저장에 실패했습니다. : ${error}`
        }
    }
}