export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) { // /* 자식 컴포넌트인 page 컴포는트를 children으로 받음 */
    return (
        <div>
             <div>임시 검색바</div>
             {children}
        </div>
    );
}