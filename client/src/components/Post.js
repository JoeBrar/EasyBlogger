import {format, formatISO9075} from 'date-fns';
import { Link } from 'react-router-dom';

const Post=({_id,title,cover,content,summary,createdAt,author})=>{
    return(
    <div className="post" key={_id}>
        <div className='image'>
            <Link to={`/post/${_id}`}>
                <img src={process.env.REACT_APP_api_url+`/${cover}`} alt="" style={{height:200}}></img>
            </Link>
        </div>
        <div className="texts">
            <Link to={`/post/${_id}`} className='post_title'>
                <h2>{title}</h2>
            </Link>
            <div className='info_div'>
                <div className='info'>
                    <a className='author'>@{author?.username}</a>
                    <div style={{display:'flex',flexDirection:'row',gap:9}}>
                        <span>{format(new Date(createdAt),"d MMM, yyyy")}</span>
                        <span>{format(new Date(createdAt),"HH:mm")}</span>
                    </div>
                </div>
            </div>
            <p className='summary'>{summary}</p>
        </div>
    </div>
    )
}

export default Post;