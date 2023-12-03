import DiaryItem from "./DiaryItem";

const DiaryList = ({ diaryList }) => {


    return (
        <div className="DiaryList">
            <div>{diaryList.length}개의 글이 있습니다.</div>
          <div>
            {diaryList.map((it) => (
                <DiaryItem key={it.id} {...it}/>
            ))}
            </div> 
        </div>
    );
};

DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;
