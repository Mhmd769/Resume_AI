import React, { useState, createContext } from 'react';

export const ResumeInfoContext = createContext();

export const ResumeInfoProvider = ({ children }) => {
    const [resumeInfo, setResumeInfo] = useState({
        firstName: '',
        lastName: '',
        jobTitle: '',
        address: '',
        phone: '',
        email: '',
        themeColor: '#3498db',
        summary: '',
        positionTitle: '',
        companyName: '',
        city: '',
        state: '',
        startDate: '',
        endDate: '',
        currentlyWorking: false,
        workSummery: '',
        universityName: '',
        degree: '',
        educationStartDate: '', // Renamed to avoid conflict with job dates
        educationEndDate: '',   // Renamed to avoid conflict with job dates
        major: '',
        description: '',
        skillsName:'',
    });

    return (
        <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            {children}
        </ResumeInfoContext.Provider>
    );
};
