import '../styles/Post.css';

export const Post = ({ProfileId, MissionId, content, topic }) => {
    return (
        <div className='post-root-container'>
            <div className='post-author'>
                <p>Test user</p>
            </div>
            <div className='post-topic'>
                <p>#{topic}</p>
            </div>
            <div className='post-content'>
                {content}
            </div>
        </div>
    );
}