import React from 'react';

function ExperiencePreview({ resumeInfo }) {
  return (
    <div className='p-5 shadow-lg rounded-lg border-primary border-t-4 mt-5'>
      <h2
        className='text-center font-bold text-2xl'
        style={{
          color: resumeInfo?.themeColor,
        }}
      >
        Professional Experience
      </h2>
      <hr
        style={{
          borderColor: resumeInfo?.themeColor,
        }}
      />
      <div className='my-5'>
          <h2
            className='text-sm font-bold'
            style={{
              color: resumeInfo?.themeColor,
            }}
          >
            {resumeInfo?.positionTitle}
          </h2>
          <h2 className='text-xs flex justify-between'>
            {resumeInfo?.companyName},
            {resumeInfo?.city}, {resumeInfo?.state}
            <span>
              {resumeInfo?.startDate} TO {resumeInfo?.currentlyWorking ? 'Present' : resumeInfo?.endDate}
            </span>
          </h2>
          <div dangerouslySetInnerHTML={{ __html: resumeInfo?.workSummery }} />
      </div>
    </div>
  );
}

export default ExperiencePreview;
