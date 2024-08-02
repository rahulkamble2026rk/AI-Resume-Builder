/* eslint-disable no-unused-vars */
import { University } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { Input } from '@/components/ui/input' 
import { Button } from '@/components/ui/button' 
import { LoaderCircle } from 'lucide-react' 
import { useContext } from 'react' 
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
function Education() { 
     
    const [loading, setLoading] = useState(false); 
    const{resumeInfo,setResumeInfo}=useContext(ResumeInfoContext); // context is use for updating the data or value across the multiple components 
    const [educationalList, setEducationalList] = useState([
        {
            universityName: '',
            degree: '',
            major: '',
            startDate: '',
            endDate: '',
            description: '' 
        }
    ])


    const handleChange = (event, index) => {
        const newEntries = educationalList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setEducationalList(newEntries);
    } 

    const AddNewEducation=()=> 
    {
        setEducationalList([...educationalList, 
            
                {
                    universityName: '',
                    degree: '',
                    major: '',
                    startDate: '',
                    endDate: '',
                    description: '' 
                }
        ]);
    } 
     
    const RemoveEducation=()=>
    {
        
        setEducationalList(eductionalList => eductionalList.slice(0, -1));
   
    } 
     
    const onSave=()=>
    {

    } 
    useEffect(()=>{ //  this is used for rendering the component very effectively , as you type the changes are visible on the preview mode of the resume
            setResumeInfo({ 
                ...resumeInfo, 
                education:educationalList
            })
    } ,[educationalList])
    return (
        <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add your educational details</p>

            <div>
                {educationalList.map((item, index) => (
                    <div key={index}>
                        <div className='grid grid-cols-2  gap-3 border p-3 my-5 rounded-lg'>
                            <div className='col-span-2'>
                                <label>University Name</label>
                                <Input
                                    name="universityName"
                                    value={item.universityName} // Ensure the input is controlled
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label>Degree</label>
                                <Input
                                    name="degree"
                                    value={item.degree} // Ensure the input is controlled
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label>Major</label>
                                <Input
                                    name="major"
                                    value={item.major} // Ensure the input is controlled
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label>Start Date</label>
                                <Input
                                    name="startDate" 
                                    type="Date"
                                    value={item.startDate} // Ensure the input is controlled
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div>
                                <label>End Date</label>
                                <Input
                                    name="endDate" 
                                    type="Date"
                                    value={item.endDate} // Ensure the input is controlled
                                    onChange={(e) => handleChange(e, index)}
                                />
                            </div>
                            <div className='col-span-2'>
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={item.description}
                                    onChange={(e) => handleChange(e, index)}
                                    rows="4"
                                    className="w-full border border-gray-300 p-2 rounded-md"
                                />
                            </div>
                        </div> 
                        

                    </div>
                ))}
            </div> 
            <div className='flex justify-between'>
                        <div className='flex gap-2'>
                            <Button variant="outline" type="button" onClick={AddNewEducation} className="text-primary">+Add More Education</Button>
                            <Button variant="outline" type="button" onClick={RemoveEducation} className="text-primary">-Remove</Button>
                        </div>
                        <Button type="submit" disabled={loading} onClick={()=>onSave()}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
        </div>
    )
}

export default Education