/* eslint-disable no-undef */
/* eslint-disable react/jsx-no-undef */
// eslint-disable-next-line no-unused-vars
import React from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery'
import Experience from './forms/Experience' 
import Education from './forms/Education'

function FormSection() {
  // eslint-disable-next-line no-unused-vars, no-undef
  const [activeFormIndex, setActiveFormIndex] = useState(1);
  // eslint-disable-next-line no-unused-vars
  const [enableNext, setEnabledNext] = useState(false);
  return (
    <div>
      <div className='flex justify-between items-center'>
        <Button variant="outline" size="sm" className="flex gap-2"><LayoutGrid />Theme</Button>
        <div className='flex gap-2'>
          {activeFormIndex > 1 && (
            <Button size='sm' onClick={() => setActiveFormIndex(activeFormIndex - 1)}>
              <ArrowLeft />
            </Button>
          )}
          <Button
            disabled={!enableNext}
            className="flex gap-2"
            size="sm"
            onClick={() => setActiveFormIndex(activeFormIndex + 1)}>
            Next<ArrowRight />
          </Button>
        </div>
      </div>
      {activeFormIndex === 1 ? (
        <PersonalDetail enableNext={(v) => setEnabledNext(v)} />
      ) : activeFormIndex === 2 ? (
        <Summery enableNext={(v) => setEnabledNext(v)} />
      ) : activeFormIndex === 3 ? 
        <Experience />
       : activeFormIndex === 4 ? (
        <Education />
      ) : null}
    </div>
  )
}

export default FormSection
