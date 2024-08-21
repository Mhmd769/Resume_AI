import React, { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoProvider';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import GlobalApi from '../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';


const Education = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [loading, setLoading] = useState(false);
    const params = useParams();


    const handleChange = (e) => {
        const { name, value } = e.target;
        setResumeInfo((prevResumeInfo) => ({
            ...prevResumeInfo,
            [name]: value,
        }));
    };

    const onSave = (e) => {
        e.preventDefault();
        setLoading(true);
    
        const data = {
            data: {
                universityName: resumeInfo.universityName || '',
                degree: resumeInfo.degree || '',
                educationStartDate: resumeInfo.educationStartDate || '',
                educationEndDate: resumeInfo.educationEndDate || '',
                major: resumeInfo.major || '',
                description: resumeInfo.description || '',
            }
        };
    
        console.log("Saving data:", data);
    
        GlobalApi.UpdateResumeDetials(params?.resumeId, data).then(resp => {
            console.log("Response data:", resp);
    
            const updatedData = resp.data.data || {};
    
            setResumeInfo(prevResumeInfo => ({
                ...prevResumeInfo,
                universityName: updatedData.universityName || prevResumeInfo.universityName,
                degree: updatedData.degree || prevResumeInfo.degree,
                educationStartDate: updatedData.educationStartDate || prevResumeInfo.educationStartDate,
                educationEndDate: updatedData.educationEndDate || prevResumeInfo.educationEndDate,
                major: updatedData.major || prevResumeInfo.major,
                description: updatedData.description || prevResumeInfo.description,
            }));
    
            setLoading(false);
            toast("Education details updated.");
        }).catch(error => {
            console.error("Error updating education:", error);
            setLoading(false);
            toast("Failed to update education. Please try again.");
        });
    };
    
    
    return (
        <div className='p-5 shadow-lg rounded-lg border-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Education</h2>
            <p>Add Your Educational Background</p>

            <form className="mt-7" onSubmit={onSave}>
                <div className='grid grid-cols-2 gap-3 border p-3 my-5 rounded-lg'>
                    <div>
                        <label className='text-xs'>University Name</label>
                        <Input name="universityName"     value={resumeInfo?.universityName || ''}  onChange={handleChange} />
                    </div>
                    <div>
                        <label className='text-xs'>Degree</label>
                        <Input name="degree" value={resumeInfo?.degree || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='text-xs'>Start Date</label>
                        <Input type="date" name="educationStartDate" value={resumeInfo?.educationStartDate || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='text-xs'>End Date</label>
                        <Input type="date" name="educationEndDate" value={resumeInfo?.educationEndDate || ''} onChange={handleChange} />
                    </div>
                    <div>
                        <label className='text-xs'>Major</label>
                        <Input name="major" value={resumeInfo?.major || ''} onChange={handleChange} />
                    </div>
                    <div className='col-span-2'>
                        <label className='text-xs'>Description</label>
                        <Input name="description" value={resumeInfo?.description || ''} onChange={handleChange} />
                    </div>
                </div>
                <div className='flex justify-end'>
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save Education'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Education;
