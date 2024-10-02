import React, {useState, useEffect} from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { TextField, IconButton, InputAdornment, Button } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'

function Register() {

  const [register, setRegister] = useState({
    name:'',
    email:'',
    password:'',
    confirm_password:'',
    errors: []
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/')
    }
  }, [navigate])

  const handleNameChange = (event) => {
    setRegister({...register,
                  name: event.target.value
                 })
  }

  const handleEmailChange = (event) => {
    setRegister({...register,
                  email: event.target.value
                 })
  }

  const handlePasswordChange = (event) => {
    setRegister({...register,
                  password: event.target.value
                 })
  }

  const handleConfirmPasswordChange = (event) => {
    setRegister({...register,
                  confirm_password: event.target.value
                 })
  }
  

  const handleSubmit = async(event) => {
    event.preventDefault()
    console.log('inscription en cours ....')

    const bodyFormData = {
      'name': register.name,
      'email': register.email,
      'password': register.password,
      'confirm_password': register.confirm_password
    }

    try{
      const response = await axios.post('http://127.0.0.1:8000/api/register', bodyFormData)
      console.log(response.data)
      localStorage.setItem('token', response.data.api_token)
      navigate('/')
    } catch (error) {
        if(error.response.status === 401){
          setRegister({...register,
                    errors : error.response.data.errors
          }, console.log(register))
      }
      console.log(error.response)
    }

  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <> 
        <Navbar/>
        <div className='container w-50'>
            <h2 className='text-center my-5 '>Inscription</h2>
            <form method='POST' onSubmit={handleSubmit}>
                <div className='form-group'>
                    <TextField
                      label="Nom"
                      value={register.name}
                      onChange={handleNameChange} 
                      fullWidth
                      margin='normal'
                      error={Boolean(register.errors.name)}
                      helperText={register.errors.name}
                    />
                </div>
                <div className='form-group'>
                    <TextField
                      label="Adresse email"
                      value={register.email}
                      onChange={handleEmailChange} 
                      type='email'
                      fullWidth
                      margin='normal'
                      error={Boolean(register.errors.email)}
                      helperText={register.errors.email}
                    />
                </div>
                <div className='form-group'>
                    <TextField
                      label="Mot de passe"
                      value={register.password}
                      onChange={handlePasswordChange} 
                      type={showPassword ? 'text' : 'password'}
                      fullWidth
                      margin='normal'
                      error={Boolean(register.errors.password)}
                      helperText={register.errors.password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={toggleShowPassword} edge="end">
                              {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton> 
                          </InputAdornment>
                        )
                      }}
                    />
                </div>
                <div className='form-group'>
                    <TextField
                      label="Mot de passe de confirmation"
                      value={register.confirm_password}
                      onChange={handleConfirmPasswordChange} 
                      type={showConfirmPassword ? 'text' : 'password'}
                      fullWidth
                      margin='normal'
                      error={Boolean(register.errors.confirm_password)}
                      helperText={register.errors.confirm_password}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={toggleShowConfirmPassword} edge="end">
                              {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton> 
                          </InputAdornment>
                        )
                      }}
                    />
                </div>
                <br/>
                <Button  type='submit' variant='contained' color='primary'>S'inscrire</Button>
            </form>
        </div>
        
    </>
  )
}

export default Register
