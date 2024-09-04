import { Link } from "react-router-dom";
import Header from "../components/Header";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";
import { useState,useEffect } from "react";

const Homepage=()=>{
    console.log('env variables - ', process.env);
    const navigate=useNavigate();
    const [posts,setPosts]=useState([]);

    const fetchPosts=async ()=>{
        fetch(process.env.REACT_APP_api_url+'/fetchPosts',{
            method:'GET',
            headers:{
                'Content-Type':'application/json'
            }
        })
        .then((response)=>{
            if(!response.ok){
                console.error('error');
            }
            return response.json();
        })
        .then((data)=>{
            console.log('userposts -',data);
            if(data){
                setPosts(data);
            }
        })
        .catch((err)=>{
            console.error('Error - ',err);
        })
    }

    useEffect(()=>{
        fetchPosts();
    },[]);

    const getSum = async ()=>{
        const response=await fetch(process.env.REACT_APP_api_url+"/addValues",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({val1:1,val2:2})
        })

        const result=await response.json();
        console.log(result);
        alert(`Sum of numbers is ${result}`);
    }


    return(
    <main>
        <Header />
        {posts.length>0 && posts.map((curPost, ind)=>(
            <Post {...curPost} key={ind}/>
        ))}
    </main>
    )
}

export default Homepage;