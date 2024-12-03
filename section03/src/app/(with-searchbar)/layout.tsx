// layout.tsx :모든 컴포넌트의 공통 레이아웃 컴포넌트. 
"use client"

import Searchbar from "../../components/searchbar";

export default function Layout({
                                   children,
                               }: Readonly<{
    children: React.ReactNode;
}>) { // /* 자식 컴포넌트인 page 컴포는트를 children으로 받음 */
    return (
        <div>
            <Searchbar />
             {children}
        </div>
    );
}