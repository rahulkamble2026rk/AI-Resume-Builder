// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';

function EditResume() {
  // eslint-disable-next-line no-unused-vars
  const params = useParams();
  const [resumeInfo, setResumeInfo] = useState(dummy);

  useEffect(() => {
    setResumeInfo(dummy);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
      <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
        <FormSection />
        <ResumePreview />
      </div>
    </ResumeInfoContext.Provider>
  );
}

export default EditResume;
