import styles from "./page.module.css";

export default function Home() {
    console.log("Home 컴포넌트 렌더링")
    return (
        <>
            <div className={styles.page}>안뇽</div>
        </>
    );
}
