import React, { useEffect, useState, useContext } from 'react'
import Header from '../components/Header'
import { useParams } from 'react-router-dom'
import {format, formatISO9075} from 'date-fns';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';


const PostPage = () => {
    const params=useParams();
    const {userInfo}=useContext(UserContext);
    const navigate=useNavigate();
    console.log('userInfo is - ',userInfo);
    console.log('id is - ',params.id);
    const [postDetails,setPostDetails]=useState(null);

    const fetchPostData=()=>{
        fetch(process.env.REACT_APP_api_url+'/post/'+params.id,{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((response)=>{
            if(response.ok){
                return response.json();
            }
            throw new Error("Response is not ok");
        })
        .then((data)=>{
            console.log('postDetails is - ',data);
            if(data){
                setPostDetails(data);
            }
        })
        .catch((err)=>console.error('Error is - ',err));
    }

    useEffect(()=>{
        fetchPostData();
    },[])


    return (
        <main>
            <Header/>
            {postDetails && 
            <div style={{}}>
                <div style={{textAlign:'center'}}>
                    <div style={{minHeight:1}}></div>
                    <div style={{fontSize:28, fontWeight:'bold'}}>{postDetails.title}</div>
                    <div style={{fontSize:13, color:"#888",marginBottom:3}}>by @{postDetails.author.username}</div>
                    <div style={{display:'flex',flexDirection:'row',gap:9, justifyContent:'center', fontSize:13, color:"#888",marginBottom:15}}>
                        <span>{format(new Date(postDetails.createdAt),"d MMM, yyyy")}</span>
                        <span>{format(new Date(postDetails.createdAt),"HH:mm")}</span>
                    </div>
                </div>
                
                {userInfo.id==postDetails.author._id && 
                    <div style={{display:'flex', justifyContent:'center', marginBottom:15}}>
                        <div className='post_edit_btn' onClick={()=>{navigate('/edit/'+postDetails._id)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                            </svg>
                            Edit this post
                        </div>
                    </div>
                }
                
                <div style={{display:'flex',justifyContent:'center', maxHeight:300,overflow:'hidden', marginTop:25}}>
                    <img src={process.env.REACT_APP_api_url+"/"+postDetails.cover} style={{maxWidth:'95%',objectFit:'cover',objectPosition:'center'}} />
                </div>
                
                <div style={{marginTop:30}}>
                    <div className='post_content_div' dangerouslySetInnerHTML={{__html:postDetails.content}}  />
                </div>
            </div>
            }
        </main>
    )
}

export default PostPage