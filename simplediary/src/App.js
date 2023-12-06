import { useState, useRef, useEffect } from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import styled from "styled-components";

function App() {
    const [data, setData] = useState([]);
    const dataId = useRef(0);

    const getData = async () => {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/comments"
        ).then((res) => res.json());
        const initData = res.slice(0, 20).map((it) => {
            return {
                author: it.email,
                content: it.body,
                emotion: Math.floor(Math.random() * 5) + 1,
                created_date: new Date().getTime(),
                id: dataId.current++,
            };
        });
        setData(initData);
    };
    useEffect(() => {
        getData();
    }, []);
    const onCreate = (author, content, emotion) => {
        const created_date = new Date().getTime();
        const newItem = {
            author,
            emotion,
            content,
            created_date,
            id: dataId.current,
        };
        dataId.current += 1;
        setData([newItem, ...data]);
    };
    const onDelete = (targetId) => {
        console.log(`${targetId}가 삭제되었습니다.`);
        const newDiaryList = data.filter((it) => it.id !== targetId);
        setData(newDiaryList);
    };
    const onEdit = (targetId, newContent) => {
        setData(
            data.map((it) =>
                it.id === targetId ? { ...it, content: newContent } : it
            )
        );
    };
    return (
        <AppContainer>
            <DiaryEditor onCreate={onCreate} />
            <DiaryList onDelete={onDelete} diaryList={data} onEdit={onEdit} />
        </AppContainer>
    );
}

export default App;

const AppContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;
