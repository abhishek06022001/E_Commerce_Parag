import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
// now this custom hook check if accessToken is valid 
function useLoggedIn() {
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    async function Check() {

      const token = localStorage.getItem('accessToken');
      try {
        const bool = await axios.get('/api/test', {
          headers: {
            token: token
          }
        });
        if (bool.data.id == (id)) {
          setTimeout(() => {
            setIsValid(bool.data.id);
            setLoading(false);
          }, 200);
        } else {
          throw new Error();
        }
      } catch (error) {
        setTimeout(() => { 
          setIsValid(false);
          setLoading(false);
        }, 200);
      }

    }
    Check();
  }, []);
  return [isValid, loading];
}

export default useLoggedIn