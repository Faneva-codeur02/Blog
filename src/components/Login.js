import React, {useEffect, useState} from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { GoogleLoginButton } from 'react-social-login-buttons'
import { TextField, IconButton, InputAdornment, Button } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

const Login = () => {

    const [login, setLogin] = useState({
        email:'',
        password:'',
        errors: []
      })

      const [showPassword, setShowPassword] = useState(false)

      const navigate = useNavigate()

      useEffect(() => {
        if(localStorage.getItem('token')){
          navigate('/login')
        }
      }, [navigate])
    
      const handleEmailChange = (event) => {
        setLogin({...login,
                      email: event.target.value
                     })
      }
    
      const handlePasswordChange = (event) => {
        setLogin({...login,
                      password: event.target.value
                     })
      }
    
    
      const handleSubmit = async(event) => {
        event.preventDefault()

        const bodyFormData = {
          'email': login.email,
          'password': login.password
        }
    
        try{
          const response = await axios.post('http://127.0.0.1:8000/api/login', bodyFormData)
          console.log(response)
          localStorage.setItem('token', response.data.token)
          localStorage.setItem('user', JSON.stringify(response.data.user))
          navigate('/')
        } catch (error) {
            if(error.response.status === 401){
                setLogin({...login,
                          errors : error.response.data.errors
                })
            }
            console.log(error.response)
        }
      }

      const toggleShowPassword = () => {
        setShowPassword(!showPassword)
      }

      const handleGoogleLogin = () => {
        window.location.href = 'http://127.0.0.1:8000/auth/google/redirect';
      };
  

  return (
    <>
      <Navbar />
      <div className="container w-50">
        <h2 className="text-center my-5 ">Connexion</h2>
        <form method="POST" onSubmit={handleSubmit}>
          <div className="form-group">
            <TextField
              label="Adresse email"
              value={login.email}
              onChange={handleEmailChange}
              type="email"
              fullWidth
              margin="normal"
              error={Boolean(login.errors.email)}
              helperText={login.errors.email}
            />
          </div>
          <div className="form-group">
            <TextField
              label="Mot de passe"
              value={login.password}
              onChange={handlePasswordChange}
              type={showPassword ? "text" : "password"}
              fullWidth
              margin="normal"
              error={Boolean(login.errors.password)}
              helperText={login.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <br />
          {login.errors && login.errors === "bad_credentials" ? (
            <div className="alert alert-warning">
              Vos identifiants de connexion sont incorrects !!
            </div>
          ) : (
            ""
          )}
          <Button type="submit" variant="contained" color="primary">
            Se connecter
          </Button>
        </form>
      </div>
      <div className="d-flex justify-content-center my-4">
          <GoogleLoginButton 
            onClick={handleGoogleLogin}
            style={{ maxWidth: 400, minWidth: 300 }} 
          />
      </div>
    </>
  );
}

export default Login
