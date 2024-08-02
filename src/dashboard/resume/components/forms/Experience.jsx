/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoContext'; 
import { LoaderCircle } from 'lucide-react';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi'; 
import { toast } from 'sonner'; 

const formField = () => ({
    title: '',
    companyName: '',
    city: '',
    state: '',
    startDate: '',
    endDate: '',
    workSummery: ''
});

function Experience({ enabledNext }) {
    const [experienceList, setExperienceList] = useState([formField()]);
    const [loading, setLoading] = useState(false);
    const { resumeId } = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);

    const handleChange = (index, event) => {
        const newEntries = experienceList.slice();
        const { name, value } = event.target;
        newEntries[index][name] = value;
        setExperienceList(newEntries);
    };

    const AddNewExperience = () => {
        setExperienceList([...experienceList, formField()]);
    };

    const RemoveExperience = () => {
        setExperienceList(experienceList => experienceList.slice(0, -1));
    };

    useEffect(() => {
        setResumeInfo({
            ...resumeInfo,
            experience: experienceList
        });
    }, [experienceList]);

    const handleRichTextEditor = (content, name, index) => {
        const newEntries = experienceList.slice();
        newEntries[index][name] = content;
        setExperienceList(newEntries);
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
        const data = {
            data: {
                Experience: experienceList.map(({ id, ...rest }) => rest)
            }
        };

        GlobalApi.UpdateResumeDetail(resumeId, data).then(res => {
            console.log(res);
            setLoading(false);
            enabledNext(true);
            toast('Details updated!');
        }, error => {
            setLoading(false);
        });
    };

    return (
        <div>
            <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
                <h2 className='font-bold text-lg'>Professional Experience</h2>
                <p>Add your Previous Job Experience</p>
                <form onSubmit={onSave}>
                    <div>
                        {experienceList.map((item, index) => (
                            <div key={index}>
                                <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                                    <div>
                                        <label className='text-xs'>Position Title</label>
                                        <Input name="title" value={item.title} onChange={(event) => handleChange(index, event)} />
                                    </div>
                                    <div>
                                        <label className='text-xs'>Company Name</label>
                                        <Input name="companyName" value={item.companyName} onChange={(event) => handleChange(index, event)} />
                                    </div>
                                    <div>
                                        <label className='text-xs'>City</label>
                                        <Input name="city" value={item.city} onChange={(event) => handleChange(index, event)} />
                                    </div>
                                    <div>
                                        <label className='text-xs'>State</label>
                                        <Input name="state" value={item.state} onChange={(event) => handleChange(index, event)} />
                                    </div>
                                    <div>
                                        <label className='text-xs'>Start Date</label>
                                        <Input type="date" name="startDate" value={item.startDate} onChange={(event) => handleChange(index, event)} />
                                    </div>
                                    <div>
                                        <label className='text-xs'>End Date</label>
                                        <Input type="date" name="endDate" value={item.endDate} onChange={(event) => handleChange(index, event)} />
                                    </div>
                                    <div className='col-span-2'>
                                        <RichTextEditor 
                                            index={index}
                                            onRichTextEditorChange={(content) => handleRichTextEditor(content, 'workSummery', index)}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='flex justify-between'>
                        <div className='flex gap-2'>
                            <Button variant="outline" type="button" onClick={AddNewExperience} className="text-primary">+Add More Experience</Button>
                            <Button variant="outline" type="button" onClick={RemoveExperience} className="text-primary">-Remove</Button>
                        </div>
                        <Button type="submit" disabled={loading} onClick={()=>onSave()}>
                            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Experience;
