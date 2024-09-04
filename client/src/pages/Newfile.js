import React from 'react'

const Newfile = () => {


    const[backgroundColor, setBackgroundColor]='red';

  return (
    <div style={{backgroundColor:'red'}}>
        Newfile
        <div>
            <input type="radio" name="red" onSelect={()=>{setBackgroundColor('red')}}/>
            Red 
            <br></br>
            <input type="radio" name="yellow" onSelect={()=>{setBackgroundColor('yellow')}} />
            Yellow 
            <br></br>
            <input type="radio" name="blue" onSelect={()=>{setBackgroundColor('blue')}} />
            Blue 
            <br></br>
            
        </div>
        {backgroundColor}

    </div>
  )
}

export default Newfile;