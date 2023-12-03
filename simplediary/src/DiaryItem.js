const DiaryItem = ({id, author, content, created_date, emotion}) => {
return (
    <div className="DiaryItem">
        <div key={id}>
            <span>
                작성자 : {author} | 기분 : {emotion}
            </span>
            <span className="date">작성일 : {new Date(created_date).toLocaleString()}</span>
            <span>일기 : {content}</span>
        </div>
    </div>
);
}

export default DiaryItem;