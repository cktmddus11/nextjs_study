"use client"

import ServerComponent from "./server-component";

export default function ClientComponent({ children }: {
    children: React.ReactNode
}) {
    console.log("Client Component");

    return (
        <>
            <div>Client Component</div>
            {/* <ServerComponent /> */}
            {children} {/* children 은 클라이언트 컴포넌트의 자식 컴포넌트를 의미함. 
            이 자식 컴포넌트는 서버 컴포넌트가 될 수 있음.*/}
        </>
    );
}