import Header from '@/components/custome/Header'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoProvider'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import GlobalApi from '../../../../service/GlobalApi';
import ResumePreview from '@/dashboard/resume/components/ResumePreview';
import { RWebShare } from 'react-web-share';

function ViewResume() {
    const [resumeInfo, setResumeInfo] = useState(null); // Initialize with null or an empty object
    const { resumeId } = useParams();

    useEffect(() => {
        GetResumeInfo();
    }, [resumeId]); // Add resumeId as a dependency to reload if it changes

    const GetResumeInfo = async () => {
        try {
            const resp = await GlobalApi.GetResumeById(resumeId);
            setResumeInfo(resp.data.data);
        } catch (error) {
            console.error("Error fetching resume info:", error);
        }
    };

    const HandelDownload=()=>{
        window.print();
    }

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <div id="no-print">
            <Header />
            <div className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <h2 className='text-center text-2xl font-medium'>Congrats ! Your Ultimate AI generated Resume is Ready.</h2>
                <p className='text-center text-gray-400'>Now you are ready to download and share your Resume</p>
                <div className='flex justify-between px-44 my-10'>
                    <Button onClick={HandelDownload}>Download</Button>


                <RWebShare
                data={{
                text: "Hello every one this is my resume",
                url: import.meta.env.VITE_BASE_URL+"/my-resume/"+resumeId+"/view",
                title:resumeInfo?.firstName+" "+resumeInfo?.lastName+" Resume",
                }}
                onClick={() => console.log("shared successfully!")}
            >
                    <Button>Share</Button>
                    </RWebShare>
                </div>
            </div>
            </div>
            <div id="print-area" className='my-10 mx-10 md:mx-20 lg:mx-36'>
                <ResumePreview />
            </div>
        </ResumeInfoContext.Provider>
    );
}

export default ViewResume;
