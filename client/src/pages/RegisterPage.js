import { useState } from "react";
import Header from "../components/Header";

const RegisterPage=()=>{
    const [username,setUsername]=useState('');
    const [password, setPassword]=useState('');
    const [confirmPass,setConfirmPass]=useState('');

    const testfunc=(e)=>{
        console.log(e.target.value);
    }

    const register= async (e)=>{
        
        e.preventDefault();
        if(username=='' || password=='' || confirmPass==''){
            alert("Please enter all the fields");
            return;
        }
        if(password != confirmPass){
            alert("Passwords do not match. Please check.");
            return;
        }
        console.log("here");
        let response=await fetch(process.env.REACT_APP_api_url+'/register',{
            method:'POST',
            headers:{'Content-Type' : 'application/json'},
            body:JSON.stringify({
                username: username,
                password: password
            })
        })
        console.log("response - ",response);
        console.log("here2");
        if(response.status!=200){
            alert(`Registration failed`);
            let result=await response.json();
            console.log(result);
        }
        else{
            alert(`Registration successful`);
            let result=await response.json();
            console.log(result);
        }
        
    }

    return(
    <main>
        <Header />
        <div className="form_outer_container">
            <div>
                <div className="form_title">Register</div>
                <form onSubmit={register}>
                    <input type="text" placeholder="Username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                    <input type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}} />
                    <input type="password" placeholder="Confirm Password" value={confirmPass} onChange={(e)=>{setConfirmPass(e.target.value)}} />

                    <div className="btn_container" style={{marginTop:"10px"}}>
                        <button>Submit</button>
                    </div>
                </form>
            </div>
            
        </div>
    </main>
    )
}


export default RegisterPage;