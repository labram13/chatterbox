import './Onboarding.css'
import Logo from '../assets/chatterbox.svg?react'
import {useState} from 'react'
import { useForm } from 'react-hook-form'


type FormValues = {
    username: string,
    email: string, 
    password: string,
    confirmPassword: string,
}
export default function Register() {
    const form = useForm<FormValues>()
    const { register, control, handleSubmit, formState, setError, watch} = form
    const { errors } = formState;


    const onSubmit = (data: FormValues) => {

     console.log(data)

    }


  

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="login-header">
                <Logo />
                <h2>Register</h2>
            </div>
            <div className="input">
                <input type='text' id='username' placeholder='Username' {...register("username", 
                    {required: {
                        value: true,
                        message: "Username is required"}}
                )}/>
                <p className="error">{errors.username?.message}</p>
            </div>

            <div className="input">
                <input type="email" id="email" placeholder="Email"{...register("email", {
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
                <input type='password' id='password' placeholder='Password' {...register("password", {
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

                <div className='input'>
                    <input type='password' id='confirm-password' placeholder='Re-type Password' {...register('confirmPassword', {
                        required: {
                            value: true,
                            message: "Confirm password"
                        },
                        validate: (value) => 
                            value === watch('password') || "Passwords do not match"
                    })}/>
                    <p className='error'>{errors.confirmPassword?.message}</p>

                </div>
            </div>
          
            <button type='submit'>Register</button>

        </form>
    )
}