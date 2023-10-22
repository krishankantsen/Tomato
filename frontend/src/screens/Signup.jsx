import React, { useState } from 'react'

import { Link } from 'react-router-dom'
export default function
    Signup() {
    //creating use state htmlFor data of user like name etc
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", location: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();//synthetic event
        //fetching data from url 
        const response = await fetch("/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            //sending data to backend
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.location })
        }); 
        const json = await response.json()
        // localStorage.setItem("name",credentials.name)
        if (!json.success) {
            alert("Invalid Credential");
        }

    }
    const onChange = (event) => {
        //cahnging the state of our variables
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    return (
        <>
            <div className="container mt-5  ">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" placeholder="Enter name" className="form-control w-50" name='name' value={credentials.name} onChange={onChange} />

                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" placeholder="Enter email" className="form-control" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" placeholder='Enter Password' className="form-control" name='password' value={credentials.password} onChange={onChange} />
                        <div id="emailHelp" className="form-text">Password Must contain Uppercase,Lowercase,Number,Symbol and should 8 character long </div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input type="text" placeholder='Enter Address' className="form-control" name='location' value={credentials.location} onChange={onChange} />
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                    <Link to="/login" className="m-3 btn btn-danger">Already a User</Link>
                </form>
            </div>
        </>
    )
}
