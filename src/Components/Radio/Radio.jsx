import React, { useContext } from 'react'
import Label from '../Label/Label'
import FormContext from '../../context/FormContext';

const Radio = ({fieldLabel, fieldOptions, fieldClass, fieldName, onChange}) => {

    const {masterData, setMasterData} = useContext(FormContext);


    function handleRadioChange(e)
    {   
        let keys = fieldName.split(".");

        if(keys.length===2)
            setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev[keys[0]], [keys[1]]: e.target.value }}}));
        else if(keys.length===3)
            setMasterData((prev)=>({...prev, forms: {...prev.forms, [keys[0]]: { ...prev[keys[0]], [keys[1]]: { ...prev.forms[keys[0]][keys[1]], [keys[2]]: Boolean(e.target.value) }}}}))
        
    }
1
    return (
        <div className={fieldClass}>
            {
                (fieldLabel) && 
                <Label labelName={fieldLabel}/>
            }

            <div className='flex'>
            {
                fieldOptions.map((option, index)=>(
                    <div className='flex items-center mr-[20px]' key={index}>

                        <input type='radio' value={option.value} name={fieldName} onChange={onChange ?? handleRadioChange}/>
                        
                        <Label labelName={option.label}/>

                    </div>
                ))
            }
            </div>
        </div>
    )
}

export default Radio