import { useState, useEffect, useContext } from "react";
import Header from '../components/Header'
import { useNavigate, useParams } from 'react-router-dom';
import Editor from "../components/Editor";


const EditPost = () => {
    const navigate=useNavigate();
    const {postId}=useParams();
    const [content, setContent]=useState('');
    const [title, setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [cover,setCover]=useState('');
    const [files,setFiles]=useState('');

    let modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
    }
    
    let formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
    ]

    const updatePost=()=>{
        console.log("here");
        let sendData=new FormData();
        sendData.set('title',title);
        sendData.set('content',content);
        sendData.set('summary',summary);
        sendData.set('cover',cover);
        sendData.set('postId',postId);
        if(files?.[0]){
            sendData.set('file',files[0]);
        }
        fetch(process.env.REACT_APP_api_url+'/post/'+postId,{
            method:'PUT',
            body:sendData,
            credentials:'include'
        })
        .then(response=>{
            console.log('here2');
            if(!response.ok){
                throw new Error('response was not ok');
            }
            return response.json();
        })
        .then(data=>{
            console.log('updatePost res - ',data);
            navigate('/post/'+postId);
        })
        .catch(err=>{
            console.log('Error is - ',err);
        })
    }

    const fetchPostData=()=>{
        fetch(process.env.REACT_APP_api_url+'/post/'+postId,{
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
            if(data){
                setTitle(data.title);
                setSummary(data.summary);
                setContent(data.content);
                setCover(data.cover);
            }
        })
        .catch((err)=>console.error('Error is - ',err));
    }

    useEffect(()=>{
        fetchPostData();
    },[])

    return(
        <main>
            <Header/>
            <div>
                <form style={{flexDirection:'column', display:'flex'}} className="create_post_div" onSubmit={(ev)=>{ev.preventDefault();}}>
                    <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
                    <input type="text" placeholder="Summary" value={summary} onChange={(e)=>{setSummary(e.target.value)}}/>
                    <input type="file" onChange={e=>{setFiles(e.target.files)}}/>
                    <Editor value={content} onChange={setContent} />
                    <button type='button' style={{marginTop:'10px'}} onClick={()=>{updatePost();}}>Update post</button>
                </form>
                
            </div>
        </main>
    )
}

export default EditPost