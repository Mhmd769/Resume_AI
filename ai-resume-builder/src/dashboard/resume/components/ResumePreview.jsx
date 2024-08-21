import { ResumeInfoContext } from '@/context/ResumeInfoProvider';
import React, { useContext } from 'react';
import PersonalDetailsPreview from './preview/PersonalDetailsPreview';
import SummeryPreview from './preview/SummeryPreview';
import ExperiencePreview from './preview/ExperiencePreview';
import EducationPreview from './preview/EducationPreview';
import SkillsPreview from './preview/SkillsPreview';

function ResumePreview() {
    const { resumeInfo } = useContext(ResumeInfoContext);

    return (
        <div className='shadow-lg h-full p-14 border-t-[20px]'
             style={{ borderColor: resumeInfo?.themeColor }}>
            <PersonalDetailsPreview resumeInfo={resumeInfo} />
            <SummeryPreview resumeInfo={resumeInfo} />
            <ExperiencePreview resumeInfo={resumeInfo} />
            <SkillsPreview resumeInfo={resumeInfo} />
            <EducationPreview resumeInfo={resumeInfo} />
        </div>
    );
}

export default ResumePreview;
