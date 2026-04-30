import '../css/Onboarding.css'
import Logo from '../assets/chatterbox.svg?react'
import { useForm } from 'react-hook-form'
import {Link, useNavigate} from 'react-router-dom'
import type {Dispatch, SetStateAction} from 'react'



type FormValues = {
    username: string,
    email: string, 
    password: string,
    confirmPassword?: string,
}

interface SetLoginStatus {
    setIsLoggedIn: Dispatch<SetStateAction<boolean | null>>
}

export default  function Register(props: SetLoginStatus) {
    const form = useForm<FormValues>()
    const { register, handleSubmit, formState, setError, watch} = form
    const { errors } = formState;
    const navigate = useNavigate()


    const onSubmit = async (data: FormValues) => {
        const {confirmPassword, ...newUser}:FormValues = data

        const response = await fetch('/api/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newUser: newUser
            })

        })

        const responseJson = await response.json();

        if (response.ok) {
            props.setIsLoggedIn(true)
            navigate('/dashboard')

        } else {
            if (responseJson.message === "user exists") {
                setError('username', {
                    type: 'manual',
                    message: 'Username already exists'
                })
            }
    
            if (responseJson.message === 'email exists') {
                setError('email', {
                    type: 'manual',
                    message: 'Please use a different Email'
                })
            }
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="login-header">
                <Logo />
                <h2>Register</h2>
            </div>
            <div className="input">
                <label htmlFor='username'>Username</label>
                <input type='text' id='username' {...register("username", {
                    required: {
                        value: true,
                        message: "Username is required"}}
                )}/>
                <p className="error">{errors.username?.message}</p>
            </div>

            <div className="input">
                <label htmlFor='email'>Email</label>
                <input type="email" id="email" {...register("email", {
                    required: {
                        value: true,
                        message: "Email is required"
                    },
                    pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: "Enter a valid email address"
                    }
                })}/>
                <p className="error">{errors.email?.message}</p>
            </div>

            <div className="input"> 
                <label htmlFor='password'>Password</label>
                <input type='password' id='password' {...register("password", {
                    required: {
                        value: true,
                        message: "Password is required"
                    },
                    minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters"
                    }, 
                    validate: {
                        hasLowercase: (value) =>
                            /[a-z]/.test(value) || "Must include a lowercase letteer",
                        hasUppercase: (value) => 
                            /[A-Z]/.test(value) || "Must include an uppercase letter",
                        hasNumber: (value) => 
                            /\d/.test(value) || "Must include a number",

                        hasSpecialChar: (value) => 
                            /[@$!%*?&]/.test(value) ||
                            "Must include a special character"
                    }
    
                })}/>
                <p className='error'>{errors.password?.message}</p>
                </div>

                <div className='input'>
                    <label htmlFor='confirm-password'>Re-enter password</label>
                    <input type='password' id='confirm-password' {...register('confirmPassword', {
                        required: {
                            value: true,
                            message: "Confirm password"
                        },
                        validate: (value) => 
                            value === watch('password') || "Passwords do not match"
                    })}/>
                    <p className='error'>{errors.confirmPassword?.message}</p>

                </div>
          
            <button type='submit'>Register</button>
             <div className='prompt-user'>
                Already have an account? &nbsp;
                <Link className='nav' to='/login'>Login</Link>

            </div>

        </form>
    )
}