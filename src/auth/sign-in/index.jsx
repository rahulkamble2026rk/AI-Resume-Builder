// eslint-disable-next-line no-unused-vars
import React from 'react'
import { SignIn } from '@clerk/clerk-react'
function SignInpage() {
  return (
    <div className='flex justify-center my-20'>
      <SignIn/>  
    </div>
  )
}

export default SignInpage 


//{/*This render the Authication from the clerk */}