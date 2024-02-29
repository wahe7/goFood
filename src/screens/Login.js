import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'


export default function Login() {
  let navigate=useNavigate();
  const [credential, setcredentials] = useState({ email: "", password: "" });
  const handlesubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/loginuser", {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({ email: credential.email, password: credential.password })
    });

    const json = await response.json();
    //console.log(json);

    if (!json.success) {
      alert("Enter Valid Credential");
    }
    if(json.success)
    {
      localStorage.setItem("authtoken",json.authtoken);
      console.log(localStorage.getItem("authtoken"));
      navigate("/");
    }
  }


  const onchange = (event) => {
    setcredentials({ ...credential, [event.target.name]: event.target.value });
  }  //read pending


  return (
    <>
      <div className='container'>
        <form onSubmit={handlesubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value={credential.email} onChange={onchange} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name='password' value={credential.password} onChange={onchange} />
          </div>



          <button type="submit" className="m-3 btn btn-success">Submit</button>
          <Link to="/createuser" className='m-3 btn btn-danger'>I'm a new user</Link>

        </form>
      </div>
    </>
  )
}
