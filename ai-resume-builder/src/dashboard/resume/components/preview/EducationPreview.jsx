import React from 'react';

function EducationPreview({ resumeInfo }) {
  return (
    <div className='p-5 shadow-lg rounded-lg border-primary border-t-4 mt-5'>
      <h2
        className='text-center font-bold text-xl'
        style={{ color: resumeInfo?.themeColor }}
      >
        Education
      </h2>
      <hr style={{ borderColor: resumeInfo?.themeColor }} />

      {resumeInfo?.universityName ? (
        <div className='my-5'>
          <h3
            className='text-md font-bold'
            style={{ color: resumeInfo?.themeColor }}
          >
            {resumeInfo.universityName}
          </h3>
          <h4 className='text-sm flex justify-between'>
            {resumeInfo.degree} in {resumeInfo.major}
            <span>
              {resumeInfo.educationStartDate} - {resumeInfo.educationEndDate}
            </span>
          </h4>
          <p className='text-sm my-2'>{resumeInfo.description}</p>
        </div>
      ) : (
        <p className='text-center text-gray-500'>No education information available.</p>
      )}
    </div>
  );
}

export default EducationPreview;
