import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // Component : 페이지 역할 
  // pageProps : 페이지에 전달할 Props

  return <>
    <header>글로벌 헤더</header>
    <Component {...pageProps} />
  </>;
}
