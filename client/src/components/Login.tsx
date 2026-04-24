import '../css/Onboarding.css'
import Logo from '../assets/chatterbox.svg?react'
import {useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'


interface Credentials {
    username: string,
    password: string
}
export default function Login() {
    const form = useForm<Credentials>()

    const { register, handleSubmit, formState, setError} = form
    const { errors } = formState;

    const onSubmit = async (data:Credentials) => {

        const response = await fetch('http://localhost:3001/api/user/login', {
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify({
                userCredentials: data
            })
        })

        const responseJson = await response.json()

        if (!response.ok) {
            if (responseJson.status === 'user undefined') {
                setError('username', {
                    type: 'manual', 
                    message: responseJson.message
                })
            }

            if(responseJson.status === 'password error') {
                setError('password', {
                    type: 'manual', 
                    message: responseJson.message
                })
            }
        }

        console.log(responseJson.status)

    }

    return (
        <form  onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="login-header">
                <Logo />
                <h2>Login</h2>
            </div>

            <div className="input">
                <label htmlFor='username'>Username</label>
                <input type='text' id='username'  {...register("username", {
                    required: {
                        value: true,
                        message: "Please enter username"
                    }
                })}/>
                <p className='error'>{errors.username?.message}</p>
            </div>

            <div className='input'>
                <label htmlFor='password'>Password</label>
                <input type='password' id='password'  {...register('password', {
                    required: {
                        value: true,
                        message: "Please enter password"
                    }
                })}/>
            <p className='error'>{errors.password?.message}</p>

            </div>

            <button type='submit'>Login</button>
            <div className='prompt-user'>
                Don't have an account? &nbsp;
                <Link className='nav' to='/register'>Register</Link>

            </div>
        </form>
    )
}
