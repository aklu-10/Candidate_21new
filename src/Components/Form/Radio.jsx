import React, { memo, useContext, useEffect, useState } from 'react'
import Label from './Label/Label'
import FormContext from '../../context/FormContext';

const Radio = ({fieldLabel, fieldOptions, fieldClass, fieldName, fieldChecked, fieldDisabled, onChange, onClick}) => {

    const {masterData, setMasterData} = useContext(FormContext);

    const [value, setValue] = useState(fieldChecked);

    function handleRadioChange(e)
    {   
        let keys = fieldName.split(".");

        if(keys.length===2)
            setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev[keys[0]], [keys[1]]: e.target.value }}}));
        else if(keys.length===3)
            setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev[keys[0]], [keys[1]]: { ...prev.forms[keys[0]][keys[1]], [keys[2]]: Boolean(e.target.value) }}}}))
    }

    function handleRadioClick(e)
    {
        let keys = fieldName.split(".");
        setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev.forms[keys[0]], [keys[1]]: { ...prev.forms[keys[0]][keys[1]], [keys[2]]: e.target.value }}}}))

        // setLoader(true)

        // setTimeout(()=>setLoader(false),10)
    }

    return (
        <div className={fieldClass}>

            {
                (fieldLabel) && 
                <Label labelName={fieldLabel}/>
            }

            <div className='flex'>
            {
             onClick ?
             
             fieldOptions.map((option, index)=>(
                    
                fieldChecked ? 
                
                (option.value === fieldChecked?.value)
                
                ?

                <div className='flex items-center mr-[20px]' key={index}>

                    <input type='radio' value={option?.value} name={fieldName} checked disabled={fieldDisabled} onClick={handleRadioClick}/>
                    
                    <Label labelName={option.label} fieldClass={'pb-[11px] px-1'}/>

                </div>

                : 

                <div className='flex items-center mr-[20px]' key={index}>

                    <input type='radio' value={option?.value} name={fieldName} disabled={fieldDisabled} onClick={handleRadioClick} />
                    
                    <Label labelName={option.label} fieldClass={'pb-[11px] px-1'}/>

                </div> :
                <div className='flex items-center mr-[20px]' key={index}>

                    <input type='radio' value={option?.value} name={fieldName} disabled={fieldDisabled} onClick={handleRadioClick} />
                    
                    <Label labelName={option.label}/>

                </div>
            )) : 
            fieldOptions.map((option, index)=>(
                    
                fieldChecked ? 
                
                (option.value === fieldChecked?.value)
                
                ?

                <div className='flex items-center mr-[20px]' key={index}>

                    <input type='radio' value={option?.value} name={fieldName} checked disabled={fieldDisabled} onChange={onChange ?? handleRadioChange}/>
                    
                    <Label labelName={option.label} fieldClass={'pb-[11px] px-1'}/>

                </div>

                : 

                <div className='flex items-center mr-[20px]' key={index}>

                    <input type='radio' value={option?.value} name={fieldName} disabled={fieldDisabled} onChange={onChange ?? handleRadioChange} />
                    
                    <Label labelName={option.label} fieldClass={'pb-[11px] px-1'}/>

                </div> :
                <div className='flex items-center mr-[20px]' key={index}>

                    <input type='radio' value={option?.value} name={fieldName} disabled={fieldDisabled} onChange={onChange ?? handleRadioChange} />
                    
                    <Label labelName={option.label}/>

                </div>
            ))
             
            }
            </div>
        </div>
    )
}

export default memo(Radio)