"use server";

import { revalidatePath } from "next/cache";

export async function createReviewAction(formData: FormData) {
    //console.log("server action call")
    console.log(formData);

    const bookId = formData.get("bookId")?.toString(); // props로 받을 수 없기 때문에 form 데이터에 포함시키기
    const content = formData.get("content")?.toString();
    // const rating = formData.get("rating")?.toString();
    const author = formData.get("author")?.toString();

    console.log(content, author, bookId);

    if (!content || !author || !bookId) {
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId, content, author }),
      });
      console.log(response.status);

      revalidatePath(`/book/${bookId}`);
    } catch (error) {
      console.error(error);
      return;
    }
  }