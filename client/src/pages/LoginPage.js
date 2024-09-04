import Header from "../components/Header";
import { useEffect,useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { UserContext } from "../context/UserContext";

const LoginPage=()=>{
    const {userInfo,setUserInfo}=useContext(UserContext);
    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const navigate=useNavigate();

    const login=async (e)=>{
        e.preventDefault();
        let response=await fetch(process.env.REACT_APP_api_url+'/login', {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            credentials:'include',
            body:JSON.stringify({username,password})
        })
        console.log(response);
        console.log("headers - ",response.headers);
        if(response.ok){
            let result=await response.json();
            console.log("result -",result);
            setUserInfo({...userInfo, username:result.username, id:result.id});
            navigate('/');
        }
        else{
            alert("Wrong Credentials");
        }
    }

    const testfunc=async ()=>{
        let num1=25;
        let num2=3;
        await fetch(process.env.REACT_APP_api_url+'/sum',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({num1:num1,num2:num2})
        })
        .then((response)=>{
            if(!response.ok){
                throw new Error("Response is not ok");
            }
            return response.json();
        })
        .then((data)=>{
            console.log("Sum is - ",data);
        })
        .catch((err)=>{
            console.log("Error - ",err);
        })
    }

    return(
    <main>
        <Header />
        <div className="form_outer_container">
            <div>
                <div className="form_title">Login</div>
                <form onSubmit={login}>
                    <input type="text" placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                    <div className="btn_container" style={{marginTop:'10px'}}>
                        <button type="submit" style={{backgroundColor:'green'}}>Submit</button>
                    </div>
                </form>
            </div>
            
        </div>
    </main>
    )
}

export default LoginPage;