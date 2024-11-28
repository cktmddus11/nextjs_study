// "use client";
import styles from "./page.module.css";
// import {useEffect} from "react";

export default function Home() {
    console.log("Home 컴포넌트 렌더링")
    // useEffect(() => {  // TS71001: "useEffect" is not allowed in Server Components.
    //
    // }, []);
    return (
        <>
            <div className={styles.page}>안뇽</div>
        </>
    );
}
