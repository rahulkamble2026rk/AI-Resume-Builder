

import { Navigate,Outlet } from 'react-router-dom'
import './App.css'  
import Header from './components/custom/Header';
// eslint-disable-next-line no-unused-vars
import { useUser } from '@clerk/clerk-react';
import { Toaster } from 'sonner';
function App() 
{
 
  // eslint-disable-next-line no-unused-vars
  const {user,isLoaded,isSignedIn}=useUser(0);
 
   if(!isSignedIn && isLoaded)
   {
    return <Navigate to={'/auth/sign-in'}/>
   }
  return (
    <> 
       <Header></Header>
      <Outlet/> 
      <Toaster/>
    </>
  )
}

export default App
