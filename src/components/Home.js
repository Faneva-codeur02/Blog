import React, {useEffect, useState, useCallback} from 'react'
import Navbar from './Navbar'
import axios from 'axios'
import { Link } from 'react-router-dom'
import AppLoader from './AppLoader'

function Home() {

  const [pictureView, setPictureView] = useState({
    pictures: [],
    search: ''
  })

  const [ loading, setLoading ] = useState(true)

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
          const res = await axios.post('http://127.0.0.1:8000/api/pictures')
          setPictureView(prevState => ({ ...prevState, pictures : res.data}))
      }
      catch (error) {
           console.log(error.response)
      }
   }
    fetchPhotos()
  },[])

  const getArticle = useCallback(async() => {
    let bodyFormData = new FormData() 
    bodyFormData.append('search', pictureView.search)

            try {
                const res = await axios.post('http://127.0.0.1:8000/api/pictures', bodyFormData)
                setPictureView(prevState => ({ ...prevState, pictures : res.data}))
                setLoading(false)
            }
            catch (error) {
                console.log(error.response)
                setLoading(false)
            }
   }, [pictureView.search])
    
  useEffect(() => {
      if (pictureView.search === ''){
        getArticle()
      }
  }, [pictureView.search, getArticle])

  const myPhotos = pictureView.pictures.map( picture => {
    return (
        <div className='card mx-2 my-3' style={{ width: '18rem' }} key={picture.id}>
            <img className='card-img-top' style={{ width: '100%', height: '300px', objectFit: 'cover' }} src={`http://127.0.0.1:8000/storage/pictures/${picture.image}`} alt={picture.title}/>
            <div className='card-body'> 
                <h5 className='card-title'>{picture.title}</h5>
                <p className='card-text'>{picture.description}</p>
                <Link to={`/pictures/${picture.id}`} className='btn btn-primary'>En savoir plus</Link>
            </div>
        </div>
    )
  })

  const handleSearchChange = (event) => {
    setPictureView(prevState => ({...prevState,
                      search: event.target.value
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    getArticle()
  }


  return (
    <>
      <div className="text-center">
        <Navbar />
        <div className="d-flex justify-content-center mb-5">
          <form
            className="form-inline my-2 my-lg-4"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input
              value={pictureView.search}
              onChange={handleSearchChange}
              className="form-control mr-sm-2"
              name="search"
              type="search"
              placeholder="Search a picture here ..."
            />
          </form>
        </div>
        <div className="container my-5">
          {loading ? (
            <div className="d-flex justify-content-center">
              <AppLoader />
            </div>
          ) : (
            <div className="row justify-content-between">{myPhotos}</div>
          )}
        </div>
      </div>
    </>
  );
}

export default Home
