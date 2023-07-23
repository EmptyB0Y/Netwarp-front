import { Post } from './Post'

export const FocusPost = ({ProfileId, MissionId, content, topic, id }) => {

    return (<Post ProfileId={ProfileId} MissionId={MissionId} content={content} topic={topic} id={id} />)
}