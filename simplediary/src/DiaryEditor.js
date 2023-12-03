import { useState, useRef } from "react";

const DiaryEditor = ({ onCreate }) => {
    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 5,
    });
    const authorRef = useRef();
    const contentRef = useRef();

    const handleChangeEvent = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = () => {
        if (state.author.length < 1) {
            authorRef.current.focus();
            return;
        }
        if (state.content.length < 5) {
            contentRef.current.focus();
            return;
        }
        onCreate(state.author, state.content, state.emotion);
        alert("submit!");
        setState({
            author: "",
            content: "",
            emotion: 5,
        })
    };

    return (
        <div className="DiaryEditor">
            <h2>하루 일기</h2>
            <div>
                <input
                    name="author"
                    type="text"
                    value={state.author}
                    onChange={handleChangeEvent}
                    placeholder="이름을 남겨주세요."
                    ref={authorRef}
                />
            </div>
            <div>
                <textarea
                    name="content"
                    type="text"
                    value={state.content}
                    onChange={handleChangeEvent}
                    placeholder="오늘 하루를 기록해보세요."
                    ref={contentRef}
                />
            </div>
            <div>
                <span>오늘의 기분 점수 </span>
                <select
                    name="emotion"
                    value={state.emotion}
                    onChange={handleChangeEvent}
                >
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                </select>
            </div>
            <button type="submit" onClick={handleSubmit}>
                submit
            </button>
        </div>
    );
};

export default DiaryEditor;
