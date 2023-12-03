import { useState, useRef } from "react";
import "./App.css";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";

function App() {

    const [data, setData] = useState([]);
    const dataId = useRef(0);

    const onCreate = (author, content, emotion) => {
        const created_date = new Date().getTime();
        const newItem = {
            author,
            emotion,
            content,
            created_date,
            id: dataId.current,
        }
        dataId.current += 1;
        setData([newItem, ...data])
    }
    return (
        <div className="App">
            <DiaryEditor onCreate={onCreate} />
            <DiaryList diaryList={data} />
        </div>
    );
}

export default App;
