import { useContext, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import '../styles/Login.css'

const Login = () => {
    const [error, setError] = useState({
        emailError: "",
        passwordError: "",
    })
    const { login } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    function handleSubmit(e) {
        e.preventDefault()
        if(formData.email === "") {
            setError({
                emailError: "Email must be filled"
            })
        } else if(formData.password === "") {
            setError({
                passwordError: "Password must be filled"
            })
        } 
        else {
            login(formData.email)
        }
    }

    function handleChange(e) {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }

    return (
        <main id='login'>
            <div id="login-container">
                <p id="login-title">Welcome back.</p>
                <p id="login-subtitle">Sign in to your workspace</p>
                <form id="login-form" onSubmit={handleSubmit}>
                    <div id="login-email" className='login-input'>
                        <label htmlFor="email">EMAIL</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} />
                        <p id="form-error">{error.emailError}</p>
                    </div>

                    <div id="login-password" className='login-input'>
                        <label htmlFor="password">PASSWORD</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} />
                        <p id="form-error">{error.passwordError}</p>
                    </div>

                    <button type="submit" id='login-btn'>Sign In &#8594; </button>
                    <p id="form-subtitle">Use any email + password to continue</p>
                    
                </form>
            </div>
        </main>
    )
}

export default Login