import '../css/Onboarding.css'
import Logo from '../assets/chatterbox.svg?react'
import {useForm} from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import type {Dispatch, SetStateAction} from 'react'


interface Credentials {
    username: string,
    password: string
}

interface SetLoginStatus {
  setIsLoggedIn: Dispatch<SetStateAction<boolean | null>>
}
export default function Login({setIsLoggedIn}: SetLoginStatus) {
    const navigate = useNavigate()
    const form = useForm<Credentials>()
    const { register, handleSubmit, formState, setError} = form
    const { errors } = formState;


    const onSubmit = async (data:Credentials) => {

        const response = await fetch('/api/user/login', {
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
            return
        }
        setIsLoggedIn(true)
        navigate('/dashboard');
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
