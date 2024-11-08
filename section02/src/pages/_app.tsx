import "@/styles/globals.css";
import type {AppProps} from "next/app";
import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect} from "react";

export default function App({Component, pageProps}: AppProps) {
    // Component : 페이지 역할
    // pageProps : 페이지에 전달할 Props
    const onClickButton = () => {
        router.push("/test"); // replace, back 등등 있음
    };
    const router = useRouter();

    useEffect(() => {
        router.prefetch("/test")
    }, []);
    return <>
        <header>
            <Link href={'/'}>index</Link>
            &nbsp;
            <Link href={'/search'} prefetch={false}>search</Link>
            &nbsp;
            <Link href={'/book/1'}>book/1</Link>
            <div>
                <button onClick={onClickButton}>/test 페이지 이동</button>
            </div>
        </header>
        <Component {...pageProps} />
    </>;
}
