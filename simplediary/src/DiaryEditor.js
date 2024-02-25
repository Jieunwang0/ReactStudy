import React, { useState, useRef, useContext } from "react";
import styled from "styled-components";
import { DiaryDispatchContext } from "./App";

const DiaryEditor = () => {
    const {onCreate} = useContext(DiaryDispatchContext);
    
    const authorRef = useRef();
    const contentRef = useRef();

    const [state, setState] = useState({
        author: "",
        content: "",
        emotion: 5,
    });

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
        });
    };

    return (
        <EditorWrapper>
            <h2>하루 일기</h2>
            <EmotionArea>
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
            </EmotionArea>
            <AuthorArea>
                <AuthorInput
                    name="author"
                    type="text"
                    value={state.author}
                    onChange={handleChangeEvent}
                    placeholder="이름을 남겨주세요."
                    ref={authorRef}
                />
            </AuthorArea>

            <ContentArea>
                <ContentText
                    name="content"
                    type="text"
                    value={state.content}
                    onChange={handleChangeEvent}
                    placeholder="오늘 하루를 기록해보세요. (최소 5자 이상)"
                    ref={contentRef}
                />
            </ContentArea>

            <SubmitBtn type="submit" onClick={handleSubmit}>
                작성하기
            </SubmitBtn>
        </EditorWrapper>
    );
};

export default React.memo(DiaryEditor);

const EditorWrapper = styled.div`
    width: 100%;
    height: auto;
`;
const EmotionArea = styled.div`
    margin-bottom: 8px;
`;

const AuthorArea = styled.div`
    margin-bottom: 8px;
`;
const AuthorInput = styled.input`
    width: 80%;
    height: 20px;
`;
const ContentArea = styled.div`
    margin-bottom: 10px;
`;
const ContentText = styled.textarea`
    width: 80%;
    height: 150px;
`;

const SubmitBtn = styled.button`
    width: 308px;
    height: 26px;
`;
