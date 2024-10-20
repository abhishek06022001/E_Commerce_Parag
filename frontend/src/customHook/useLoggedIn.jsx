import React, { useEffect, useState } from 'react'
import axios from 'axios';
// now this custom hook check if accessToken is valid 
function useLoggedIn() {
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function Check() {
      const token = localStorage.getItem('accessToken');
      try {
        const bool = await axios.get('/api/test', {
          headers: {
            token: token
          }
        });
        setTimeout(() => {
          setIsValid(bool.data.success);
          setLoading(false);
        }, 2000)

      } catch (error) {
        setTimeout(() => {
          setIsValid(false);
          setLoading(false);
        }, 2000);
      }

    }
    Check();
  }, []);
  return [isValid, loading];
}

export default useLoggedIn