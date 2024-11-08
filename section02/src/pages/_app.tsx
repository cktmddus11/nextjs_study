import "@/styles/globals.css";
import type {AppProps} from "next/app";
import GlobalLayout from "@/components/global-layout";
import {ReactNode} from "react";
import {NextPage} from "next";

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactNode) => ReactNode;
}

export default function App({Component, pageProps}: AppProps & {
    Component : NextPageWithLayout
}) {
    // Component : 페이지 역할
    // pageProps : 페이지에 전달할 Props
    // console.log(Component.getLayout);
    const getLayout = Component.getLayout ?? ((page: ReactNode) => page); // NULL병합연산자 : NULL이거나 undefined 일때 기본 page 컴포넌트 리턴
    return <>
        <GlobalLayout>
            {getLayout(<Component {...pageProps} />)}
        </GlobalLayout>
    </>;
}

// import Link from "next/link";
// import {useRouter} from "next/router";
// import {useEffect} from "react";
// const onClickButton = () => {
//     router.push("/test"); // replace, back 등등 있음
// };
// const router = useRouter();
//
// useEffect(() => {
//     router.prefetch("/test")
// }, []);
// return <>
//     <header>
//         <Link href={'/'}>index</Link>
//         &nbsp;
//         <Link href={'/search'} prefetch={false}>search</Link>
//         &nbsp;
//         <Link href={'/book/1'}>book/1</Link>
//         <div>
//             <button onClick={onClickButton}>/test 페이지 이동</button>
//         </div>
//     </header>