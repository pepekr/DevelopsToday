import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';

function AuthComponent() {
  const [isAuth, setIsAuth] = useState<boolean|null>(null)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BACKEND_API_URL}/verify`, {
          credentials: "include",
        });
        if(res.ok)
          {
            setIsAuth(true)
          }
        else
          {
            setIsAuth(false)
          }
      } catch {
      
      }
    };

    checkAuth();
  }, []);
  
if(isAuth === null)
  {
    return <>Loading</>
  }
  return (
   isAuth?<><Navbar/> <Outlet/></>:<Navigate to="/login" replace />
  )
}

export default AuthComponent
