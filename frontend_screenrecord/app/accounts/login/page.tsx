"use client"
import { useState } from "react";
import styles from "../../styles/login.module.css"
const Index = () => {
  const [token, setToken] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event : any) => {
    event.preventDefault();

    // Perform your login API call or authentication logic here
    // For example, using fetch or axios:
    try {
      const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        // Include your login credentials in the request body
        body: JSON.stringify({
          username: event.target.username.value,
          password: event.target.password.value
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        const receivedToken = data.token;
       // console.log("received token ",receivedToken)
        setToken(receivedToken);

        if(token){
          localStorage.setItem('userToken',token);
       //   console.log(localStorage.getItem('userToken'))
        }
      }else {
        const data = await response.json();
        setMessage(data.message || 'An error occurred during login');
      }
    } catch (error) {
      console.log(error)
    }
  };

  return <div className={styles.login__container}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h1>LOGIN</h1>
                <input type="text" id="username" name="username" required placeholder="Username"/>

                <input type="password" id="password" name="password" required placeholder="Password"/>
                 {message && <small>{message}</small>}
                <input type="submit" value="Submit" />
        </form>
  </div>
}

export default Index