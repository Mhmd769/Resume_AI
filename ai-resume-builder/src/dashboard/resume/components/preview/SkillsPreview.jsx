import React from 'react';

function SkillsPreview({ resumeInfo }) {
    return (
        <div className='p-5 shadow-lg rounded-lg border-primary border-t-4 mt-5'>
            <h2 className='text-center font-bold text-2xl'
                style={{
                    color: resumeInfo?.themeColor
                }}
            >Skills</h2>
            <hr style={{
                borderColor: resumeInfo?.themeColor
            }} />
            
            <div className='my-4'>
                <div className="flex items-center justify-between">
                    <h2 className='text-l'><b>Skills : </b>{resumeInfo?.skillsName}</h2>
                    </div>
                </div>
            </div>
    );
}

export default SkillsPreview;

