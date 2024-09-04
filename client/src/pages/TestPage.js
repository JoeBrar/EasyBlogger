import {useState,useEffect} from 'react';


const TestPage=()=>{

    const [myVar,setMyVar]=useState(null);

    const changeMyVar=(value)=>{
        setMyVar(value);
    }
    
    useEffect(()=>{
        changeMyVar(10);

    },[]);

    useEffect(()=>{
        const func= async()=>{
            
        }
        func();
    }, [myVar])


    return(
        <div className='myDiv'>
            <div>
                Hello abcd
            </div>
        </div>
    )

}

const styles={
    container:{

    }
}

export default TestPage;