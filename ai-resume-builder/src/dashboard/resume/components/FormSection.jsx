import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery';
import Experience from './forms/Experience';
import Education from './forms/Education';
import Skills from './forms/Skills';
import { Navigate, useParams } from 'react-router-dom';

function FormSection() {

  const [activeFromIndex,setActiveFromIndex]=useState(1);
  const [enableNext,setEnabledNext]=useState(false);
  const {resumeId}=useParams();

  return (
    <div>
      <div className='flex justify-between items-center'>
          <Button variant="outline" size="sm"
          className="flex gap-2">
            <LayoutGrid/>Theme</Button>
        <div className='flex gap-2'>
          {activeFromIndex>1 && <Button size="sm"
             onClick={()=>setActiveFromIndex(activeFromIndex - 1)}
          ><ArrowLeft/></Button>}

          <Button
          className="flex gap-2" size="sm"
          onClick={()=>setActiveFromIndex(activeFromIndex + 1)}
          >Next<ArrowRight/></Button>
        </div>
      </div>
      {/* Personal details */}
      {activeFromIndex== 1 ? <PersonalDetails />
      :activeFromIndex==2?<Summery />
      :activeFromIndex==3?<Experience  />
      :activeFromIndex==4?<Skills />
      :activeFromIndex==5?<Education/>
      :activeFromIndex==6? <Navigate to={'/my-resume/'+resumeId+"/view"}/>

      :null}
      
      {/*  Experinence */}
      
      {/* Education */}

      {/* Skills */}
    </div>
  )
}

export default FormSection