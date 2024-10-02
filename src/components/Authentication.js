import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Authentication = () => {

  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {

    console.log(params)
    let userToken = params.token;
    let provider = params.provider;
    let userId = params.id;

    if (!userToken || !provider || !userId){
      navigate('/')
    }

    localStorage.setItem('token', userToken)

    // Fetch user details using userId and store in localStorage
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/');
      } catch (error) {
        console.error("Failed to fetch user details", error);
        navigate('/login');
      }
    };

    fetchUserDetails();
  }, [params, navigate])

  return (
    <div>
      Authentification en cours...
    </div>
  );
};

export default Authentication;
