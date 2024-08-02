/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import { useContext } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useParams } from 'react-router-dom';
import GlobalApi from './../../../../../service/GlobalApi';
import { LoaderCircle } from 'lucide-react';
import { toast } from 'sonner'; 

function PersonalDetail({ enableNext }) {
  const params = useParams();
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [formData, setFormData] = useState({
    firstName: resumeInfo?.firstName || '',
    lastName: resumeInfo?.lastName || '',
    jobTitle: resumeInfo?.jobTitle || '',
    address: resumeInfo?.address || '',
    phone: resumeInfo?.phone || '',
    email: resumeInfo?.email || ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Params:", params);
    console.log("Initial FormData:", formData);
  }, [params, formData]);

  const handleInputChange = (e) => {
    enableNext(false);
    const { name, value } = e.target;

    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));

    setResumeInfo(prevResumeInfo => ({
      ...prevResumeInfo,
      [name]: value
    }));
  };

  const onSave = (e) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      data: formData
    };

    console.log("Data being sent:", data);

    GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
      resp => {
        console.log("Response:", resp);
        enableNext(true);
        setLoading(false);
        toast("Details Updated");
      },
      error => {
        console.log("Error response:", error.response.data);
        setLoading(false);
      }
    );
  };

  return (
    <div className='p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10'>
      <h2 className='font-bold text-lg'>Personal Detail</h2>
      <p>Get Started with the basic Information</p>

      <form onSubmit={onSave}>
        <div className='grid grid-cols-2 gap-3 mt-5'>
          <div>
            <label className='text-sm'>First Name</label>
            <Input name="firstName" value={formData.firstName} required onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>Last Name</label>
            <Input name="lastName" value={formData.lastName} required onChange={handleInputChange} />
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Job Title </label>
            <Input name="jobTitle" value={formData.jobTitle} required onChange={handleInputChange} />
          </div>
          <div className='col-span-2'>
            <label className='text-sm'>Address</label>
            <Input name="address" value={formData.address} required onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>Phone</label>
            <Input name="phone" value={formData.phone} required onChange={handleInputChange} />
          </div>
          <div>
            <label className='text-sm'>Email</label>
            <Input name="email" value={formData.email} required onChange={handleInputChange} />
          </div>
        </div>
        <div className='mt-3 flex justify-end'>
          <Button type="submit" disabled={loading}>
            {loading ? <LoaderCircle className='animate-spin' /> : 'Save'}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default PersonalDetail;
