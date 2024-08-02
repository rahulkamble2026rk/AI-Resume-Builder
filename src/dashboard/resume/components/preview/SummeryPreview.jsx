/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react'

function SummeryPreview({resumeInfo}) {
  return (
     <p className='text-xs'> 
       {resumeInfo?.summery}
     </p>
  )
}

export default SummeryPreview