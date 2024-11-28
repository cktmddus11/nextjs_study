import React, {useState} from "react";

export default function Searchbar() {
    const [search, setSearch] = useState("");

    const onChangeSearch = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    }
    const onClickSearch = () => {
        console.log(search);
    }

    return <div>
        <input value={search} onChange={onChangeSearch}/>
        <button onClick={onClickSearch}>검색</button>
    </div>
}