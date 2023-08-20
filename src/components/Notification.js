import '../styles/Notification.css'
import cross from '../assets/Icons/cross.png'
import { Link } from "react-router-dom"

export const Notification = ({id, ProfileId, content, target, createdAt , deleteFunction}) => {
    let tab = target.split(' ');

    if(tab[0] === 'post'){
        tab[0] = 'focus-post'
    }
    if(tab[0] === 'comment'){
        tab[0] = 'focus-comment'
    }
    let url = '/'+tab[0]+'/'+tab[1]

    return(<div className="notification-root-container"  onClick={(e) => deleteFunction(e)}>
        <div className='notification-top'>
            <p className='createdAt'>{createdAt.substring(0,10) + " " + createdAt.substring(11,16)}</p>    
            <img className='delete-notification' src={cross} onClick={(e) => deleteFunction(e)}></img>
        </div>
        <Link to={url}>{content}</Link>
    </div>)
}