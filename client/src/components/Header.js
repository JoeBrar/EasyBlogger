import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {useNavigate} from 'react-router-dom';
import { UserContext } from "../context/UserContext";

const Header=()=>{
    const navigate=useNavigate();
    const {userInfo,setUserInfo} = useContext(UserContext); 

    const getProfile=async ()=>{
        let response = await fetch(process.env.REACT_APP_api_url+"/profile",{
            credentials:'include'
        })
        console.log("response - ",response);
        let result=await response.json();

        console.log("result - ",result);
        if(result.username){
            setUserInfo({...userInfo, username:result.username, id:result.id});
        }
        //let result = await response.json();
        //console.log("res - ",result);
    }

    const logoutFunc=async ()=>{
        await fetch(process.env.REACT_APP_api_url+'/logout',{
            credentials:'include',
            method:'POST'
        })
        setUserInfo({});
        navigate('/');
    }


    useEffect(()=>{
        getProfile();
    },[])

    return(
        <header>
            <Link to="/" className="logo">Easy Blogger</Link>
            <nav>
                {userInfo.username && 
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:20}}>
                    <div style={{fontSize:12}}>
                        <span>Hello, {userInfo.username}</span>
                    </div>
                    <div style={{display:'flex',gap:10}}>
                        <div style={{padding:'3px 6px',border:'2px solid darkgreen',color:'darkgreen'}}>
                            <Link to="/create">Create a post</Link>
                        </div>
                        <div className="logout_btn" onClick={logoutFunc} style={{padding:'3px 6px',border:'2px solid red',color:'red'}}>
                            Logout
                        </div>
                    </div>
                </div>
                }
                {!userInfo.username &&
                <>
                    <div style={{padding:'3px 6px',border:'2px solid darkgreen',color:'darkgreen'}}>
                        <Link to="/login">Login</Link>
                    </div>
                    <div style={{padding:'3px 6px',border:'2px solid darkgreen',color:'darkgreen'}}>
                        <Link to="/register">Register</Link>
                    </div>
                </>
                }
                
            </nav>
        </header>
    )
}

export default Header;