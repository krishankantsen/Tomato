import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'sonner';
export default function Signup() {
  let navigate = useNavigate();
  //creating use state htmlFor data of user like name etc
  const [credentials, setcredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault(); //synthetic event
    //fetching data from url
    const response = await fetch(`${process.env.REACT_APP_API_URL}/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      //sending data to backend
      body: JSON.stringify({
        name: credentials.name,
        email: credentials.email,
        password: credentials.password,
        location: credentials.location,
      }),
    });

    const json = await response.json();
    if (json.success) {
      toast.success(json.message,{
        duration:1000
      });
      navigate("/login");
    }
    if (!json.success) {
      toast.error("Invalid Credential",{
        duration:1000
      });
    }
  };
  const onChange = (event) => {
    //cahnging the state of our variables
    setcredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <>
      <div
        className="container    w-75 mt-"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh", // Adjust the height as needed
        }}
      >
        <form onSubmit={handleSubmit}>
          <div className="text-center ">
            <h1>SignUp</h1> <hr />
          </div>
          <div className="mb-3 ">
            <label htmlFor="name" className="form-label ">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter name"
              className="form-control w-auto "
              name="name"
              value={credentials.name}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label ">
              Email address
            </label>
            <input
              type="email"
              placeholder="Enter email"
              className="form-control w-auto"
              name="email"
              value={credentials.email}
              onChange={onChange}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label ">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control w-auto"
              name="password"
              value={credentials.password}
              onChange={onChange}
            />
            <div id="emailHelp" className="form-text">
              Password Must contain Uppercase,Lowercase,<br></br>Number,Symbol
              and should 8 character long{" "}
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              placeholder="Enter Address"
              className="form-control w-auto"
              name="location"
              value={credentials.location}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <Link to="/login" className="m-3 btn btn-danger">
            Already a User
          </Link>
        </form>
      </div>
    </>
  );
}
