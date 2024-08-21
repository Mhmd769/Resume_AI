import React, { useContext, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ResumeInfoContext } from '@/context/ResumeInfoProvider';
import { toast } from 'sonner';
import { LoaderCircle } from 'lucide-react';
import GlobalApi from '../../../../../service/GlobalApi';
import { useParams } from 'react-router-dom';

const Skills = () => {
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
                skillsName: resumeInfo.skillsName || '',
            }
        };

        console.log(data); // Check the data structure

        GlobalApi.UpdateResumeDetials(params?.resumeId, data).then(resp => {
            console.log(resp); // Check API response
            setLoading(false);
            toast("Skills updated.");
        }).catch(error => {
            console.error("Error updating skills:", error);
            setLoading(false);
            toast("Failed to update skills. Please try again.");
        });
    };

    return (
        <div className='p-5 shadow-lg rounded-lg border-primary border-t-4 mt-10'>
            <h2 className='font-bold text-lg'>Skills</h2>
            <p>Add Your Skill</p>

            <form className="mt-7" onSubmit={onSave}>
                <div className='border p-3 my-5 rounded-lg'>
                    <div>
                        <label className='text-xs'>Skill Name</label>
                        <Input name="skillsName" value={resumeInfo?.skillsName} onChange={handleChange} />
                    </div>
                </div>
                <div className='flex justify-end'>
                    <Button type="submit" disabled={loading}>
                        {loading ? <LoaderCircle className='animate-spin' /> : 'Save Skill'}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default Skills;
