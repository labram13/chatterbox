import './Login.css'
import Logo from '../assets/chatterbox.svg?react'
import { useState } from 'react'


interface Credentials {
    username: string,
    password: string
}
export default function Login() {

    const [status, setStatus] = useState<null | string>(null)



    async function login(formData: FormData) {

        const credentials: Credentials = {
            username: formData.get("username") as string,
            password: formData.get("password") as string
        }

        // console.log(credentials)

        // setStatus("sent password")

        try {
            const response = await fetch('http://localhost:3001/api/auth', {
                method: 'POST', 
                credentials: 'same-origin',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(credentials)
            })
    
            const responseData = await response.json();
            console.log(responseData)
            setStatus(responseData.status)

        } catch (error) {
            console.log(error)
        }

       

    }

    return (
        <form action={login}>
                <div className="login-header">
                <Logo />
                <h2>Login</h2>
            </div>
    

            <input required type="text" name="username" placeholder='username'/>
            <input required type="text"name="password" placeholder='password'/>
            <button type="submit">Login</button>
            <p>{status}</p>
            <div className="register-row">
                <p>Don't have an account?</p> 
                <button className="register">Register</button>
            </div>



        </form>
    )
}
