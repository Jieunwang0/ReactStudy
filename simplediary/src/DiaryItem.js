import styled from "styled-components";
import React, { useState, useRef, useContext } from "react";
import { DiaryDispatchContext } from "./App";

const DiaryItem = ({ id, author, content, created_date, emotion }) => {
    const { onDelete } = useContext(DiaryDispatchContext);
    const { onEdit } = useContext(DiaryDispatchContext);

    const [isEdit, setIsEdit] = useState(false);
    const toggleBtn = () => {
        setIsEdit(!isEdit);
    };
    const [localContent, setLocalContent] = useState(content);
    const localContentInput = useRef();
    const handleRemove = () => {
        if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
            onDelete(id);
        }
    };
    const handleQuitEdit = () => {
        setIsEdit(false);
        setLocalContent(content);
    };
    const handleEdit = () => {
        if (localContent.length < 5) {
            localContentInput.current.focus();
            return;
        }
        if (window.confirm(`${id}번째 일기를 정말 수정하시겠습니까?`)) {
            onEdit(id, localContent);
            toggleBtn();
        }
    };

    return (
        <ItemContainer>
            <ItemBox key={id}>
                <ItemInfo>
                    작성자 : {author} | 기분 : {emotion}
                </ItemInfo>
                <ItemDate>{new Date(created_date).toLocaleString()}</ItemDate>
                {isEdit ? (
                    <>
                        <textarea
                            ref={localContentInput}
                            value={localContent}
                            onChange={(e) => setLocalContent(e.target.value)}
                        />
                    </>
                ) : (
                    <>
                        <ItemContent>{content}</ItemContent>
                    </>
                )}
                {isEdit ? (
                    <>
                        <DeleteBtn onClick={handleQuitEdit}>
                            수정 취소
                        </DeleteBtn>
                        <EditBtn onClick={handleEdit}>수정 완료</EditBtn>
                    </>
                ) : (
                    <>
                        <DeleteBtn onClick={handleRemove}>삭제하기</DeleteBtn>
                        <EditBtn onClick={toggleBtn}>수정하기</EditBtn>
                    </>
                )}
            </ItemBox>
        </ItemContainer>
    );
};

export default React.memo(DiaryItem);

const ItemContainer = styled.div`
    width: 375px;
    height: auto;
    min-height: 220px;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    background-color: gray;

    & {
        margin-bottom: 8px;
    }
`;
const ItemBox = styled.div`
    width: 80%;
    font-size: 14px;
`;

const ItemInfo = styled.div`
    background-color: blue;
`;

const ItemDate = styled.div`
    background-color: yellow;
`;

const ItemContent = styled.p`
    background-color: pink;
    height: auto;
`;

const DeleteBtn = styled.button`
    height: 20px;
`;

const EditBtn = styled.button`
    height: 20px;
`;
