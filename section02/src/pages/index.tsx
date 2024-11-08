// CSS Module
import style from "./index.module.css";
import SearchableLayout from "@/components/searchable-layout";
import {ReactNode} from "react";

export default function Home() { // Home 컴포넌트도 즉 객체이므로 getLayout 함수 추가 가능.
    return (
        <>
            <h1 className={style.h1}>index??</h1>
            <h2 className={style.h2}>index??</h2>

        </>
    );
}

Home.getLayout = (page: ReactNode) => {
    return <SearchableLayout>{page}</SearchableLayout>
}