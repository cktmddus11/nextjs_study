import React, {ReactNode, useEffect, useState} from "react";
import {useRouter} from "next/router";
import style from './searchable-layout.module.css';

export default function SearchableLayout({children}: {
    children: ReactNode
}) {
    // 검색어 값 상태 저장 state
    const [search, setSearch] = useState("");
    // 검색버튼 클릭 시 search 쿼리 스트링으로 페이지 이동을 위해 선언
    const router = useRouter();
    const q = router.query.q as string; // as string : 쿼리 스트링은 string 단건 또는 배열로 들어갈 수있기 때문에 타입 지정 필요.

    // 검색 페이지 이동시 쿼리 스트링 값을 읽어다 검색 input 창에 뿌려주기 위해서 useEffect 처리
    useEffect(() => {
        setSearch(q || "");
    }, [q]);
    const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    const onSubmit = () => {
        if (!search || q == search) return; // 검색어가 없거나 검색값이 현재 검색값이 동일하다면 화면 이동 X
        router.push(`/search?q=${search}`);
    }
    const onKeyDown = (e : React.KeyboardEvent<HTMLInputElement>) => {
        if(e.key == "Enter"){
            onSubmit();
        }
    }

    return (
        <div>
            <div className={style.searchbar_container}>
                <input placeholder={"검색어를 입력하세요 ... "} onChange={onChangeSearch} onKeyDown={onKeyDown}/>
                <button onClick={onSubmit}>검색</button>
            </div>
            {children}
        </div>
    )
}