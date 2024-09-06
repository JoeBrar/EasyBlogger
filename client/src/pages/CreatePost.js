import { useState, useEffect, useContext } from "react";
import Header from "../components/Header";
import ReactQuill from 'react-quill';
import { useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import Editor from "../components/Editor";

const CreatePost=()=>{
    const navigate=useNavigate();
    const [test, setTest]=useState('123');
    const [content, setContent]=useState('');
    const [title, setTitle]=useState('');
    const [summary,setSummary]=useState('');
    const [coverImage,setCoverImage]=useState('');

    function encodeImageFileAsURL(ev) {
        var file = ev.target.files[0];
        var reader = new FileReader();
        reader.onloadend = function() {
          setCoverImage(reader.result);
        }
        reader.readAsDataURL(file);
    }

    const createNewPost=async ()=>{
        let data=new FormData();
        data.set('title',title);
        data.set('content',content) ;
        data.set('summary',summary);
        data.set('coverImage',coverImage);
        let response = await fetch(process.env.REACT_APP_api_url+'/createPost',{
            method:'POST',
            body:data,
            credentials:'include'
        })
        if(response.ok){
            navigate('/');
        }
        let result=await response.json();
        console.log('result - ',result);
    }

    return(
    <main>
        <Header/>
        <div>
            <form style={{flexDirection:'column', display:'flex'}} className="create_post_div">
                <input type="text" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
                <input type="text" placeholder="Summary" value={summary} onChange={(e)=>{setSummary(e.target.value)}}/>
                {/*old version, upload file using multer */}
                {/* <input type="file" onChange={e=>{setFiles(e.target.files)}}/> */}
                {/*new version, upload file as base64 string */}
                <input type="file" onChange={(ev)=>{encodeImageFileAsURL(ev)}} />
                <Editor value={content} onChange={setContent} />
                <button type='button' style={{marginTop:'10px'}} onClick={()=>{console.log('clicked11'); createNewPost();}}>Create post</button>
            </form>
            
        </div>
    </main>
    )
}

export default CreatePost;