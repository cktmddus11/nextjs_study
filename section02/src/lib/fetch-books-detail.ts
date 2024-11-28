import {BookData} from "@/types";

export default async function fetchBookDetail(id?:number) : Promise<BookData | null>{
    const url = `${process.env.BOOK_API_URL}/book/${id}` //`http://localhost:12345/book/${id}`

    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error();
        }
        return await response.json();
    }
    catch(err){
        console.error(err);
        return null;//as unknown as BookData; // null을 반환하되 타입 호환을 위해 처리
    }
}