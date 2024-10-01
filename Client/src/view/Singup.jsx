import { useState } from 'react';
import './App.css';

const Singup = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");



  const submitdata = async (e) => {
    e.preventDefault();
    
    const response = await fetch('https://demo-jvzg.onrender.com/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });
  
    const data = await response.json();
  
    if (response.ok) {
      alert('User registered successfully');
    } else {
      alert(`Error: ${data.error}`);
    }
  };
  
  return (
    <>
      <div className="container">
        <h1>Registration</h1>
        <form >

          <label htmlFor="">Name</label>

          <input type="text" name='name' value={name} onChange={(e) => { setname(e.target.value) }} />

          <label htmlFor="">Email</label>
          <input type="email" name='email' value={email} onChange={(e) => { setemail(e.target.value) }} />

          <label htmlFor="">Password</label>
          <input type="password" name='password' value={password} onChange={(e) => { setpassword(e.target.value) }} />

          <button onClick={submitdata} >submit</button>
        </form>
      </div>
    </>
  )
}

export default Singup;