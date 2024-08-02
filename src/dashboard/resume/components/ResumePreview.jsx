/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import PersonalDetailPreview from './preview/PersonalDetailPreview';
import SummeryPreview from './preview/SummeryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationalPreview from './preview/EducationalPreview';
import SkillsPreview from './preview/SkillsPreview';
//import CodingPlatform from './preview/CodingPlatform';
//import ProjectsPreview from './preview/ProjectsPreview';
function ResumePreview() {
    // eslint-disable-next-line no-unused-vars
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    return (
        <div className='shadow-lg h-full p-14 border-t-[20px]'
            style={ 
                {
                    borderColor: resumeInfo?.themeColor
                }
            }>
            {/* Personal Detail */} 
               <PersonalDetailPreview resumeInfo={resumeInfo}/>
            {/* Summary */} 
              <SummeryPreview resumeInfo={resumeInfo}/>
            {/* Professional Experience */} 
              <ExperiencePreview resumeInfo={resumeInfo}/>
            {/* Education */} 
              <EducationalPreview resumeInfo={resumeInfo}/>  
              {/* Skills */} 
              <SkillsPreview resumeInfo={resumeInfo}/> 
              {/* projects*/ }
              {/*<ProjectsPreview resumeInfo={resumeInfo}/>*/}
            
            {/* codingPlatforms*/} 
                /{/*<CodingPlatform resumeInfo={resumeInfo}/>*/}
            
        </div>
    );
}

export default ResumePreview;
