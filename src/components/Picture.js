import React, { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from './Navbar'
import AppLoader from './AppLoader'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Picture = () => {
  
  const [ picture, setPicture ] = useState({})
  const [ loading, setLoading ] = useState(true)
  const [ liked, setLiked ] = useState(false)
  
  const params = useParams() 
  const navigate = useNavigate()

  const checkLike = useCallback(async() => {
    let headers = {
        headers : {
            'API-TOKEN': localStorage.getItem('token')
        }
    }

    try {
        const res = await axios.get(`http://127.0.0.1:8000/api/pictures/${params.id}/checkLike`, headers)
        setLiked(res.data)
    }
    catch (error) {
        console.log(error.response)
    }
  }, [params.id])

  const handleLike = useCallback(async() => {
    let headers = {
        headers : {
            'API-TOKEN': localStorage.getItem('token')
        }
    }

    try {
        await axios.get(`http://127.0.0.1:8000/api/pictures/${params.id}/handleLike`, headers)
        checkLike()
    }
    catch (error) {
        console.log(error.response)
    }
  }, [params.id, checkLike])



  useEffect(() => {
    const fetchPicture = async () => {
        if (localStorage.getItem('token')){
            let id = params.id
            let headers = {
                headers: {
                    'API-TOKEN': localStorage.getItem('token')
                }
            }

            try {
                const res = await axios.get(`http://127.0.0.1:8000/api/pictures/${id}`, headers)
                setPicture(res.data)
                setLoading(false)
                checkLike()
            }
            catch (error) {
                console.log(error.response)
                setLoading(false)
            }
        } else {
            navigate('/')
        }
    }

    fetchPicture()
  }, [params.id, navigate, checkLike])


  return (
    <>
      <Navbar />
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <AppLoader />
        </div>
      ) : (
        <div className="container my-5">
          <div className="row">
            <div className="col-6">
              {picture.image ? (
                <img
                  className="img-fluid"
                  src={`http://127.0.0.1:8000/storage/pictures/${picture.image}`}
                  alt={picture.title}
                />
              ) : (
                <p>No image available</p>
              )}
            </div>
            <div className="col-4">
              <div className="author">
                <h2>{picture.title}</h2>
                <p>{picture.description}</p>
                <h4>
                  Auteur:{" "}
                  <span className="badge bg-secondary">
                    {picture.user ? picture.user.name : 'unknown'}
                  </span>
                </h4>
                {liked ? (
                  <>
                    <FavoriteIcon
                      onClick={() => {
                        handleLike();
                      }}
                    />{" "}
                    Je n'aime plus
                  </>
                ) : (
                  <>
                    <FavoriteBorderIcon
                      onClick={() => {
                        handleLike();
                      }}
                    />{" "}
                    J'aime
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Picture
