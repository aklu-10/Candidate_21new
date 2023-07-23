import FormContext from '../../context/FormContext';
import Button from '../Button/Button';
import { useContext } from 'react';
import React, { useState } from 'react'

const TabSwitch = ({formSectionData, tabs}) => {

    const {masterData, setMasterData} = useContext(FormContext);
    const [currentTab, setCurrentTab] = useState(tabs[0]);

    if(formSectionData.managedBy.testName || !formSectionData.totalQuestions || formSectionData.totalQuestions <= 0 || !formSectionData.testType || !formSectionData.managedBy.name || !formSectionData.screeningType) return;

  return (

    <div>
        <div className='flex my-5'>
        {
            tabs.map((tab, index)=>(
                <Button
                  key={index}
                  btnClass={`w-[800px] text-center ${ (tab.label===currentTab.label) ? ' border-b-4 border-indigo-500 text-white ' : 'text-[rgba(255,255,255,.4)]' }`}
                  onClick={()=>setCurrentTab(tab)}
                >
                  {tab.label}
                </Button>
            ))
        }
        </div>

        <div>
        {
          currentTab.value
        }
        </div>
    </div>
  )
}

export default TabSwitch