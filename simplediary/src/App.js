import React, {
    useRef,
    useEffect,
    useMemo,
    useCallback,
    useReducer,
} from "react";
import DiaryEditor from "./DiaryEditor";
import DiaryList from "./DiaryList";
import styled from "styled-components";

const reducer = (state, action) => {
    switch (action.type) {
        case "INIT": {
            return action.data;
        }
        case "CREATE": {
            const created_date = new Date().getTime();
            const newItem = {
                ...action.data,
                created_date,
            };
            return [newItem, ...state];
        }
        case "DELETE":
            return state.filter((it) => it.id !== action.targetId);
        case "EDIT":
            return state.map((it) =>
                it.id === action.targetId
                    ? { ...it, content: action.newContent }
                    : it
            );
        default:
            return state;
    }
};

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

const App = () => {
    // const [data, setData] = useState([]);
    const [data, dispatch] = useReducer(reducer, []);
    const dataId = useRef(0);

    const getData = async () => {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/comments"
        ).then((res) => res.json());

        const initData = res.slice(0, 10).map((it) => {
            return {
                author: it.email,
                content: it.body,
                emotion: Math.floor(Math.random() * 5) + 1,
                created_date: new Date().getTime(),
                id: dataId.current++,
            };
        });
        dispatch({ type: "INIT", data: initData });
    };

    useEffect(() => {
        getData();
    }, []);

    const onCreate = useCallback((author, content, emotion) => {
        dispatch({
            type: "CREATE",
            data: {
                author,
                emotion,
                content,
                id: dataId.current,
            },
        });
        dataId.current += 1;
    }, []);

    const onDelete = useCallback((targetId) => {
        dispatch({ type: "DELETE", targetId });
    }, []);

    const onEdit = useCallback((targetId, newContent) => {
        dispatch({ type: "EDIT", targetId, newContent });
    }, []);

    const memoizedDispatches = useMemo(() => {
        return { onCreate, onDelete, onEdit };
    }, []);

    const getDiaryAnalysis = useMemo(() => {
        const goodCount = data.filter((it) => it.emotion >= 3).length;
        const badCount = data.length - goodCount;
        const goodRatio = (goodCount / data.length) * 100;
        return { goodCount, badCount, goodRatio };
    }, [data.length]);
    // [data.length]가 달라지지 않는 이상 getDiaryAnalysis가 다시 실행되지 않음. return 값을 기억함.
    // 함수를 반환하는 게 아니라 값을 반환함

    const { goodCount, badCount, goodRatio } = getDiaryAnalysis;
    // getDiaryAnalysis();가 아닌 이유는 useMemo를 사용함으로써 함수로 동작하는게 아니라 리턴값을 기억해두었다가 사용하는 거라서 useMemo를 사용한 계산은 함수가 아니다.

    return (
        <DiaryStateContext.Provider value={data}>
            <DiaryDispatchContext.Provider value={memoizedDispatches}>
                <AppContainer>
                    <DiaryEditor />
                    <div>전체 일기 : {data.length} </div>
                    <div>기분 좋은 일기 개수 : {goodCount} </div>
                    <div>기분 나쁜 일기 개수 : {badCount} </div>
                    <div>기분 좋은 일기 비율 : {goodRatio} </div>
                    <DiaryList />
                </AppContainer>
            </DiaryDispatchContext.Provider>
        </DiaryStateContext.Provider>
    );
};

export default App;

const AppContainer = styled.div`
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
`;
