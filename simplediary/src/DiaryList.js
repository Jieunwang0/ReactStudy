import DiaryItem from "./DiaryItem";
import styled from 'styled-components';

const DiaryList = ({ onDelete, onEdit, diaryList }) => {
    return (
        <ListContainer>
            <TotalList>{diaryList.length}개의 글이 있습니다.</TotalList>
            <ListBox>
                {diaryList.map((it) => (
                    <DiaryItem key={it.id} {...it} onDelete={onDelete} onEdit={onEdit}/>
                ))}
            </ListBox>
        </ListContainer>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;

const ListContainer = styled.div`
color: black;
`;
const TotalList = styled.div`
margin: 8px 0;
`
const ListBox = styled.div`
  
`;