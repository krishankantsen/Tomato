import React, { useState } from 'react';

import { Link ,useNavigate} from 'react-router-dom'


export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: ""})
  let navigate =useNavigate()
  const handleSubmit = async (e) => {
      e.preventDefault();//synthetic event
      //fetching data from url 
      // const response = await fetch("http://localhost:5000/loginuser", {
      const response = await fetch("/loginuser", {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          //sending data to backend
          body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });
      const json = await response.json()
      console.log(json);
      if (!json.success) {
          alert("Enter Valid Email and Password");
      }
      if(json.success){
     
  
        let response = await fetch("/getName", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          });
          
          if (response.ok) {
            const data = await response.json();
            const name = data[0][0]; // Extracting the name from the nested array
          
            localStorage.setItem("user", name);
            
          } else {
            console.error("Error while fetching data.");
          }
        
    

        localStorage.setItem("userEmail",credentials.email)
        
        localStorage.setItem("authToken",json.authToken)
        
        
        
        navigate("/")

      }

  } 
  const onChange = (event) => {
      //cahnging the state of our variables
      setcredentials({ ...credentials, [event.target.name]: event.target.value });
  }
  return (
    <div>
      <div className="container mt-5   h-100  rounded "  style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', // Adjust the height as needed
      }}>
                      
       
                <form onSubmit={handleSubmit}>
                    <div className='container text-center'><h1>SignIn</h1> <hr /></div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email"  placeholder='Enter email'className="form-control w-auto" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp"  className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" placeholder='Enter password' className="form-control w-auto" name='password' value={credentials.password} onChange={onChange} />
                        <div id="emailHelp" className="form-text">Password Must contain Uppercase,Lowercase,<br/> Number,Symbol and should 8 character long </div>                   
                    </div>
                    

                    <button type="submit" className="btn btn-primary">Login</button>
                    <Link to="/createuser" className="m-3 btn btn-danger">Create Account</Link>
                </form>
            </div>
    </div>
  )
}
