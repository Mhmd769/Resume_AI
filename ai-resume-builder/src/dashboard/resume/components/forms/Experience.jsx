import React, { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RichTextEditor from '../RichTextEditor';
import { ResumeInfoContext } from '@/context/ResumeInfoProvider';
import GlobalApi from "../../../../../service/GlobalApi";
import { toast } from 'sonner';
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';

const Experience = () => {
    const params = useParams();
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleRichTextEditor = (event, name) => {
        const value = event.target.value;
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            [name]: value,
        }));
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
    
        // Ensure data object is correctly structured
        const data = {
            data: {
                positionTitle: resumeInfo.positionTitle,
                companyName: resumeInfo.companyName,
                city: resumeInfo.city,
                state: resumeInfo.state,
                startDate: resumeInfo.startDate,
                endDate: resumeInfo.currentlyWorking ? null : resumeInfo.endDate,
                currentlyWorking: resumeInfo.currentlyWorking,
                workSummery: resumeInfo.workSummery, // Ensure this matches your backend field
            }
        };
    
        console.log(data); // Check the data structure
    
        GlobalApi.UpdateResumeDetials(params?.resumeId, data).then(resp => {
            console.log(resp); // Check API response
            setLoading(false);
            toast("Experience details updated.");
        }).catch(error => {
            console.error("Error updating experience:", error);
            setLoading(false);
            toast("Failed to update experience. Please try again.");
        });
    };
    

    return (
        <div className='p-5 shadow-lg rounded-lg border-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Professional Experience</h2>
            <p>Add Your Job Experience</p>

            <form className="mt-7" onSubmit={onSave}>
                <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                    <div>
                        <label className='text-xs'>Position Title</label>
                        <Input name="positionTitle" value={resumeInfo?.positionTitle} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='text-xs'>Company Name</label>
                        <Input name="companyName" value={resumeInfo?.companyName} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='text-xs'>City</label>
                        <Input name="city" value={resumeInfo?.city} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='text-xs'>State</label>
                        <Input name="state" value={resumeInfo?.state} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='text-xs'>Start Date</label>
                        <Input type="date" name="startDate" value={resumeInfo?.startDate} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='text-xs'>End Date</label>
                        <Input type="date" name="endDate" value={resumeInfo?.endDate} onChange={handleChange} disabled={resumeInfo?.currentlyWorking} />
                    </div>
                    <div className='col-span-2'>
                        <label className='flex items-center text-xs'>
                            <input
                                type="checkbox"
                                name="currentlyWorking"
                                checked={resumeInfo?.currentlyWorking}
                                onChange={handleChange}
                                className='mr-2'
                            />
                            I am currently working here
                        </label>
                    </div>
                    <div className='col-span-2'>
                        <RichTextEditor
                            value={resumeInfo?.workSummery}
                            onRichTextEditorChange={(e) => handleRichTextEditor(e, 'workSummery')}
                        />
                    </div>
                </div>
                <div className='flex justify-end'>
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save Experience'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Experience;
