// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Loader2, PlusSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid'; 
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
// eslint-disable-next-line no-unused-vars
import GlobalApi from './../../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';



function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState('');
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const navigation=useNavigate(); 
  
  const onCreate = async () => {
    setLoading(true);
    const uuid = uuidv4();
    const data =
    {
      data:
      {
        title: resumeTitle,
        resumeId: uuid,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        userName: user?.fullName
      }
    }
    GlobalApi.CreateNewResume(data).then(Response => {

      console.log(Response.data.data.documentId);
      if (Response) {
        setLoading(false); 
        navigation('/dashboard/resume/'+Response.data.data.documentId+"/edit");
      }

      // eslint-disable-next-line no-unused-vars
    }, (error) => {

      setLoading(false);
    })

  };

  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary 
        rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare />
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p>Add a title for your new resume</p>
              <Input
                className="my-2"
                placeholder="Ex. full stack Resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={() => onCreate()}>
                {
                  loading ?
                    <Loader2 className='animate-spin' /> : 'Create'
                }

              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;