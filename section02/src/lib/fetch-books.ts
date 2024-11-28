import {BookData} from "@/types";

export default async function fetchBooks(q?:string) : Promise<BookData[]>{
    let url = `${process.env.BOOK_API_URL}/book`

    if(q){
        url += `/search?q=${q}`;
    }

    try{
        const response = await fetch(url);
        if(!response.ok){
            throw new Error();
        }
        return await response.json();
    }
    catch(err){
        console.error(err);
        return [];
    }
}