import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const PostPicture = () => {

    const [ picture, setPicture ] = useState({
        title: '',
        description: '',
        image: '',
        errors: []
    })
    
    const navigate = useNavigate()

    useEffect(() => {
      if(!localStorage.getItem('token')){
        navigate('/login')
      }
    }, [navigate])


    const handleTitleChange = (event) => {
        setPicture({...picture,
                      title: event.target.value
                     }, console.log(picture))
      }
    
      const handleDescriptionChange = (event) => {
        setPicture({...picture,
                      description: event.target.value
                     }, console.log(picture))
      }

      const handleImageChange = (event) => {

        const file = event.target.files[0]
        
        if(file){
            setPicture(prevPicture => ({
                ...prevPicture,
                image: file
            }))
        }
      }

      useEffect(() => {
        console.log(picture)
      },[picture])

      const handleSubmit = async(event) => {
        event.preventDefault()
        console.log('Before submit:', localStorage.getItem('token'))

        let bodyFormData = new FormData();
            bodyFormData.append('title', picture.title)
            bodyFormData.append('description', picture.description)
            bodyFormData.append('image', picture.image)

        let headers = {
          headers : {
            'Content-Type': 'multipart/form-data',
            'API_TOKEN' : localStorage.getItem('token'),
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        } 
          
           
      
          try{
            const response = await axios.post('http://127.0.0.1:8000/api/pictures/store', bodyFormData, headers)
            console.log('After submit:', localStorage.getItem('token'))
            console.log(response)
            navigate('/')
          } catch (error) {
            if(error.response.status === 401){
              setPicture({...picture,
                        errors : error.response.data.errors
              }, console.log(picture))
          }
          console.log(error.response)
        }
      }

  return ( 
    <>
      <Navbar/>
      <div className='container w-50'>
            <h2 className='text-center my-5 '>Ajouter une nouvelle photo</h2>
            <form method='POST' onSubmit={handleSubmit} >
                <div className='form-group'>
                    <label htmlFor="exampleInputTitle1">Titre</label>
                    <input 
                        value={picture.title} 
                        onChange={handleTitleChange} 
                        type='text' className={`form-control ${picture.errors && picture.errors.title ? "is-invalid" : ''}`} 
                        id='exampleInputTitle1' 
                        area-describedby='titlehelp' />
                    { picture.errors && picture.errors.title ? <div className='text-danger invalide-feedback'>{picture.errors['title']}</div> : ''}
                </div>
                <div className='form-group'>
                    <label htmlFor='exampleInputDescription1'>Description </label>
                    <textarea 
                        value={picture.description} 
                        onChange={handleDescriptionChange} 
                        className={`form-control ${picture.errors && picture.errors.description ? "is-invalid" : ''}`} 
                        id="exampleFormControlTextarea1" 
                        rows='3'></textarea>
                    { picture.errors && picture.errors.description ? <div className='text-danger invalide-feedback'>{picture.errors['description']}</div> : ''}
                </div>
                <br/>
                <div className='form-group'>
                    <label htmlFor="exampleFormControlFile1"></label>
                    <input 
                        onChange={handleImageChange} 
                        type='file' 
                        className={`form-control-file ${picture.errors && picture.errors.image ? "is-invalid" : ''}`} 
                        id='exampleFormControlFile1'/>
                    { picture.errors && picture.errors.image ? <div className='text-danger invalide-feedback'>{picture.errors['image']}</div> : ''}
                </div> 
                <br/>
                <button  type='submit' className='btn btn-primary'>Ajouter</button>
            </form>
        </div>
    </>
  )
}

export default PostPicture
