import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
            &nbsp;
            <Link href={"/flow/flow1"}>flow1</Link>
            &nbsp;
            <Link href={"/flow/flow2"}>flow2</Link>

          </header>
          <main>{children}</main>
          <footer>제작 @winterlood</footer>
        </div>
      </body>
    </html>
  );
}
